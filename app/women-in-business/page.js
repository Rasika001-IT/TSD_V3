import WomenInBusiness from '@/views/WomenInBusiness';
import { getPostsByCategory } from '@/lib/posts';

export const revalidate = 300; // ISR

export default async function Page() {
  // Women of Impact (WP category 135)
  const posts = (await getPostsByCategory(135)).slice(0, 5);
  return <WomenInBusiness posts={posts} />;
}
