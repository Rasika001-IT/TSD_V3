import sanitizeHtml from 'sanitize-html';
import { createAdminClient } from './supabase.js';
import { slugify, uniqueSlug } from './slug.js';

const SANITIZE = {
  allowedTags: [
    'h1', 'h2', 'h3', 'h4', 'p', 'a', 'ul', 'ol', 'li', 'blockquote', 'strong', 'b',
    'em', 'i', 'u', 's', 'br', 'hr', 'img', 'figure', 'figcaption', 'span', 'code', 'pre',
  ],
  allowedAttributes: {
    a: ['href', 'target', 'rel'],
    img: ['src', 'alt', 'width', 'height'],
    span: ['style'],
    '*': ['class'],
  },
  allowedSchemes: ['http', 'https', 'mailto'],
};

const arr = (v) => (Array.isArray(v) ? v : []);

// Create (id=null) or update a post + its category/tag joins. Service-role.
export async function savePost(input, id = null) {
  const db = createAdminClient();

  const base = (input.slug && input.slug.trim()) || slugify(input.title || 'untitled');
  const { data: sameish } = await db.from('posts').select('id, slug').like('slug', `${base}%`);
  const taken = (sameish || []).filter((r) => r.id !== id).map((r) => r.slug);
  const slug = uniqueSlug(base, taken);

  const row = {
    title: input.title || 'Untitled',
    subtitle: input.subtitle || null,
    content: input.content ? sanitizeHtml(input.content, SANITIZE) : null,
    excerpt: input.excerpt || null,
    slug,
    post_type: input.post_type || 'news',
    status: input.status || 'draft',
    visibility: input.visibility || 'public',
    format: input.format || null,
    promotion: input.promotion || 'none',
    featured_image: input.featured_image || null,
    og_image: input.og_image || null,
    author_id: input.author_id || null,
    series_id: input.series_id || null,
    scheduled_at: input.scheduled_at || null,
    published_at:
      input.published_at ||
      (input.status === 'published' ? new Date().toISOString() : null),
    seo_title: input.seo_title || null,
    meta_description: input.meta_description || null,
    og_title: input.og_title || null,
    og_description: input.og_description || null,
    primary_keyword: input.primary_keyword || null,
    secondary_keywords: arr(input.secondary_keywords),
    entity_tags: arr(input.entity_tags),
    long_tail_variant: input.long_tail_variant || null,
    industry_tag: input.industry_tag || null,
    trend_theme_tags: arr(input.trend_theme_tags),
    region: input.region || null,
    // Reports
    pdf_url: input.pdf_url || null,
    report_type: input.report_type || null,
    is_gated: !!input.is_gated,
    page_count: input.page_count ? parseInt(input.page_count) : null,
    updated_at: new Date().toISOString(),
  };

  let postId = id;
  if (id) {
    const { error } = await db.from('posts').update(row).eq('id', id);
    if (error) throw error;
  } else {
    const { data, error } = await db.from('posts').insert(row).select('id').single();
    if (error) throw error;
    postId = data.id;
  }

  // Replace join rows
  await db.from('post_categories').delete().eq('post_id', postId);
  if (arr(input.category_ids).length) {
    await db
      .from('post_categories')
      .insert(input.category_ids.map((category_id) => ({ post_id: postId, category_id })));
  }
  await db.from('post_tags').delete().eq('post_id', postId);
  if (arr(input.tag_ids).length) {
    await db.from('post_tags').insert(input.tag_ids.map((tag_id) => ({ post_id: postId, tag_id })));
  }

  // Structured ranking entries (only when the editor sends them, i.e. rankings)
  if (Array.isArray(input.ranking_entries)) {
    await db.from('ranking_entries').delete().eq('post_id', postId);
    const rows = input.ranking_entries
      .filter((e) => e && e.person_name && e.person_name.trim())
      .map((e, i) => ({
        post_id: postId,
        rank: e.rank ? parseInt(e.rank) : i + 1,
        person_name: e.person_name.trim(),
        person_title: e.person_title || null,
        company: e.company || null,
        bio: e.bio || null,
        photo: e.photo || null,
        linkedin_url: e.linkedin_url || null,
      }));
    if (rows.length) await db.from('ranking_entries').insert(rows);
  }

  return { id: postId, slug };
}

export async function deletePost(id) {
  const db = createAdminClient();
  const { error } = await db.from('posts').delete().eq('id', id);
  if (error) throw error;
}
