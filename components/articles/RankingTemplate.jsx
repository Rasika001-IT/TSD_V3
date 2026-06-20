"use client";
import Link from "next/link";

const RankingTemplate = ({ post, taxonomyData = [], mustReadPosts = [], rankingEntries = [] }) => {
  if (!post) return null;

  return (
    <section className="max-w-[1100px] mx-auto px-4 sm:px-6 py-8 sm:py-14">
      {post.image && (
        <img src={post.image} alt={post.title} className="w-full h-[220px] sm:h-[350px] lg:h-[500px] object-cover mb-6 sm:mb-8" />
      )}

      <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4">
        {post.title.replace(/<[^>]+>/g, "")}
      </h1>

      {post.subtitle && (
        <p className="text-lg text-gray-600 mb-4 font-body">{post.subtitle}</p>
      )}

      <div className="flex flex-wrap gap-1 text-xs sm:text-sm text-gray-500 mb-8 leading-relaxed">
        {taxonomyData.map((item, i) => (
          <Link key={i} href={`/${item.type}/${item.slug}`} className="hover:text-black">
            {item.name}{i < taxonomyData.length - 1 && ","}
          </Link>
        ))}
        <span>/</span>
        <Link href={`/author/${post.authorSlug}`} className="hover:text-black">By {post.author}</Link>
      </div>

      {/* INTRO (the post body) */}
      {post.content && (
        <article
          className="prose prose-sm sm:prose-base lg:prose-lg max-w-none font-inter mb-10"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      )}

      {/* THE RANKED LIST */}
      <ol className="space-y-8 border-t border-gray-200 pt-10">
        {rankingEntries.map((e) => (
          <li key={e.id || e.rank} className="flex flex-col sm:flex-row gap-5 sm:gap-7">
            <div className="flex-shrink-0 flex sm:block items-center gap-4">
              <span className="font-heading text-4xl sm:text-5xl text-primary w-16 sm:text-center">
                {e.rank}
              </span>
            </div>

            {e.photo && (
              <img src={e.photo} alt={e.person_name} className="w-24 h-24 rounded-full object-cover flex-shrink-0" />
            )}

            <div className="flex-1">
              <h3 className="font-heading text-2xl leading-snug">
                {e.person_name}
                {e.linkedin_url && (
                  <a href={e.linkedin_url} target="_blank" rel="noreferrer" className="ml-2 text-sm text-primary align-middle hover:underline">
                    LinkedIn ↗
                  </a>
                )}
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                {[e.person_title, e.company].filter(Boolean).join(" · ")}
              </p>
              {e.bio && <p className="font-body text-[15px] text-gray-700 leading-relaxed">{e.bio}</p>}
            </div>
          </li>
        ))}
      </ol>

      {mustReadPosts.length > 0 && (
        <section className="mt-16">
          <h2 className="font-heading text-2xl sm:text-3xl mb-6">Must Read</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mustReadPosts.map((item) => (
              <Link key={item.slug} href={`/article/${item.slug}`} className="group">
                <img src={item.image} alt={item.title} className="w-full h-[220px] object-cover mb-4" />
                <h3 className="font-heading text-lg group-hover:opacity-80">{item.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </section>
  );
};

export default RankingTemplate;
