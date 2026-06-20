"use client";
import FeaturedCard from "./FeaturedCard";
import Sidebar from "./Sidebar";

const FeaturedLayout = ({
  featuredPosts,
  blogPosts,
  categories,
  onLoadMore,
  hasMore,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

      <div className="lg:col-span-8">

        {featuredPosts.map((article) => (
          <FeaturedCard
            key={article.id}
            article={article}
          />
        ))}

        {hasMore && (
          <button
            onClick={onLoadMore}
            className="mt-2 md:mt-6 px-5 py-2.5 bg-black text-white text-sm rounded-md hover:opacity-90 transition"
          >
            View More
          </button>
        )}

      </div>

      <div className="lg:col-span-4 lg:border-l border-gray-300 lg:pl-8 pt-2 lg:pt-0">

        <Sidebar
          posts={blogPosts}
          categories={categories}
        />

      </div>

    </div>
  );
};

export default FeaturedLayout;