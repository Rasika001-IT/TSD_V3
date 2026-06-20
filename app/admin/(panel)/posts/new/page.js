import PostEditor from '@/components/admin/PostEditor';
import { getAdminTaxonomy } from '@/lib/admin';

export const dynamic = 'force-dynamic';

export default async function NewPost() {
  const taxonomy = await getAdminTaxonomy();
  return <PostEditor taxonomy={taxonomy} post={null} />;
}
