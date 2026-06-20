"use client";
import Link from "next/link";

const BlogCard = ({ data }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition duration-300">
      
      {/* IMAGE */}
      <div className="w-full h-[200px] overflow-hidden">
        {data.image && (
          <img
            src={data.image}
            alt={data.title}
            className="w-[360px] h-[180px] object-cover"
          />
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5">
        
        {/* TAG - Use first category name or default */}
        <span className="inline-block bg-primary text-white text-[10px] font-semibold px-2 py-[2px] mb-3">
          {data.categories && data.categories.length > 0 
            ? data.categories[0].name 
            : "EXCLUSIVE"
          }
        </span>

        {/* TITLE */}
        <Link href={`/article/${data.slug}`}>
          <h3 
            className="font-heading text-[18px] leading-snug mb-2 hover:text-primary transition cursor-pointer"
            dangerouslySetInnerHTML={{ __html: data.title }}
          />
        </Link>

        {/* DESCRIPTION */}
        <div 
          className="font-body text-sm text-gray-600 mb-3 leading-relaxed line-clamp-3"
          dangerouslySetInnerHTML={{ __html: data.excerpt }}
        />

        {/* META INFO */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <span>By {data.author || "TSD Staff"}</span>
          <span>{new Date(data.date).toLocaleDateString()}</span>
        </div>

        {/* CTA */}
        <Link href={`/article/${data.slug}`}>
          <button className="text-sm text-primary font-medium hover:underline">
            Read More
          </button>
        </Link>

      </div>
    </div>
  );
};

export default BlogCard;