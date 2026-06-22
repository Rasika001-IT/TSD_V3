import { notFound } from 'next/navigation';
import MagazineEditor from '@/components/admin/MagazineEditor';
import { getAdminMagazine } from '@/lib/magazines';

export const dynamic = 'force-dynamic';

export default async function EditMagazine({ params }) {
  const { id } = await params;
  const magazine = await getAdminMagazine(id);
  if (!magazine) notFound();
  return <MagazineEditor magazine={magazine} />;
}
