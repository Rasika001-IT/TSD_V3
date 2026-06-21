import { notFound } from 'next/navigation';
import PostPreview from '@/components/admin/PostPreview';
import { getAdminTaxonomy, getAdminPost } from '@/lib/admin';

export const dynamic = 'force-dynamic';

export default async function PreviewPost({ params }) {
  const { id } = await params;
  const [taxonomy, post] = await Promise.all([getAdminTaxonomy(), getAdminPost(id)]);
  if (!post) notFound();
  return <PostPreview post={post} taxonomy={taxonomy} />;
}
