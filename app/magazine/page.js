import Magazine from '@/views/Magazine';
import { getPublishedMagazines } from '@/lib/magazines';

export const revalidate = 300; // ISR

export default async function Page() {
  const magazines = await getPublishedMagazines();
  return <Magazine magazines={magazines} />;
}
