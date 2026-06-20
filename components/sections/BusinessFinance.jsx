"use client";
import SmartImage from "../ui/SmartImage";
import Container from "../layout/Container";
import Link from "next/link";

const BusinessFinance = ({
  posts = [],
}) => {
  const relevantPosts = posts.filter(
    (post) =>
      post.categories.includes(121) ||
      post.categories.includes(125) ||
      post.categories.includes(123)
  );

  const businessPosts =
    relevantPosts.slice(0, 6);

  if (businessPosts.length < 6)
    return null;

  const [
    mainPost,
    bottom1,
    bottom2,
    right1,
    right2,
    right3,
  ] = businessPosts;

  return (
    <section className="bg-[#C89632]/5 py-24">
      <Container>

        {/* HEADER */}
        <div className="flex justify-between items-end mb-10">
          <div className="flex flex-col gap-4">
            <span className="bg-[#C89632]/20 text-[#C89632] text-xs px-3 py-1 uppercase tracking-widest w-fit">
              Latest Stories
            </span>

            <h2 className="font-heading font-bold text-4xl">
              Business & Finance
            </h2>
          </div>

          <Link
            href="/news"
            className="text-sm font-medium hover:opacity-70 transition"
          >
            View All Articles
          </Link>
        </div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-[2fr_1fr] gap-10">

          {/* LEFT SIDE */}
          <div>

            {/* MAIN ARTICLE */}
            <Link
              href={`/article/${mainPost.slug}`}
            >
              <SmartImage
                src={mainPost.image}
                alt={mainPost.title}
                className="w-[870px] h-[435px] object-cover"
              />

              <h3
                className="font-heading font-semibold text-2xl mt-6 leading-snug"
                dangerouslySetInnerHTML={{
                  __html:
                    mainPost.title,
                }}
              />

              <p className="text-xs text-black/60 mt-3">
                By {mainPost.author}
              </p>
            </Link>

            <div className="border-t border-black/10 my-6"></div>

            {/* BOTTOM GRID */}
            <div className="grid grid-cols-2 gap-6">
              {[bottom1, bottom2].map(
                (post) => (
                  <Link
                    key={post.id}
                    href={`/article/${post.slug}`}
                  >
                    <SmartImage
                      src={post.image}
                      alt={post.title}
                      className="w-[400px] h-[200px] object-cover"
                    />

                    <p
                      className="font-heading text-sm mt-3"
                      dangerouslySetInnerHTML={{
                        __html:
                          post.title,
                      }}
                    />

                    <p className="text-xs text-black/60 mt-1">
                      By {post.author}
                    </p>
                  </Link>
                )
              )}
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="border-l border-black/10 pl-6 flex flex-col gap-8">
            {[right1, right2, right3].map(
              (post) => (
                <Link
                  key={post.id}
                  href={`/article/${post.slug}`}
                >
                  <SmartImage
                    src={post.image}
                    alt={post.title}
                    className="w-[400px] h-[200px] object-cover"
                  />

                  <p
                    className="font-heading text-sm mt-3"
                    dangerouslySetInnerHTML={{
                      __html:
                        post.title,
                    }}
                  />

                  <p className="text-xs text-black/60 mt-1">
                    By {post.author}
                  </p>
                </Link>
              )
            )}
          </div>

        </div>

      </Container>
    </section>
  );
};

export default BusinessFinance;