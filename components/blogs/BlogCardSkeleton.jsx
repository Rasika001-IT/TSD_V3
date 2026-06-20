// Grey shimmer placeholder matching BlogCard's shape (image + tag + title +
// text lines + meta). Used only while paginating to the next page.
const BlogCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200 animate-pulse">
      {/* IMAGE */}
      <div className="w-full h-[200px] bg-gray-200" />

      {/* CONTENT */}
      <div className="p-5">
        {/* TAG */}
        <div className="h-4 w-20 bg-gray-200 mb-3" />

        {/* TITLE (2 lines) */}
        <div className="h-4 w-11/12 bg-gray-200 rounded mb-2" />
        <div className="h-4 w-3/4 bg-gray-200 rounded mb-4" />

        {/* DESCRIPTION (3 lines) */}
        <div className="h-3 w-full bg-gray-200 rounded mb-2" />
        <div className="h-3 w-full bg-gray-200 rounded mb-2" />
        <div className="h-3 w-5/6 bg-gray-200 rounded mb-4" />

        {/* META */}
        <div className="flex items-center justify-between mb-3">
          <div className="h-3 w-24 bg-gray-200 rounded" />
          <div className="h-3 w-16 bg-gray-200 rounded" />
        </div>

        {/* CTA */}
        <div className="h-3 w-20 bg-gray-200 rounded" />
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
