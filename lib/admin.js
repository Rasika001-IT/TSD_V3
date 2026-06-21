import { createAdminClient } from './supabase.js';

// Service-role reads for the CMS — sees ALL statuses (draft/in_review/etc.),
// unlike the public anon client which RLS limits to published.
export const POST_SORTS = {
  recent: { label: 'Most Recent', column: 'updated_at', ascending: false },
  oldest: { label: 'Oldest', column: 'updated_at', ascending: true },
  published: { label: 'Recently Published', column: 'published_at', ascending: false },
  title: { label: 'Title (A–Z)', column: 'title', ascending: true },
};

// Paginated, sortable list for the dashboard. Returns the page of posts plus
// the total count so the UI can render pagination.
export async function getAdminPosts({ page = 1, perPage = 50, sort = 'recent' } = {}) {
  const db = createAdminClient();
  const s = POST_SORTS[sort] || POST_SORTS.recent;
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;
  const { data, error, count } = await db
    .from('posts')
    .select('id, wp_id, slug, title, post_type, status, promotion, published_at, updated_at', {
      count: 'exact',
    })
    .order(s.column, { ascending: s.ascending, nullsFirst: false })
    .range(from, to);
  if (error) throw error;
  return { posts: data || [], total: count || 0 };
}

export async function getAdminPost(id) {
  const db = createAdminClient();
  const { data: post } = await db.from('posts').select('*').eq('id', id).maybeSingle();
  if (!post) return null;
  const [{ data: pc }, { data: pt }, { data: re }, { data: sp }] = await Promise.all([
    db.from('post_categories').select('category_id').eq('post_id', id),
    db.from('post_tags').select('tag_id').eq('post_id', id),
    db.from('ranking_entries').select('*').eq('post_id', id).order('rank'),
    db.from('social_promotions').select('*').eq('post_id', id).order('scheduled_at'),
  ]);
  return {
    ...post,
    category_ids: (pc || []).map((r) => r.category_id),
    tag_ids: (pt || []).map((r) => r.tag_id),
    ranking_entries: re || [],
    social_promotions: sp || [],
  };
}

export async function getAdminHubs() {
  const db = createAdminClient();
  const { data } = await db.from('hub_pages').select('id, name, slug, intro_copy').order('name');
  return data || [];
}

export async function getAdminHub(id) {
  const db = createAdminClient();
  const { data: hub } = await db.from('hub_pages').select('*').eq('id', id).maybeSingle();
  if (!hub) return null;
  const { data: categories } = await db.from('categories').select('id, name, slug, hub_id').order('name');
  return { hub, categories: categories || [] };
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
