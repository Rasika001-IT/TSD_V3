import Home from '@/views/Home';
import { getAllPosts, getCategories } from '@/lib/posts';
import { getPublishedMagazines } from '@/lib/magazines';
import { getActiveWibFeature } from '@/lib/wib';

export const revalidate = 300; // ISR

export default async function Page() {
  const [posts, categories, magazines, wibFeature] = await Promise.all([
    getAllPosts(),
    getCategories(),
    getPublishedMagazines(),
    getActiveWibFeature(),
  ]);
  const valid = posts.filter((p) => p.image); // mirrors the old filterValidPosts
  return (
    <Home posts={valid} categories={categories} magazines={magazines} wibFeature={wibFeature} />
  );
}
