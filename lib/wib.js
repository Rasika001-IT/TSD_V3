import { db } from './db.js';
import { createAdminClient } from './supabase.js';

// ---------- public (anon; RLS returns only the active row) ----------
export async function getActiveWibFeature() {
  const { data, error } = await db
    .from('wib_features')
    .select('*')
    .eq('is_active', true)
    .maybeSingle();
  if (error) return null;
  return data || null;
}

// ---------- admin (service role) ----------
export async function getAdminWibFeatures() {
  const db2 = createAdminClient();
  const { data } = await db2
    .from('wib_features')
    .select('*')
    .order('is_active', { ascending: false })
    .order('created_at', { ascending: false });
  return data || [];
}

export async function getAdminWibFeature(id) {
  const db2 = createAdminClient();
  const { data } = await db2.from('wib_features').select('*').eq('id', id).maybeSingle();
  return data || null;
}

// Only one feature may be active (DB enforces via a partial unique index), so
// clear any current active row before marking this one.
async function clearActive(db2) {
  await db2
    .from('wib_features')
    .update({ is_active: false, updated_at: new Date().toISOString() })
    .eq('is_active', true);
}

export async function saveWibFeature(input, id = null) {
  const db2 = createAdminClient();
  const now = new Date().toISOString();
  const wantActive = !!input.is_active;
  if (wantActive) await clearActive(db2);

  const row = {
    article_url: input.article_url,
    cover_image: input.cover_image || null,
    title: input.title?.trim() || null,
    is_active: wantActive,
    updated_at: now,
  };

  if (id) {
    const { error } = await db2.from('wib_features').update(row).eq('id', id);
    if (error) throw error;
    return { id };
  }
  const { data, error } = await db2.from('wib_features').insert(row).select('id').single();
  if (error) throw error;
  return { id: data.id };
}

export async function setActiveWibFeature(id) {
  const db2 = createAdminClient();
  await clearActive(db2);
  const { error } = await db2
    .from('wib_features')
    .update({ is_active: true, updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw error;
}

export async function deleteWibFeature(id) {
  const db2 = createAdminClient();
  const { error } = await db2.from('wib_features').delete().eq('id', id);
  if (error) throw error;
}
