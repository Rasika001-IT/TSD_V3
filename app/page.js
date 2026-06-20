import Home from '@/views/Home';
import { getAllPosts, getCategories } from '@/lib/posts';

export const revalidate = 300; // ISR

export default async function Page() {
  const [posts, categories] = await Promise.all([getAllPosts(), getCategories()]);
  const valid = posts.filter((p) => p.image); // mirrors the old filterValidPosts
  return <Home posts={valid} categories={categories} />;
}
