import { redirect } from 'next/navigation';

// Women in Business cards point at the canonical article route. This legacy
// path (ArticlePage was rendered here with no server data, so it always showed
// "Article not found") now just forwards to /article/[slug].
export default async function Page({ params }) {
  const { slug } = await params;
  redirect(`/article/${slug}`);
}
