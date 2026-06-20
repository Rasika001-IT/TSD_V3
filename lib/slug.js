// URL-safe slug from a title (mirrors WordPress slug style).
export const slugify = (str = '') =>
  String(str)
    .toLowerCase()
    .replace(/<[^>]*>/g, '')
    .replace(/&[a-z0-9#]+;/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

// Ensure uniqueness against existing slugs by appending -2, -3, …
export const uniqueSlug = (base, taken = []) => {
  const set = new Set(taken);
  if (!set.has(base)) return base;
  let n = 2;
  while (set.has(`${base}-${n}`)) n++;
  return `${base}-${n}`;
};
