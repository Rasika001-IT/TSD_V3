"use client";
import "./marquee.css";

const trendingIcon = "/assets/icons/trending.svg";

import Link from "next/link";

const formatTimeAgo = (
  dateString
) => {
  const now = new Date();

  const postDate = new Date(
    dateString
  );

  const diffMs =
    now - postDate;

  const diffHours =
    Math.floor(
      diffMs /
        (1000 * 60 * 60)
    );

  if (diffHours < 1)
    return "Just now";

  if (diffHours < 24)
    return `${diffHours} hour${
      diffHours > 1
        ? "s"
        : ""
    } ago`;

  const diffDays =
    Math.floor(
      diffHours / 24
    );

  return `${diffDays} day${
    diffDays > 1
      ? "s"
      : ""
  } ago`;
};

const TrendingMarquee = ({
  posts = [],
}) => {
  const trendingItems =
    posts.slice(0, 5);

  return (
    <section className="bg-[#0E1116] text-white py-10 overflow-hidden">

      {/* LABEL */}
      <div className="flex items-center gap-2 px-8 text-[#C89632] text-sm font-medium mb-6">
        <img
          src={trendingIcon}
          alt="trending"
          className="w-4 h-4"
        />

        TRENDING
      </div>

      {/* MARQUEE */}
      <div className="marquee">
        <div className="marquee-track">

          {[
            ...trendingItems,
            ...trendingItems,
          ].map(
            (
              item,
              index
            ) => (
              <Link
                key={index}
                href={`/article/${item.slug}`}
                className="flex items-start gap-4 mr-3 min-w-[320px] hover:opacity-80 transition"
              >
                {/* NUMBER */}
                <span className="text-[#C89632] text-[32px] font-heading leading-none">
                  {String(
                    (index %
                      trendingItems.length) +
                      1
                  ).padStart(
                    2,
                    "0"
                  )}
                </span>

                {/* TEXT */}
                <div className="max-w-[240px]">
                  <p
                    className="font-heading font-bold text-[16px] leading-[1.3]"
                    dangerouslySetInnerHTML={{
                      __html:
                        item.title,
                    }}
                  />

                  <p className="text-xs text-white/50 mt-2">
                    {formatTimeAgo(
                      item.date
                    )}
                  </p>
                </div>
              </Link>
            )
          )}

        </div>
      </div>

    </section>
  );
};

export default TrendingMarquee;