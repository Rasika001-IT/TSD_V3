"use client";
import SmartImage from "../ui/SmartImage";
import { stripHtml } from "../../utils/stripHtml";
import Container from "../layout/Container";
import Link from "next/link";



const FeaturedArticles = ({
  posts = [],
  categories = [],
}) => {
  const featuredCategory =
    categories.find(
      (cat) =>
        cat.slug === "featured-articles"
    );

  if (!featuredCategory) return null;

  const featuredPosts = posts
    .filter(
      (post) =>
        post.image &&
        post.categories.includes(
          featuredCategory.id
        )
    )
    .slice(0, 6);

  if (!featuredPosts.length)
    return null;

  const [mainPost, ...sidePosts] =
    featuredPosts;

  return (
    <section className="py-24 bg-[#F5F2ED]">
      <Container>

        {/* HEADER */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="bg-[#C89632]/20 text-[#C89632] text-xs px-3 py-1 uppercase tracking-widest">
              Editor’s Choice
            </span>

            <h2 className="font-heading text-4xl font-bold mt-4">
              Featured Articles
            </h2>
          </div>

          <Link
            href="/featured"
            className="text-sm hover:opacity-70 transition"
          >
            View All →
          </Link>
        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-[2fr_1fr] gap-10">

          {/* MAIN POST */}
          <Link
            href={`/article/${mainPost.slug}`}
            className="group"
          >
            <SmartImage
              src={mainPost.image}
              alt={stripHtml(mainPost.title)}
              className="w-full h-[260px] sm:h-[340px] lg:h-[388px] rounded-sm"
            />

            <div className="mt-6">
              
              <h3
                className="font-heading text-3xl font-bold leading-tight group-hover:text-[#C89632] transition"
                dangerouslySetInnerHTML={{
                  __html: mainPost.title,
                }}
              />

              <p className="text-sm text-black/60 mt-4 leading-relaxed">
                {stripHtml(
                  mainPost.excerpt
                ).substring(0, 180)}
                ...
              </p>
            </div>
          </Link>

          {/* SIDE POSTS */}
          <div className="flex flex-col gap-8">
            {sidePosts.map((post) => (
              <Link
                key={post.id}
                href={`/article/${post.slug}`}
                className="group flex gap-5"
              >
                <SmartImage
                  src={post.image}
                  alt={stripHtml(post.title)}
                  className="w-[190px] h-[95px] flex-shrink-0 rounded-sm"
                />

                <div>
                
                  <h4
                    className="font-heading text-[16px] leading-snug group-hover:text-[#C89632] transition"
                    dangerouslySetInnerHTML={{
                      __html: post.title,
                    }}
                  />

                  <p className="text-xs text-black/50 mt-3">
                    By {post.author}
                  </p>
                </div>
              </Link>
            ))}
          </div>

        </div>

      </Container>
    </section>
  );
};

export default FeaturedArticles;