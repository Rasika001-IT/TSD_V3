// Conservative category tidy-up. Idempotent.
//   node scripts/cleanup-categories.mjs
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const bySlug = {};
const { data: cats } = await db.from('categories').select('id, name, slug');
cats.forEach((c) => (bySlug[c.slug] = c));

async function linkCount(id) {
  const { count } = await db.from('post_categories').select('*', { count: 'exact', head: true }).eq('category_id', id);
  return count || 0;
}

// Reassign every post in `source` to `target`, then delete source.
async function merge(sourceSlug, targetSlug) {
  const src = bySlug[sourceSlug];
  const tgt = bySlug[targetSlug];
  if (!src) return console.log(`  - merge skip: no source ${sourceSlug}`);
  if (!tgt) return console.log(`  - merge skip: no target ${targetSlug}`);
  const { data: links } = await db.from('post_categories').select('post_id').eq('category_id', src.id);
  for (const l of links || []) {
    await db.from('post_categories').upsert(
      { post_id: l.post_id, category_id: tgt.id },
      { onConflict: 'post_id,category_id', ignoreDuplicates: true },
    );
  }
  await db.from('categories').delete().eq('id', src.id); // cascade drops source links
  console.log(`  ✓ merged ${sourceSlug} (${(links || []).length} posts) -> ${targetSlug}`);
}

async function deleteIfEmpty(slug) {
  const c = bySlug[slug];
  if (!c) return console.log(`  - delete skip: no ${slug}`);
  const n = await linkCount(c.id);
  if (n > 0) return console.log(`  ! keep ${slug}: has ${n} posts`);
  await db.from('categories').delete().eq('id', c.id);
  console.log(`  ✓ deleted empty ${slug}`);
}

async function rename(slug, name) {
  const c = bySlug[slug];
  if (!c) return;
  await db.from('categories').update({ name }).eq('id', c.id);
  console.log(`  ✓ renamed ${slug} -> "${name}"`);
}

console.log('Delete empty junk:');
for (const s of ['global-market-selloff', 'trump-xi-summit', 'magazine', 'sports']) await deleteIfEmpty(s);

console.log('Fold Uncategorized into News:');
await merge('uncategorized', 'news');

console.log('Merge redundant new-model duplicates into canonical categories:');
await merge('markets-economy', 'markets');
await merge('economy', 'markets');
await merge('deals-m-a', 'deals');
await merge('tech-innovation', 'tech');
await rename('tech', 'Technology');

const { data: after } = await db.from('categories').select('id');
console.log(`\nDone. Categories: ${cats.length} -> ${after.length}`);
