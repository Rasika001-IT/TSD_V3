import Link from 'next/link';
import { getAdminHubs } from '@/lib/admin';

export const dynamic = 'force-dynamic';

export default async function HubsAdmin() {
  const hubs = await getAdminHubs();
  return (
    <div className="p-8">
      <h1 className="font-heading text-2xl text-[#1D1F26] mb-6">Industry Hubs</h1>
      <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100">
        {hubs.map((h) => (
          <Link key={h.id} href={`/admin/hubs/${h.id}`} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50">
            <div>
              <div className="font-medium">{h.name}</div>
              <div className="text-xs text-gray-400">/hubs/{h.slug}</div>
            </div>
            <span className="text-primary text-sm">Edit →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
