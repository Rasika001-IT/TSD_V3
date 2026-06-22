import Home from '@/views/Home';
import { getAllPosts, getCategories } from '@/lib/posts';
import { getPublishedMagazines } from '@/lib/magazines';
import { getWibCovers } from '@/lib/wib';

export const revalidate = 300; // ISR

export default async function Page() {
  const [posts, categories, magazines, wibCovers] = await Promise.all([
    getAllPosts(),
    getCategories(),
    getPublishedMagazines(),
    getWibCovers(),
  ]);
  const valid = posts.filter((p) => p.image); // mirrors the old filterValidPosts
  return (
    <Home posts={valid} categories={categories} magazines={magazines} wibCovers={wibCovers} />
  );
}
