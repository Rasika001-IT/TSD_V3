import Blogs from '@/views/Blogs';
import { getPostsPaginated } from '@/lib/posts';

export const revalidate = 300; // ISR

export default async function Page() {
  const { posts, totalPosts, totalPages, currentPage } = await getPostsPaginated(1, 9);
  const valid = posts.filter((p) => p.image);
  return (
    <Blogs
      initialPosts={valid}
      initialPagination={{ currentPage, totalPages, totalPosts }}
    />
  );
}
