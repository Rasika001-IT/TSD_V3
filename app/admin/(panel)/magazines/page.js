import Link from 'next/link';
import { getAdminMagazines } from '@/lib/magazines';

export const dynamic = 'force-dynamic';

export default async function MagazinesAdmin() {
  const magazines = await getAdminMagazines();
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl text-[#1D1F26]">Magazines</h1>
          <p className="text-sm text-gray-500">{magazines.length} editions</p>
        </div>
        <Link
          href="/admin/magazines/new"
          className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-90"
        >
          + New Magazine
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100">
        {magazines.map((m) => (
          <Link
            key={m.id}
            href={`/admin/magazines/${m.id}`}
            className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50"
          >
            {m.cover_image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={m.cover_image} alt="" className="w-12 h-16 object-cover rounded shrink-0 bg-gray-100" />
            ) : (
              <div className="w-12 h-16 rounded bg-gray-100 shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{m.edition_title || m.post?.title || 'Untitled edition'}</div>
              <div className="text-xs text-gray-400 truncate">/magazine/{m.slug}</div>
            </div>
            <span
              className={`text-[11px] px-2 py-0.5 rounded-full ${
                m.published_at ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {m.published_at ? 'published' : 'draft'}
            </span>
            <span className="text-primary text-sm ml-2">Edit →</span>
          </Link>
        ))}
        {magazines.length === 0 && (
          <p className="px-4 py-10 text-center text-gray-400 text-sm">
            No magazines yet. Add one, or run the 0002 migration to seed the existing editions.
          </p>
        )}
      </div>
    </div>
  );
}
