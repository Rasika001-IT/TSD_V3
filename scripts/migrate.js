/**
 * TSD_V3 — WordPress → Supabase + Cloudflare R2 migration (Phase 1).
 *
 * Idempotent: upserts on wp_id, so it is safe to re-run (final delta sync at cutover).
 * Reads WordPress read-only. Writes content to Supabase and media to R2.
 *
 *   node scripts/migrate.js            # full run
 *   node scripts/migrate.js --taxonomy # categories/tags/authors only
 *   node scripts/migrate.js --limit 20 # first 20 posts (smoke test)
 *
 * Requires env (see .env.example): NEXT_PUBLIC_SUPABASE_URL,
 * SUPABASE_SERVICE_ROLE_KEY, R2_* , WORDPRESS_API_URL.
 */
import 'dotenv/config';
import axios from 'axios';
import { parse } from 'node-html-parser';
import pLimit from 'p-limit';
import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import { createClient } from '@supabase/supabase-js';

const WP = axios.create({ baseURL: process.env.WORDPRESS_API_URL, timeout: 30000 });
const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});
const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});
const R2_BUCKET = process.env.R2_BUCKET;
const R2_BASE = process.env.R2_PUBLIC_BASE.replace(/\/$/, '');

const args = process.argv.slice(2);
const LIMIT = args.includes('--limit') ? parseInt(args[args.indexOf('--limit') + 1]) : Infinity;
const TAXONOMY_ONLY = args.includes('--taxonomy');

// ── post_type resolution (confirmed mapping) ─────────────────────────
// Resolve each WP category to its ROOT ancestor, then per post:
//   Featured Articles (120) -> feature  (precedence 1)
//   Blogs root      (118)   -> blog     (precedence 2)
//   News root       (117)   -> news     (precedence 3)
//   else                    -> news     (fallback)
// Editor's Highlights (136) is a curation bucket, NOT a type:
//   -> promotion = 'editors_pick', type derived from the post's other cats.
// Featured Articles also implies promotion = 'featured'.
const ROOT_NEWS = 117;
const ROOT_BLOGS = 118;
const FEATURED_ARTICLES = 120;
const EDITORS_HIGHLIGHTS = 136;

let CAT_PARENT = {}; // wp catId -> parent wp catId

function rootOf(catId) {
  let cur = catId;
  const seen = new Set();
  while (CAT_PARENT[cur] && CAT_PARENT[cur] !== 0 && !seen.has(cur)) {
    seen.add(cur);
    cur = CAT_PARENT[cur];
  }
  return cur;
}

function resolvePostType(catIds) {
  const roots = catIds.map(rootOf);
  if (catIds.includes(FEATURED_ARTICLES) || roots.includes(FEATURED_ARTICLES)) return 'feature';
  if (roots.includes(ROOT_BLOGS)) return 'blog';
  if (roots.includes(ROOT_NEWS)) return 'news';
  return 'news';
}

function resolvePromotion(catIds) {
  if (catIds.includes(EDITORS_HIGHLIGHTS)) return 'editors_pick';
  if (catIds.includes(FEATURED_ARTICLES)) return 'featured';
  return 'none';
}

const readingTime = (html) => {
  const words = parse(html || '').textContent.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};

