"use client";
import { stripHtml } from "../../utils/stripHtml";
import Link from "next/link";
import SmartImage from "../ui/SmartImage";



const NewsCardVertical = ({ post }) => {
  return (
    <Link href={`/article/${post.slug}`}>
      <div className="cursor-pointer group transition-all duration-300 hover:opacity-90 space-y-3">
        <SmartImage
          src={post.image}
          alt="news"
          className="w-[340px] max-w-full h-[220px] md:h-[170px] rounded-xl md:rounded-sm"
        />

        <h3
          className="font-heading text-[18px] md:text-[15px] leading-[1.5] group-hover:underline"
          dangerouslySetInnerHTML={{ __html: post.title }}
        />

        <p className="font-body text-[14px] md:text-[13.5px] text-gray-600 leading-[1.7] line-clamp-4 md:line-clamp-none">
          {stripHtml(post.excerpt)}
        </p>
      </div>
    </Link>
  );
};

export default NewsCardVertical;