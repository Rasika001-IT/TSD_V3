import Link from 'next/link';
import { getSessionUser } from '@/lib/supabase-server';
import SignOutButton from '@/components/admin/SignOutButton';

export const dynamic = 'force-dynamic';

export default async function PanelLayout({ children }) {
  const user = await getSessionUser();

  return (
    <div className="min-h-screen flex bg-[#FCF9F4]">
      {/* SIDEBAR */}
      <aside className="w-60 shrink-0 bg-[#1D1F26] text-white flex flex-col">
        <div className="px-6 py-6 border-b border-white/10">
          <div className="font-heading text-xl leading-tight">The Success Digest</div>
          <div className="text-[11px] uppercase tracking-widest text-primary mt-1">CMS</div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 text-sm">
          <Link href="/admin" className="block px-3 py-2 rounded-md hover:bg-white/10">Dashboard</Link>
          <Link href="/admin/posts/new" className="block px-3 py-2 rounded-md hover:bg-white/10">+ New Post</Link>
        </nav>
        <div className="px-4 py-4 border-t border-white/10 text-xs text-white/60">
          <div className="truncate mb-2">{user?.email}</div>
          <SignOutButton />
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
