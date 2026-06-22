import { getAdminWibArticles } from '@/lib/wib';
import WibArticleRow from '@/components/admin/WibArticleRow';

export const dynamic = 'force-dynamic';

export default async function WibAdmin() {
  const articles = await getAdminWibArticles();
  const hasHero = articles.some((a) => a.is_hero);

  return (
    <div className="p-8">
      <h1 className="font-heading text-2xl text-[#1D1F26] mb-2">Women in Business</h1>
      <p className="text-sm text-gray-500 mb-6">
        All Women of Impact articles. Give each a <strong>landing image</strong> (the curated
        portrait used on the homepage carousel and the /women-in-business hero) — separate from the
        article's own featured image. The hero shows the article marked “Hero”, or the most-recent
        article if none is set.
        {!hasHero && (
          <span className="ml-1 text-amber-600">Hero is currently the latest article.</span>
        )}
      </p>

      <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100">
        {articles.map((a) => (
          <WibArticleRow key={a.uuid} article={a} />
        ))}
        {articles.length === 0 && (
          <p className="px-4 py-10 text-center text-gray-400 text-sm">
            No Women of Impact articles found. Tag posts with the “Women of Impact” category.
          </p>
        )}
      </div>
    </div>
  );
}
