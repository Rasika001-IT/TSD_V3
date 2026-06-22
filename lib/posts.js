import { db } from './db.js';

// Columns + joins needed to reproduce the legacy WordPress `formatPost` shape.
// FULL includes the heavy `content` HTML (single-post pages only).
// LIST omits `content` so listing pages don't serialize ~479 article bodies
// into the HTML payload.
const SELECT_FULL = `
  id, wp_id, slug, title, subtitle, content, excerpt, featured_image, published_at, updated_at,
  post_type, report_type, pdf_url, is_gated, page_count,
  authors ( wp_id, name, slug, avatar ),
  post_categories ( categories ( wp_id ) ),
  post_tags ( tags ( wp_id ) )
`;
const SELECT_LIST = `
  id, wp_id, slug, title, subtitle, excerpt, featured_image, published_at, updated_at, post_type,
  authors ( wp_id, name, slug, avatar ),
  post_categories ( categories ( wp_id ) ),
  post_tags ( tags ( wp_id ) )
`;
const SELECT = SELECT_LIST;

// Map a Supabase row to the EXACT shape the old Express+WordPress API returned,
// so the ported frontend components consume it unchanged. `id` and the
// categories/tags arrays are WordPress numeric ids (preserved as wp_id in
// migration), which is what categoryMap.js and the hooks key on.
export const formatPost = (p) => ({
  id: p.wp_id,
  uuid: p.id,
  title: p.title,
  subtitle: p.subtitle,
  slug: p.slug,
  content: p.content,
  excerpt: p.excerpt,
  link: `/article/${p.slug}`,
  post_type: p.post_type,
  report_type: p.report_type,
  pdf_url: p.pdf_url,
  is_gated: p.is_gated,
  page_count: p.page_count,
  date: p.published_at,
  modified: p.updated_at || p.published_at,
  image: p.featured_image,
  categories: (p.post_categories || []).map((pc) => pc.categories?.wp_id).filter(Boolean),
  tags: (p.post_tags || []).map((pt) => pt.tags?.wp_id).filter(Boolean),
  author: p.authors?.name || 'TSD Staff',
  authorId: p.authors?.wp_id || null,
  authorSlug: p.authors?.slug || '',
  authorAvatar: p.authors?.avatar || null,
  authorLink: p.authors?.slug ? `/author/${p.authors.slug}` : '#',
});

const published = (q) => q.eq('status', 'published').eq('visibility', 'public');

export async function getAllPosts() {
  const { data, error } = await published(
    db.from('posts').select(SELECT).order('published_at', { ascending: false }),
  );
  if (error) throw error;
  return data.map(formatPost);
}

// Full-text-ish search over title + excerpt of published posts.
export async function searchPosts(query, limit = 40) {
  const safe = String(query || '').replace(/[%,()]/g, ' ').trim();
  if (!safe) return [];
  const pattern = `%${safe}%`;
  const { data, error } = await published(
    db
      .from('posts')
      .select(SELECT)
      .or(`title.ilike.${pattern},excerpt.ilike.${pattern}`)
      .order('published_at', { ascending: false }),
  ).limit(limit);
  if (error) throw error;
  return data.map(formatPost);
}

// Published posts by UUID list (used by hub pages).
export async function getPostsByUuids(uuids, limit = 12) {
  if (!uuids || !uuids.length) return [];
  const { data, error } = await published(
    db.from('posts').select(SELECT).in('id', uuids).order('published_at', { ascending: false }),
  ).limit(limit);
  if (error) throw error;
  return data.map(formatPost);
}

// All published slugs — for generateStaticParams (pre-render every article).
export async function getAllSlugs() {
  const { data, error } = await published(db.from('posts').select('slug'));
  if (error) throw error;
  return data.map((r) => r.slug);
}

// A few most-recent posts (optionally excluding one slug) — for "related"
// widgets. Avoids pulling all 472 posts on every article render.
export async function getRecentPosts(limit = 6, excludeSlug = null) {
  let q = published(db.from('posts').select(SELECT).order('published_at', { ascending: false }));
  if (excludeSlug) q = q.neq('slug', excludeSlug);
  const { data, error } = await q.limit(limit);
  if (error) throw error;
  return data.map(formatPost);
}

export async function getPostsPaginated(page = 1, perPage = 9) {
  const fromRow = (page - 1) * perPage;
  const { data, count, error } = await published(
    db.from('posts').select(SELECT, { count: 'exact' }).order('published_at', { ascending: false }),
  ).range(fromRow, fromRow + perPage - 1);
  if (error) throw error;
  return {
    posts: data.map(formatPost),
    totalPosts: count || 0,
    totalPages: Math.ceil((count || 0) / perPage),
    currentPage: page,
  };
}

export async function getPostBySlug(slug) {
  const { data, error } = await published(db.from('posts').select(SELECT_FULL).eq('slug', slug)).maybeSingle();
  if (error) throw error;
  return data ? formatPost(data) : null;
}

// categoryId / tagId are WordPress numeric ids (wp_id) — matches the old API.
// Two-step (resolve member post-ids, then fetch full rows) so each post keeps
// its COMPLETE categories/tags arrays — a filtered embed would return only the
// matching term and also trips PostgREST's duplicate-embed aggregate error.
export async function getPostsByCategory(categoryWpId, perPage = 50) {
  const { data: cat } = await db.from('categories').select('id').eq('wp_id', categoryWpId).maybeSingle();
  if (!cat) return [];
  const { data: links } = await db.from('post_categories').select('post_id').eq('category_id', cat.id);
  const ids = (links || []).map((l) => l.post_id);
  if (!ids.length) return [];
  const { data, error } = await published(
    db.from('posts').select(SELECT).in('id', ids).order('published_at', { ascending: false }),
  ).limit(perPage);
  if (error) throw error;
  return data.map(formatPost);
}

export async function getPostsByTag(tagWpId, perPage = 50) {
  const { data: tag } = await db.from('tags').select('id').eq('wp_id', tagWpId).maybeSingle();
  if (!tag) return [];
  const { data: links } = await db.from('post_tags').select('post_id').eq('tag_id', tag.id);
  const ids = (links || []).map((l) => l.post_id);
  if (!ids.length) return [];
  const { data, error } = await published(
    db.from('posts').select(SELECT).in('id', ids).order('published_at', { ascending: false }),
  ).limit(perPage);
  if (error) throw error;
  return data.map(formatPost);
}

// Categories/tags in the legacy WP shape: numeric id + parent as numeric id.
export async function getCategories() {
  const { data, error } = await db.from('categories').select('id, wp_id, name, slug, parent_id');
  if (error) throw error;
  const wpById = Object.fromEntries(data.map((c) => [c.id, c.wp_id]));
  return data.map((c) => ({
    id: c.wp_id,
    name: c.name,
    slug: c.slug,
    parent: c.parent_id ? wpById[c.parent_id] || 0 : 0,
  }));
}

export async function getTags() {
  const { data, error } = await db.from('tags').select('wp_id, name, slug');
  if (error) throw error;
  return data.map((t) => ({ id: t.wp_id, name: t.name, slug: t.slug }));
}
