import WomenInBusiness from '@/views/WomenInBusiness';
import { getPostsByCategory } from '@/lib/posts';
import { getWibCovers } from '@/lib/wib';

export const revalidate = 300; // ISR

export default async function Page() {
  // Women of Impact (WP category 135)
  const [posts, covers] = await Promise.all([
    getPostsByCategory(135).then((p) => p.slice(0, 12)),
    getWibCovers(),
  ]);
  return <WomenInBusiness posts={posts} covers={covers} />;
}
