import WomenInBusiness from '@/views/WomenInBusiness';
import { getPostsByCategory } from '@/lib/posts';
import { getActiveWibFeature } from '@/lib/wib';

export const revalidate = 300; // ISR

export default async function Page() {
  // Women of Impact (WP category 135)
  const [posts, feature] = await Promise.all([
    getPostsByCategory(135).then((p) => p.slice(0, 5)),
    getActiveWibFeature(),
  ]);
  return <WomenInBusiness posts={posts} feature={feature} />;
}
