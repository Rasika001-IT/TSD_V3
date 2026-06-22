import { notFound } from 'next/navigation';
import WibFeatureEditor from '@/components/admin/WibFeatureEditor';
import { getAdminWibFeature } from '@/lib/wib';

export const dynamic = 'force-dynamic';

export default async function EditWibFeature({ params }) {
  const { id } = await params;
  const feature = await getAdminWibFeature(id);
  if (!feature) notFound();
  return <WibFeatureEditor feature={feature} />;
}
