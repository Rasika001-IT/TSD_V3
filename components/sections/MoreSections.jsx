"use client";
import SmartImage from "../ui/SmartImage";
import { stripHtml } from "../../utils/stripHtml";
import Container from "../layout/Container";
import Link from "next/link";

const SECTION_CONFIG = [
  {
    title: "Regulations",
    categoryId: 121,
    route: "/category/breaking-news",
    offset: 0,
  },
  {
    title: "Sports",
    categoryId: 121,
    route: "/category/breaking-news",
    offset: 4,
  },
  {
    title: "Startups",
    categoryId: 128,
    route: "/category/explainers",
    offset: 0,
  },
  {
    title: "Crypto",
    categoryId: 123,
    route: "/category/crypto",
    offset: 0,
  },
  {
    title: "Industry",
    categoryId: 125,
    route: "/category/industries",
    offset: 0,
  },
  {
    title: "Markets",
    categoryId: 125,
    route: "/category/industries",
    offset: 4,
  },
  {
    title: "Travel",
    categoryId: 129,
    route: "/category/how-to",
    offset: 0,
  },
  {
    title: "Events",
    categoryId: 131,
    route: "/category/events",
    offset: 0,
  },
];



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

const MoreSections = ({
  posts = [],
}) => {
  return (
    <section className="bg-[#C89632]/5 py-20">
      <Container>

        {/* HEADER */}
        <div className="text-center mb-14">
          <h2 className="font-heading font-bold text-4xl">
            More Sections
          </h2>

          <div className="w-16 h-[2px] bg-[#C89632] mx-auto mt-3"></div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

          {SECTION_CONFIG.map(
            (section, index) => {
              const categoryPosts =
                posts
                  .filter((post) =>
                    post.categories.includes(
                      section.categoryId
                    )
                  )
                  .slice(
                    section.offset,
                    section.offset + 4
                  );

              if (
                categoryPosts.length < 4
              )
                return null;

              const [
                mainPost,
                ...bulletPosts
              ] = categoryPosts;

              return (
                <div
                  key={index}
                  className={`
                  px-6 py-6
                  border-r border-[#000]/10
                  [&:nth-child(4n)]:border-r-0
                  ${
                    index >= 4
                      ? "border-t border-[#000]/10 pt-8"
                      : ""
                  }
                `}
                >

                  {/* CATEGORY LABEL */}
                  <Link
                    href={section.route}
                    className="text-xs uppercase tracking-wide mb-4 font-semibold text-[#444] block hover:text-[#C89632] transition"
                  >
                    {section.title} →
                  </Link>

                  {/* MAIN IMAGE */}
                  <Link
                    href={`/article/${mainPost.slug}`}
                  >
                    <SmartImage
                      src={mainPost.image}
                      alt={stripHtml(
                        mainPost.title
                      )}
                      className="w-full aspect-[2/1] mb-4"
                    />
                  </Link>

                  {/* MAIN TITLE */}
                  <Link
                    href={`/article/${mainPost.slug}`}
                  >
                    <h3
                      className="font-heading font-semibold text-[18px] leading-snug mb-4 hover:text-[#C89632] transition"
                      dangerouslySetInnerHTML={{
                        __html:
                          mainPost.title,
                      }}
                    />
                  </Link>

                  {/* BULLET POSTS */}
                  <ul className="space-y-3 text-[14px] text-[#666]">
                    {bulletPosts.map(
                      (post) => (
                        <li
                          key={post.id}
                        >
                          <Link
                            href={`/article/${post.slug}`}
                            className="hover:text-[#C89632] transition"
                          >
                            •{" "}
                            {truncateText(
                              stripHtml(
                                post.title
                              ),
                              65
                            )}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>

                </div>
              );
            }
          )}

        </div>

      </Container>
    </section>
  );
};

export default MoreSections;