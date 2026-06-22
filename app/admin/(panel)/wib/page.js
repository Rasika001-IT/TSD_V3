import Link from 'next/link';
import { getAdminWibFeatures } from '@/lib/wib';
import SetActiveWibButton from '@/components/admin/SetActiveWibButton';

export const dynamic = 'force-dynamic';

export default async function WibAdmin() {
  const features = await getAdminWibFeatures();
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-heading text-2xl text-[#1D1F26]">Women in Business — Feature</h1>
        <Link
          href="/admin/wib/new"
          className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-90"
        >
          + New Feature
        </Link>
      </div>
      <p className="text-sm text-gray-500 mb-6">
        The active feature is shown on the homepage Women in Business section and the
        /women-in-business hero. Only one can be active at a time.
      </p>

      <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100">
        {features.map((f) => (
          <div key={f.id} className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50">
            {f.cover_image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={f.cover_image} alt="" className="w-20 h-12 object-cover rounded shrink-0 bg-gray-100" />
            ) : (
              <div className="w-20 h-12 rounded bg-gray-100 shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{f.title || '(no title)'}</div>
              <div className="text-xs text-gray-400 truncate">{f.article_url}</div>
            </div>
            {f.is_active ? (
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-green-100 text-green-700">active</span>
            ) : (
              <SetActiveWibButton id={f.id} />
            )}
            <Link href={`/admin/wib/${f.id}`} className="text-primary text-sm ml-2">
              Edit →
            </Link>
          </div>
        ))}
        {features.length === 0 && (
          <p className="px-4 py-10 text-center text-gray-400 text-sm">
            No features yet. Add one and mark it active.
          </p>
        )}
      </div>
    </div>
  );
}
