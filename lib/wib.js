import { db } from './db.js';
import { createAdminClient } from './supabase.js';
import { getPostsByCategory } from './posts.js';

const WOMEN_OF_IMPACT_WP_ID = 135;

// ---------- public (anon; RLS allows reads) ----------
// Returns a lookup of landing images by post uuid + the manual hero post (if any).
export async function getWibCovers() {
  const { data, error } = await db.from('wib_covers').select('post_id, landing_image, is_hero');
  if (error) return { byPost: {}, heroPostId: null };
  const byPost = {};
  let heroPostId = null;
  for (const r of data || []) {
    byPost[r.post_id] = r.landing_image;
    if (r.is_hero) heroPostId = r.post_id;
  }
  return { byPost, heroPostId };
}

// The landing image for a post (formatPost has `uuid` = Supabase id), falling
// back to the article's own featured image.
export function landingFor(post, covers) {
  return covers?.byPost?.[post?.uuid] || post?.image || null;
}

// ---------- admin (service role) ----------
// Women of Impact articles merged with their landing image + hero flag.
export async function getAdminWibArticles() {
  const posts = await getPostsByCategory(WOMEN_OF_IMPACT_WP_ID, 100);
  const db2 = createAdminClient();
  const { data: covers } = await db2.from('wib_covers').select('post_id, landing_image, is_hero');
  const byPost = {};
  for (const r of covers || []) byPost[r.post_id] = r;
  return posts.map((p) => ({
    uuid: p.uuid,
    slug: p.slug,
    title: p.title,
    featured_image: p.image,
    landing_image: byPost[p.uuid]?.landing_image || null,
    is_hero: !!byPost[p.uuid]?.is_hero,
  }));
}

export async function saveWibCover(postId, landingImage) {
  const db2 = createAdminClient();
  const { error } = await db2
    .from('wib_covers')
    .upsert(
      { post_id: postId, landing_image: landingImage, updated_at: new Date().toISOString() },
      { onConflict: 'post_id' },
    );
  if (error) throw error;
}

export async function removeWibCover(postId) {
  const db2 = createAdminClient();
  const { error } = await db2.from('wib_covers').delete().eq('post_id', postId);
  if (error) throw error;
}

// Set the manual hero (clears any existing). Pass null to revert to "latest".
export async function setWibHero(postId) {
  const db2 = createAdminClient();
  const now = new Date().toISOString();
  await db2.from('wib_covers').update({ is_hero: false, updated_at: now }).eq('is_hero', true);
  if (postId) {
    // The post must already have a landing image row to be a hero.
    const { error } = await db2
      .from('wib_covers')
      .update({ is_hero: true, updated_at: now })
      .eq('post_id', postId);
    if (error) throw error;
  }
}
