import Link from 'next/link';
import { getAdminPosts } from '@/lib/admin';
import DeletePostButton from '@/components/admin/DeletePostButton';

export const dynamic = 'force-dynamic';

const statusColor = {
  published: 'bg-green-100 text-green-700',
  draft: 'bg-gray-100 text-gray-600',
  in_review: 'bg-amber-100 text-amber-700',
  scheduled: 'bg-blue-100 text-blue-700',
  archived: 'bg-red-100 text-red-600',
};

export default async function Dashboard() {
  const posts = await getAdminPosts(100);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl text-[#1D1F26]">Dashboard</h1>
          <p className="text-sm text-gray-500">{posts.length} posts</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-90"
        >
          + New Post
        </Link>
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
                  <span
                    className="line-clamp-1"
                    dangerouslySetInnerHTML={{ __html: p.title }}
                  />
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
                  <Link
                    href={`/admin/posts/${p.id}`}
                    className="text-primary hover:underline mr-4"
                  >
                    Edit
                  </Link>
                  <DeletePostButton id={p.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
