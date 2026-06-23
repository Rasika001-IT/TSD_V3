import { db } from './db.js';
import { createAdminClient } from './supabase.js';
import { slugify, uniqueSlug } from './slug.js';

// Embeds the featured post (cover story) so callers get its title/excerpt/image.
const WITH_POST = '*, post:posts(slug, title, excerpt, featured_image)';

// ---------- public (anon client; RLS returns only published) ----------
export async function getPublishedMagazines() {
  const { data, error } = await db
    .from('magazines')
    .select(WITH_POST)
    .order('published_at', { ascending: false });
  if (error) return [];
  return data || [];
}

export async function getMagazineBySlug(slug) {
  const { data, error } = await db
    .from('magazines')
    .select(WITH_POST)
    .eq('slug', slug)
    .maybeSingle();
  if (error) return null;
  return data || null;
}

// The published magazine that features a given post (for the article backlink).
export async function getMagazineByPostId(postId) {
  if (!postId) return null;
  const { data, error } = await db
    .from('magazines')
    .select('slug, edition_title, cover_image')
    .eq('post_id', postId)
    .maybeSingle();
  if (error) return null;
  return data || null;
}

// ---------- admin (service role; sees drafts) ----------
// Sort options for the admin magazines list. Default = most recently
// uploaded/edited (updated_at desc), matching the posts dashboard convention.
export const MAGAZINE_SORTS = {
  recent: { label: 'Recently Edited', column: 'updated_at', ascending: false },
  oldest: { label: 'Oldest Edited', column: 'updated_at', ascending: true },
  added: { label: 'Recently Added', column: 'created_at', ascending: false },
  published: { label: 'Recently Published', column: 'published_at', ascending: false },
  title: { label: 'Title (A–Z)', column: 'edition_title', ascending: true },
};

export async function getAdminMagazines(sort = 'recent') {
  const db2 = createAdminClient();
  const s = MAGAZINE_SORTS[sort] || MAGAZINE_SORTS.recent;
  const { data } = await db2
    .from('magazines')
    .select('*, post:posts(slug, title)')
    .order(s.column, { ascending: s.ascending, nullsFirst: false });
  return data || [];
}

export async function getAdminMagazine(id) {
  const db2 = createAdminClient();
  const { data } = await db2.from('magazines').select(WITH_POST).eq('id', id).maybeSingle();
  return data || null;
}

export async function saveMagazine(input, id = null) {
  const db2 = createAdminClient();
  const now = new Date().toISOString();

  // Keep the URL stable: generate a slug only on create.
  let slug;
  let existingPublishedAt = null;
  if (id) {
    const { data: existing } = await db2
      .from('magazines')
      .select('slug, published_at')
      .eq('id', id)
      .maybeSingle();
    slug = existing?.slug;
    existingPublishedAt = existing?.published_at || null;
  }
  if (!slug) {
    let base = (input.edition_title || '').trim();
    if (!base && input.post_id) {
      const { data: p } = await db2.from('posts').select('title').eq('id', input.post_id).maybeSingle();
      base = p?.title || 'magazine';
    }
    base = slugify(base) || 'magazine';
    const { data: rows } = await db2.from('magazines').select('slug').like('slug', `${base}%`);
    slug = uniqueSlug(base, (rows || []).map((r) => r.slug));
  }

  const publishing = input.status === 'published';
  const row = {
    slug,
    edition_title: input.edition_title?.trim() || null,
    fliphtml5_url: input.fliphtml5_url,
    post_id: input.post_id || null,
    cover_image: input.cover_image || null,
    podcast_audio: input.podcast_audio?.trim() || null,
    published_at: publishing ? existingPublishedAt || now : null,
    updated_at: now,
  };

  if (id) {
    const { error } = await db2.from('magazines').update(row).eq('id', id);
    if (error) throw error;
    return { id, slug };
  }
  const { data, error } = await db2.from('magazines').insert(row).select('id, slug').single();
  if (error) throw error;
  return { id: data.id, slug: data.slug };
}

export async function deleteMagazine(id) {
  const db2 = createAdminClient();
  const { error } = await db2.from('magazines').delete().eq('id', id);
  if (error) throw error;
}
