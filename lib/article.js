import { getPostBySlug, getCategories, getTags, getAllPosts } from './posts.js';

// Pure (regex) FAQ extraction — safe on the server. Mirrors the original
// ArticlePage.parseFAQBlock so rendering is unchanged.
export const parseFAQBlock = (html) => {
  const faqRegex =
    /<h[1-6][^>]*>FAQs<\/h[1-6]>\s*<div class="wp-block-uagb-faq[\s\S]*?<\/div><\/div><\/div>/i;
  const faqMatch = (html || '').match(faqRegex);
  if (!faqMatch) return { cleanedContent: html, faqs: [] };

  const faqItemRegex =
    /<span class="uagb-question">[\s\S]*?<strong><strong>(.*?)<\/strong><\/strong><\/span>[\s\S]*?<div class="uagb-faq-content"><p>(.*?)<\/p><\/div>/g;
  const faqs = [];
  let m;
  while ((m = faqItemRegex.exec(faqMatch[0])) !== null) {
    faqs.push({ question: m[1], answer: m[2] });
  }
  return { cleanedContent: html.replace(faqRegex, ''), faqs };
};

// Everything the article page needs, computed on the server.
export async function getArticleData(slug) {
  const [post, categories, tags, allPosts] = await Promise.all([
    getPostBySlug(slug),
    getCategories(),
    getTags(),
    getAllPosts(),
  ]);
  if (!post) return null;

  const { cleanedContent, faqs } = parseFAQBlock(post.content);

  const taxonomyData = [
    ...categories
      .filter((c) => post.categories.includes(c.id))
      .map((c) => ({ name: c.name, slug: c.slug, type: 'category' })),
    ...tags
      .filter((t) => post.tags.includes(t.id))
      .map((t) => ({ name: t.name, slug: t.slug, type: 'tag' })),
  ];

  const isFeaturedArticle = taxonomyData.some(
    (i) => i.type === 'category' && i.slug === 'featured-articles',
  );

  const mustReadPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return {
    post: { ...post, content: cleanedContent },
    taxonomyData,
    faqs,
    mustReadPosts,
    isFeaturedArticle,
  };
}
