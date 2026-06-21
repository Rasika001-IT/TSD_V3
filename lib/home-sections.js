// Single source of truth for how homepage sections map to categories.
//
// The public sections filter posts by the WordPress numeric category id
// (`wpId`, preserved as `wp_id` in Supabase). The admin preview only has
// category slugs, so each entry carries both. Keep these in sync with the
// `categories` table. This file is consumed by:
//   - components/sections/MoreSections.jsx  (renders the grid)
//   - components/admin/PostPreview.jsx       (highlights where a post appears)
// so the preview never drifts from the live layout.

export const MORE_SECTIONS = [
  { title: 'Regulations', slug: 'regulations', wpId: 127, route: '/news/regulations' },
  { title: 'Sports', slug: 'sports', wpId: 124, route: '/news/sports' },
  { title: 'Startups', slug: 'startups', wpId: 126, route: '/news/startups' },
  { title: 'AI', slug: 'ai', wpId: 167, route: '/category/ai' },
  { title: 'Industry', slug: 'industries', wpId: 125, route: '/news/industries' },
  { title: 'Markets', slug: 'markets', wpId: 122, route: '/news/markets' },
  { title: 'Travel', slug: 'travel', wpId: 134, route: '/blogs/travel' },
  { title: 'Events', slug: 'events', wpId: 131, route: '/blogs/events' },
];

// Other homepage sections a post can surface in, by category slug. Used by the
// preview's highlight logic. BusinessFinance's component stays as-is; its
// membership is mirrored here so the preview matches it.
export const HOME_SECTIONS = {
  featuredArticles: { label: 'Featured Articles', slugs: ['featured-articles'] },
  womenInBusiness: { label: 'Women in Business', slugs: ['women-of-impact'] },
  businessFinance: { label: 'Business & Finance', slugs: ['breaking-news', 'industries', 'crypto'] },
  blogs: {
    label: 'Blogs',
    slugs: ['explainers', 'how-to', 'lifestyle', 'sports-blogs', 'travel', 'events', 'crypto-blogs'],
  },
};
