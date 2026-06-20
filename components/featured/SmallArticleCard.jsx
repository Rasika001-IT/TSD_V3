"use client";
import SmartImage from "../ui/SmartImage";
import Link from "next/link";

const SmallArticleCard = ({
  article,
  categories,
}) => {
  const excludedSlugs = [
    "blogs",
    "news",
    "featured-articles",
    "magazine",
    "women-in-business",
    "editors-highlights",
  ];

  const matchedCategory =
    categories.find(
      (cat) =>
        article.categories.includes(cat.id) &&
        !excludedSlugs.includes(cat.slug)
    ) ||
    categories.find((cat) =>
      article.categories.includes(cat.id)
    );

  const categoryName =
    matchedCategory?.name || "Blogs";

  return (
    <div className="pb-5 md:pb-8 border-b border-gray-200">
      <Link
        href={`/article/${article.slug}`}
        className="flex gap-4 md:block"
      >
        <div className="w-[140px] h-[70px] md:w-full md:h-auto md:aspect-[2/1] overflow-hidden flex-shrink-0 rounded-sm">
          <SmartImage
            src={article.image}
            alt={article.title}
            className="w-full h-full"
          />
        </div>

        <div className="flex-1 min-w-0 md:block md:mt-4">
          <div>
            <span className="inline-block bg-[#C89632] text-white text-[9px] md:text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-sm">
              {categoryName}
            </span>
          </div>

          <h3 className="mt-2 md:mt-3 text-base md:text-xl font-heading font-semibold leading-snug hover:text-[#C89632] transition line-clamp-2">
            {article.title}
          </h3>

          <p
            className="hidden md:block mt-2 text-sm text-gray-600 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html:
                article.excerpt
                  .replace(/<[^>]+>/g, "")
                  .slice(0, 120) + "...",
            }}
          />
        </div>
      </Link>
    </div>
  );
};

export default SmallArticleCard;