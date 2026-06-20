import News from '@/views/News';
import { getPostsPaginated } from '@/lib/posts';

export const revalidate = 300; // ISR

export default async function Page() {
  const { posts, totalPosts, totalPages, currentPage } = await getPostsPaginated(1, 7);
  const valid = posts.filter((p) => p.image);
  return (
    <News
      initialPosts={valid}
      initialPagination={{ currentPage, totalPages, totalPosts }}
    />
  );
}
