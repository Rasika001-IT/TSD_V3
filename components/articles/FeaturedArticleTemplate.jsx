"use client";
import Link from "next/link";

import Loader from "../ui/Loader";

import { magazines } from "../../data/magazines";

const FeaturedArticleTemplate = ({
  post,
  taxonomyData,
  mustReadPosts,
  loading,
}) => {
  if (loading || !post) {
    return (
      <Loader text="Loading article..." />
    );
  }

  const cleanTitle =
    post.title.replace(/<[^>]+>/g, "");

  // FIND MATCHING MAGAZINE
  const matchingMagazine = magazines.find(
    (magazine) =>
      magazine.featured?.articleSlug ===
      post.slug
  );

  return (
    <section className="max-w-[1100px] mx-auto px-6 py-14">

      {/* HERO IMAGE */}
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-[500px] object-cover mb-8"
        />
      )}

      {/* TITLE */}
      <h1 className="font-heading text-5xl leading-tight mb-3">
        {cleanTitle}
      </h1>

      {/* META */}
      <div className="flex flex-wrap gap-1 text-sm text-gray-500 mb-6">
        {taxonomyData.map((item, i) => (
          <Link
            key={i}
            href={`/${item.type}/${item.slug}`}
            className="hover:text-black"
          >
            {item.name}

            {i < taxonomyData.length - 1 &&
              ","}
          </Link>
        ))}

        <span>/</span>

        <Link
          href={`/author/${post.authorSlug}`}
          className="hover:text-black"
        >
          By {post.author}
        </Link>
      </div>

      {/* CONTENT */}
      <article
        className="
          prose
          prose-lg
          max-w-none
          prose-headings:font-heading
          prose-headings:text-[#1D1F26]
          prose-p:leading-8
          prose-p:mb-6
        "
        dangerouslySetInnerHTML={{
          __html: post.content
            .replace(
              /<h[1-6][^>]*>Read.*?Magazine Feature<\/h[1-6]>/i,
              ""
            )
            .replace(
              /<figure class="wp-block-image[\s\S]*?<\/figure>/i,
              ""
            ),
        }}
      />

      {/* GOLD DIVIDER */}
      <div className="flex justify-center my-16">
        <div className="w-16 h-[2px] bg-[#C89632]" />
      </div>

      {/* MAGAZINE FEATURE SECTION */}
      {matchingMagazine && (
        <section className="bg-[#F3EFE8] py-14 mb-20">
          <div className="text-center">

            <h2 className="font-heading text-4xl mb-8">
              Read {post.author}'s
              Magazine Feature
            </h2>

            <Link
              href={`/magazine/${matchingMagazine.slug}`}
              className="inline-block group"
            >
              <img
                src={matchingMagazine.image}
                alt={matchingMagazine.title}
                className="
                  mx-auto
                  w-[280px]
                  transition-transform
                  duration-300
                  group-hover:scale-105
                "
              />
            </Link>

          </div>
        </section>
      )}

      {/* MUST READ */}
      <section className="mb-24">
        <h2 className="font-heading text-4xl mb-10">
          Must Read
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {mustReadPosts.map((item) => (
            <Link
              key={item.slug}
              href={`/article/${item.slug}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[240px] object-cover mb-4"
              />

              <h3 className="font-heading text-2xl leading-snug">
                {item.title.replace(
                  /<[^>]+>/g,
                  ""
                )}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* COMMENT SECTION */}
      <section className="text-center">
        <h2 className="font-heading text-5xl mb-2">
          Leave a Comment
        </h2>

        <p className="text-gray-400 mb-8">
          Your email address will not be
          published.
        </p>

        <textarea
          placeholder="Type here..."
          className="w-full h-40 p-4 border mb-5"
        />

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <input
            placeholder="Name"
            className="border p-3"
          />

          <input
            placeholder="Email"
            className="border p-3"
          />

          <input
            placeholder="Website"
            className="border p-3"
          />
        </div>

        <button className="bg-black text-white px-8 py-3">
          Post Comment
        </button>
      </section>

    </section>
  );
};

export default FeaturedArticleTemplate;