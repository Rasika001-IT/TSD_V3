import Link from 'next/link';
import { getAdminPosts, POST_SORTS } from '@/lib/admin';
import DeletePostButton from '@/components/admin/DeletePostButton';
import SortSelect from '@/components/admin/SortSelect';

export const dynamic = 'force-dynamic';

const PER_PAGE = 50;

const statusColor = {
  published: 'bg-green-100 text-green-700',
  draft: 'bg-gray-100 text-gray-600',
  in_review: 'bg-amber-100 text-amber-700',
  scheduled: 'bg-blue-100 text-blue-700',
  archived: 'bg-red-100 text-red-600',
};

export default async function Dashboard({ searchParams }) {
  const sp = (await searchParams) || {};
  const sort = POST_SORTS[sp.sort] ? sp.sort : 'recent';
  const page = Math.max(1, parseInt(sp.page, 10) || 1);

  const { posts, total } = await getAdminPosts({ page, perPage: PER_PAGE, sort });
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const start = total === 0 ? 0 : (page - 1) * PER_PAGE + 1;
  const end = (page - 1) * PER_PAGE + posts.length;

  const qs = (p) => {
    const params = new URLSearchParams();
    if (sort !== 'recent') params.set('sort', sort);
    if (p > 1) params.set('page', String(p));
    const s = params.toString();
    return s ? `/admin?${s}` : '/admin';
  };

  return (
    <div className="p-8">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl text-[#1D1F26]">Dashboard</h1>
          <p className="text-sm text-gray-500">
            {total} {total === 1 ? 'post' : 'posts'} · showing {start}–{end}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <SortSelect sorts={POST_SORTS} current={sort} />
          <Link
            href="/admin/posts/new"
            className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-90"
          >
            + New Post
          </Link>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-left">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Updated</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {posts.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 max-w-md">
                  <span className="line-clamp-1" dangerouslySetInnerHTML={{ __html: p.title }} />
                </td>
                <td className="px-4 py-3 capitalize text-gray-600">{p.post_type}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[11px] ${
                      statusColor[p.status] || 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {p.updated_at ? new Date(p.updated_at).toLocaleDateString() : '—'}
                </td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <Link href={`/admin/posts/${p.id}`} className="text-primary hover:underline mr-4">
                    Edit
                  </Link>
                  <DeletePostButton id={p.id} />
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-gray-400">
                  No posts on this page.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-5 text-sm">
        <span className="text-gray-500">
          Page {page} of {totalPages}
        </span>
        <div className="flex items-center gap-2">
          {page > 1 ? (
            <Link
              href={qs(page - 1)}
              className="px-4 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50"
            >
              ← Previous
            </Link>
          ) : (
            <span className="px-4 py-2 rounded-md border border-gray-200 text-gray-300 cursor-not-allowed">
              ← Previous
            </span>
          )}
          {page < totalPages ? (
            <Link
              href={qs(page + 1)}
              className="px-4 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50"
            >
              Next →
            </Link>
          ) : (
            <span className="px-4 py-2 rounded-md border border-gray-200 text-gray-300 cursor-not-allowed">
              Next →
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
