import PostEditor from '@/components/admin/PostEditor';
import { getAdminTaxonomy } from '@/lib/admin';

export const dynamic = 'force-dynamic';

export default async function NewPost({ searchParams }) {
  const sp = (await searchParams) || {};
  const taxonomy = await getAdminTaxonomy();
  // "+ Add Article" from the Women in Business tab pre-selects that category.
  const preselect = sp.type === 'women' ? 'women-of-impact' : null;
  return <PostEditor taxonomy={taxonomy} post={null} preselectCategorySlug={preselect} />;
}
