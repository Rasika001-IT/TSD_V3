import News from '@/views/News';
import { getAllPosts } from '@/lib/posts';

export const revalidate = 300; // ISR

export default async function Page() {
  const posts = (await getAllPosts()).filter((p) => p.image);
  return <News posts={posts} />;
}
