import { notFound } from 'next/navigation';
import PostEditor from '@/components/admin/PostEditor';
import { getAdminTaxonomy, getAdminPost } from '@/lib/admin';

export const dynamic = 'force-dynamic';

export default async function EditPost({ params }) {
  const { id } = await params;
  const [taxonomy, post] = await Promise.all([getAdminTaxonomy(), getAdminPost(id)]);
  if (!post) notFound();
  return <PostEditor taxonomy={taxonomy} post={post} />;
}
