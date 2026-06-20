import { notFound } from 'next/navigation';
import ArticlePage from '@/views/ArticlePage';
import { getArticleData } from '@/lib/article';
import { stripHtml } from '@/utils/stripHtml';

export const revalidate = 300; // ISR

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await getArticleData(slug);
  if (!data) return { title: 'Article not found · The Success Digest' };
  const { post } = data;
  const title = stripHtml(post.title);
  const description = stripHtml(post.excerpt).slice(0, 160);
  return {
    title: `${title} · The Success Digest`,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const data = await getArticleData(slug);
  if (!data) notFound();
  return <ArticlePage {...data} />;
}
