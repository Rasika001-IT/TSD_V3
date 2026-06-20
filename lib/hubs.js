import { db } from './db.js';
import { getPostsByUuids } from './posts.js';

export async function getHubs() {
  const { data } = await db.from('hub_pages').select('*').order('name');
  return data || [];
}

export async function getHub(slug) {
  const { data } = await db.from('hub_pages').select('*').eq('slug', slug).maybeSingle();
  return data || null;
}

export async function getHubSeries(hubId) {
  const { data } = await db.from('series').select('id, name, slug').eq('hub_id', hubId).order('name');
  return data || [];
}

// Latest posts in a hub: posts in any category linked to this hub (categories.hub_id).
export async function getHubPosts(hubId, limit = 12) {
  const { data: cats } = await db.from('categories').select('id').eq('hub_id', hubId);
  const catIds = (cats || []).map((c) => c.id);
  if (!catIds.length) return [];
  const { data: links } = await db.from('post_categories').select('post_id').in('category_id', catIds);
  const postIds = [...new Set((links || []).map((l) => l.post_id))];
  return getPostsByUuids(postIds, limit);
}
