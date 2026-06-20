"use client";
const PostCard = ({ post }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover rounded-md mb-3"
        />
      )}

      <h2
        className="text-lg font-semibold mb-2"
        dangerouslySetInnerHTML={{ __html: post.title }}
      />

      <div
        className="text-sm text-gray-600 mb-3"
        dangerouslySetInnerHTML={{ __html: post.excerpt }}
      />

      <a
        href={post.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 font-medium"
      >
        Read More →
      </a>
    </div>
  );
};

export default PostCard;