// ── R2 media (idempotent: skip if key already present) ───────────────
const mediaLimit = pLimit(6);
async function mirrorImage(srcUrl, wpId) {
  if (!srcUrl || !/^https?:\/\//.test(srcUrl)) return srcUrl;
  try {
    const u = new URL(srcUrl);
    if (!/thesuccessdigest\.com/.test(u.hostname)) return srcUrl; // already external/CDN
    const key = `posts/${wpId}/${u.pathname.split('/').pop()}`;
    const publicUrl = `${R2_BASE}/${key}`;
    try {
      await r2.send(new HeadObjectCommand({ Bucket: R2_BUCKET, Key: key }));
      return publicUrl; // already mirrored
    } catch { /* not present — upload below */ }
    const resp = await axios.get(srcUrl, { responseType: 'arraybuffer', timeout: 60000 });
    await r2.send(new PutObjectCommand({
      Bucket: R2_BUCKET, Key: key, Body: resp.data,
      ContentType: resp.headers['content-type'] || 'image/jpeg',
    }));
    return publicUrl;
  } catch (e) {
    console.warn(`  ! image mirror failed ${srcUrl}: ${e.message}`);
    return srcUrl; // leave original; transitional fallback
  }
}

// Rewrite every <img src>/srcset inside the body HTML to the R2 CDN.
async function rewriteBodyImages(html, wpId) {
  if (!html) return html;
  const root = parse(html);
  const imgs = root.querySelectorAll('img');
  for (const img of imgs) {
    const src = img.getAttribute('src');
    if (src) img.setAttribute('src', await mediaLimit(() => mirrorImage(src, wpId)));
    if (img.getAttribute('srcset')) img.removeAttribute('srcset'); // avoid stale WP variants
  }
  return root.toString();
}

// ── WP paginated fetch (reuses the live backend's pagination approach) ─
async function fetchAll(path, params = {}) {
  const first = await WP.get(path, { params: { per_page: 100, page: 1, ...params } });
  const pages = parseInt(first.headers['x-wp-totalpages'] || '1');
  let all = first.data;
  for (let p = 2; p <= pages; p++) {
    const r = await WP.get(path, { params: { per_page: 100, page: p, ...params } });
    all = all.concat(r.data);
  }
  return all;
}

const decode = (s) => (s || '').replace(/&amp;/g, '&').replace(/&#038;/g, '&').replace(/&#8217;/g, '’');

async function migrateTaxonomy() {
  console.log('→ categories');
  const cats = await fetchAll('/categories');
  CAT_PARENT = Object.fromEntries(cats.map((c) => [c.id, c.parent]));
  // Insert without parent_id first, then link (two-pass for self-FK).
  for (const c of cats) {
    await db.from('categories').upsert(
      { wp_id: c.id, name: decode(c.name), slug: c.slug, description: decode(c.description) },
      { onConflict: 'wp_id' },
    );
  }
  const { data: dbCats } = await db.from('categories').select('id, wp_id');
  const byWp = Object.fromEntries(dbCats.map((c) => [c.wp_id, c.id]));
  for (const c of cats) {
    if (c.parent && byWp[c.parent]) {
      await db.from('categories').update({ parent_id: byWp[c.parent] }).eq('wp_id', c.id);
    }
  }

  console.log('→ tags');
  const tags = await fetchAll('/tags');
  for (const t of tags) {
    await db.from('tags').upsert({ wp_id: t.id, name: decode(t.name), slug: t.slug }, { onConflict: 'wp_id' });
  }

  console.log('→ authors');
  const authors = await fetchAll('/users');
  for (const a of authors) {
    const avatar = a.avatar_urls?.['96'] || null;
    await db.from('authors').upsert(
      { wp_id: a.id, name: decode(a.name), slug: a.slug || `author-${a.id}`, avatar, bio: a.description || null },
      { onConflict: 'wp_id' },
    );
  }
  return { byWp };
}

async function migratePosts(catByWp) {
  const { data: dbCats } = await db.from('categories').select('id, wp_id');
  const catId = Object.fromEntries(dbCats.map((c) => [c.wp_id, c.id]));
  const { data: dbTags } = await db.from('tags').select('id, wp_id');
  const tagId = Object.fromEntries(dbTags.map((t) => [t.wp_id, t.id]));
  const { data: dbAuthors } = await db.from('authors').select('id, wp_id');
  const authorId = Object.fromEntries(dbAuthors.map((a) => [a.wp_id, a.id]));

  console.log('→ posts');
  const posts = await fetchAll('/posts', { _embed: true });
  let n = 0;
  for (const p of posts) {
    if (n >= LIMIT) break;
    n++;
    const cats = p.categories || [];
    const featuredRaw = p._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
    const [featured, body] = await Promise.all([
      mirrorImage(featuredRaw, p.id),
      rewriteBodyImages(p.content?.rendered, p.id),
    ]);
    const row = {
      wp_id: p.id,
      slug: p.slug,
      title: decode(p.title?.rendered),
      content: body,
      excerpt: p.excerpt?.rendered || null,
      post_type: resolvePostType(cats),
      status: p.status === 'publish' ? 'published' : 'draft',
      promotion: resolvePromotion(cats),
      featured_image: featured,
      author_id: authorId[p.author] || null,
      published_at: p.date_gmt ? `${p.date_gmt}Z` : null,
      reading_time: readingTime(body),
    };
    const { data: up, error } = await db.from('posts').upsert(row, { onConflict: 'wp_id' }).select('id').single();
    if (error) { console.warn(`  ! post ${p.id} (${p.slug}): ${error.message}`); continue; }

    // join rows
    await db.from('post_categories').delete().eq('post_id', up.id);
    for (const c of cats) if (catId[c]) await db.from('post_categories').upsert({ post_id: up.id, category_id: catId[c] });
    await db.from('post_tags').delete().eq('post_id', up.id);
    for (const t of (p.tags || [])) if (tagId[t]) await db.from('post_tags').upsert({ post_id: up.id, tag_id: tagId[t] });

    if (n % 25 === 0) console.log(`  …${n} posts`);
  }
  console.log(`✓ ${n} posts migrated`);
}

(async () => {
  const { byWp } = await migrateTaxonomy();
  if (!TAXONOMY_ONLY) await migratePosts(byWp);

  // Verification: compare against WP X-WP-Total.
  const head = await WP.get('/posts', { params: { per_page: 1 } });
  const wpTotal = parseInt(head.headers['x-wp-total'] || '0');
  const { count } = await db.from('posts').select('*', { count: 'exact', head: true });
  console.log(`\nVERIFY  WordPress posts: ${wpTotal}  |  Supabase posts: ${count}`);
  if (LIMIT === Infinity && count < wpTotal) console.warn('  ⚠ count mismatch — investigate before cutover');
})().catch((e) => { console.error(e); process.exit(1); });
