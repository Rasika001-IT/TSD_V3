"use client";
import Container from "../layout/Container";
import Link from "next/link";

const BLOG_SUBCATEGORY_MAP = {
  128: "Explainer",
  129: "How To",
  131: "Events",
  133: "Crypto",
};

const stripHtml = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;

  return (
    div.textContent ||
    div.innerText ||
    ""
  );
};

const truncateText = (
  text,
  limit
) => {
  if (text.length <= limit)
    return text;

  return (
    text.substring(0, limit).trim() +
    "..."
  );
};

const getBlogBadge = (
  categories
) => {
  const matchedCategory =
    categories.find(
      (catId) =>
        BLOG_SUBCATEGORY_MAP[
          catId
        ]
    );

  return matchedCategory
    ? BLOG_SUBCATEGORY_MAP[
        matchedCategory
      ]
    : "Blog";
};

const Blogs = ({
  posts = [],
}) => {
  const blogPosts = posts
    .filter((post) =>
      post.categories.includes(118)
    )
    .slice(0, 8);

  if (!blogPosts.length)
    return null;

  return (
    <section className="bg-[#C89632]/5 py-24">
      <Container>

        {/* HEADER */}
        <div className="flex justify-between items-end mb-12">
          <div className="flex flex-col gap-4">
            <span className="bg-[#C89632]/20 text-[#C89632] text-xs px-3 py-1 uppercase tracking-widest w-fit">
              Latest Stories
            </span>

            <h2 className="font-heading font-bold text-4xl">
              Blogs
            </h2>
          </div>

          <Link
            href="/blogs"
            className="text-sm font-medium hover:opacity-70 transition"
          >
            View All Articles
          </Link>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {blogPosts.map(
            (post) => (
              <Link
                key={post.id}
                href={`/article/${post.slug}`}
              >
                <div className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 flex flex-col h-full">

                  {/* IMAGE */}
                  <img
                    src={post.image}
                    alt={stripHtml(
                      post.title
                    )}
                    className="w-[312px] h-[156px] object-cover"
                  />

                  {/* CONTENT */}
                  <div className="bg-white p-5 flex flex-col flex-grow">

                    {/* TAG */}
                    <span className="bg-[#C89632] text-white text-[10px] px-2 py-1 uppercase tracking-wide w-fit">
                      {getBlogBadge(
                        post.categories
                      )}
                    </span>

                    {/* TITLE */}
                    <h3
                      className="font-heading font-semibold text-[16px] mt-3 leading-snug"
                      dangerouslySetInnerHTML={{
                        __html:
                          post.title,
                      }}
                    />

                    {/* DESC */}
                    <p className="text-[13px] text-black/60 mt-2 leading-relaxed">
                      {truncateText(
                        stripHtml(
                          post.excerpt
                        ),
                        90
                      )}
                    </p>

                    {/* CTA */}
                    <div className="mt-auto pt-4">
                      <p className="text-[#C89632] text-sm font-medium cursor-pointer hover:underline">
                        Read More
                      </p>
                    </div>

                  </div>

                </div>
              </Link>
            )
          )}

        </div>

      </Container>
    </section>
  );
};

export default Blogs;