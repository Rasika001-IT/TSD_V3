"use client";
import { stripHtml } from "../../utils/stripHtml";
import Container from "../layout/Container";
import Link from "next/link";
import SmartImage from "../ui/SmartImage";



const NewsHero = ({ post }) => {
  if (!post) return null;

  return (
    <section className="pt-10 md:pt-16 pb-10 md:pb-12">
      <Container>
        {/* IMAGE */}
        <div className="flex justify-center mb-6 md:mb-10">
          <Link href={`/article/${post.slug}`} className="w-full">
            <SmartImage
              src={post.image}
              alt="news"
              className="w-[968px] max-w-[1000px] h-[260px] sm:h-[340px] md:h-[484px] rounded-xl md:rounded-sm mx-auto"
            />
          </Link>
        </div>

        {/* TITLE + EXCERPT */}
        <div className="max-w-[820px] mx-auto text-center px-2 sm:px-4">
          <Link href={`/article/${post.slug}`}>
            <h1
              className="font-heading font-bold text-[28px] sm:text-[32px] md:text-[36px] leading-[1.2] md:leading-[1.25] mb-4 hover:opacity-80"
              dangerouslySetInnerHTML={{ __html: post.title }}
            />
          </Link>

          <p className="font-body text-[14px] md:text-[15px] text-gray-600 leading-[1.7] line-clamp-4 md:line-clamp-none">
            {stripHtml(post.excerpt)}
          </p>
        </div>
      </Container>
    </section>
  );
};

export default NewsHero;