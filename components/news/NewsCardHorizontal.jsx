"use client";
import { stripHtml } from "../../utils/stripHtml";
import Link from "next/link";
import SmartImage from "../ui/SmartImage";



const NewsCardHorizontal = ({ post }) => {
  return (
    <Link href={`/article/${post.slug}`}>
      <div className="flex flex-col sm:flex-row gap-5 md:gap-8 items-start cursor-pointer group transition-all duration-300 hover:opacity-90">
        <SmartImage
          src={post.image}
          alt="news"
          className="w-[310px] sm:w-[240px] md:w-[260px] h-[220px] sm:h-[160px] md:h-[155px] flex-shrink-0 rounded-xl md:rounded-sm"
        />

        <div className="w-full max-w-[520px]">
          <h3
            className="font-heading text-[20px] md:text-[18px] leading-[1.4] mb-3 group-hover:underline"
            dangerouslySetInnerHTML={{ __html: post.title }}
          />

          <p className="font-body text-[14px] text-gray-600 leading-[1.7] mb-3 line-clamp-4 md:line-clamp-none">
            {stripHtml(post.excerpt)}
          </p>

          <span className="font-body text-[12px] text-gray-400">
            {post.author}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default NewsCardHorizontal;