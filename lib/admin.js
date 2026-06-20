import { createAdminClient } from './supabase.js';

// Service-role reads for the CMS — sees ALL statuses (draft/in_review/etc.),
// unlike the public anon client which RLS limits to published.
export async function getAdminPosts(limit = 100) {
  const db = createAdminClient();
  const { data, error } = await db
    .from('posts')
    .select('id, wp_id, slug, title, post_type, status, promotion, published_at, updated_at')
    .order('updated_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data || [];
}

export async function getAdminPost(id) {
  const db = createAdminClient();
  const { data: post } = await db.from('posts').select('*').eq('id', id).maybeSingle();
  if (!post) return null;
  const [{ data: pc }, { data: pt }, { data: re }] = await Promise.all([
    db.from('post_categories').select('category_id').eq('post_id', id),
    db.from('post_tags').select('tag_id').eq('post_id', id),
    db.from('ranking_entries').select('*').eq('post_id', id).order('rank'),
  ]);
  return {
    ...post,
    category_ids: (pc || []).map((r) => r.category_id),
    tag_ids: (pt || []).map((r) => r.tag_id),
    ranking_entries: re || [],
  };
}

export async function getAdminTaxonomy() {
  const db = createAdminClient();
  const [{ data: categories }, { data: tags }, { data: authors }, { data: series }] =
    await Promise.all([
      db.from('categories').select('id, name, slug, parent_id').order('name'),
      db.from('tags').select('id, name, slug').order('name'),
      db.from('authors').select('id, name, slug').order('name'),
      db.from('series').select('id, name, slug').order('name'),
    ]);
  return {
    categories: categories || [],
    tags: tags || [],
    authors: authors || [],
    series: series || [],
  };
}
