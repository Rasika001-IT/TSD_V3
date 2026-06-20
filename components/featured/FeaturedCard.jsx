"use client";
import SmartImage from "../ui/SmartImage";
import Link from "next/link";

const FeaturedCard = ({ article }) => {
  return (
    <div className="mb-10 md:mb-14 border-b border-gray-200 pb-8 md:pb-10">
      <Link href={`/article/${article.slug}`}>
        <div className="w-full aspect-[16/10] md:aspect-[16/9] overflow-hidden rounded-sm">
          <SmartImage
            src={article.image}
            alt={article.title}
            className="w-[860px] h-[430px] object-cover"
          />
        </div>
      </Link>

      <Link href={`/article/${article.slug}`}>
        <h2 className="mt-4 md:mt-5 text-[28px] md:text-3xl font-heading font-semibold leading-tight md:leading-snug hover:text-[#C89632] transition">
          {article.title}
        </h2>
      </Link>

      <p className="mt-2 text-xs md:text-sm text-gray-500">
        Featured Articles • By {article.author}
      </p>

      <p
        className="mt-3 md:mt-4 text-sm md:text-base text-gray-700 leading-relaxed line-clamp-3 md:line-clamp-none"
        dangerouslySetInnerHTML={{
          __html:
            article.excerpt.slice(0, 180) + "...",
        }}
      />

      <Link
        href={`/article/${article.slug}`}
        className="inline-block mt-4 text-sm text-gray-600 hover:text-black"
      >
        Read More
      </Link>
    </div>
  );
};

export default FeaturedCard;