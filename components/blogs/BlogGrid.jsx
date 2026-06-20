"use client";
import Container from "../layout/Container";
import BlogCard from "./BlogCard";
import Loader from "../ui/Loader";

const BlogGrid = ({
  posts,
  loading,
  pagination,
  changePage,
}) => {
  return (
    <section className="py-20">
      <Container>

        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold mb-3">
            Latest Stories
          </h2>

          <p className="font-body text-sm text-gray-600 mb-5">
            Browse and read the latest stuff
          </p>

          <div className="w-20 h-[2px] bg-primary mx-auto"></div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.length > 0 ? (
            posts.map((blog) => (
              <BlogCard key={blog.id} data={blog} />
            ))
          ) : (
            <div className="col-span-full text-center">
              <p className="text-gray-500">
                No blog posts available.
              </p>
            </div>
          )}
        </div>

        {/* PAGINATION */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">

            {/* Previous Button */}
            <button
              onClick={() =>
                changePage(pagination.currentPage - 1)
              }
              disabled={pagination.currentPage === 1}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                pagination.currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Previous
            </button>

            {/* Page Numbers with Ellipsis */}
            <div className="flex gap-1">
              {(() => {
                const { currentPage, totalPages } =
                  pagination;

                const pages = [];

                // Always show first page
                if (currentPage > 3) {
                  pages.push(
                    <button
                      key={1}
                      onClick={() => changePage(1)}
                      className="w-10 h-10 rounded-md text-sm font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                    >
                      1
                    </button>
                  );

                  // Show ellipsis if gap exists
                  if (currentPage > 4) {
                    pages.push(
                      <span
                        key="ellipsis-start"
                        className="w-10 h-10 flex items-center justify-center text-gray-500"
                      >
                        ...
                      </span>
                    );
                  }
                }

                // Current page range
                const startPage = Math.max(
                  1,
                  currentPage - 1
                );

                const endPage = Math.min(
                  totalPages,
                  currentPage + 2
                );

                for (
                  let i = startPage;
                  i <= endPage;
                  i++
                ) {
                  pages.push(
                    <button
                      key={i}
                      onClick={() => changePage(i)}
                      className={`w-10 h-10 rounded-md text-sm font-medium transition ${
                        i === currentPage
                          ? "bg-primary text-white"
                          : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {i}
                    </button>
                  );
                }

                // Ending ellipsis + last page
                if (endPage < totalPages) {
                  if (endPage < totalPages - 1) {
                    pages.push(
                      <span
                        key="ellipsis-end"
                        className="w-10 h-10 flex items-center justify-center text-gray-500"
                      >
                        ...
                      </span>
                    );
                  }

                  pages.push(
                    <button
                      key={totalPages}
                      onClick={() =>
                        changePage(totalPages)
                      }
                      className="w-10 h-10 rounded-md text-sm font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                    >
                      {totalPages}
                    </button>
                  );
                }

                return pages;
              })()}
            </div>

            {/* Next Button */}
            <button
              onClick={() =>
                changePage(pagination.currentPage + 1)
              }
              disabled={
                pagination.currentPage ===
                pagination.totalPages
              }
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                pagination.currentPage ===
                pagination.totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Next
            </button>

          </div>
        )}

        {/* PAGE CHANGE LOADER */}
        {loading && pagination.currentPage > 1 && (
          <Loader
            fullScreen={false}
            text="Loading more blogs..."
          />
        )}

      </Container>
    </section>
  );
};

export default BlogGrid;