"use client";
import Link from "next/link";

import Loader from "../ui/Loader";
import SmartImage from "../ui/SmartImage";

const StandardArticleTemplate = ({
  post,
  taxonomyData,
  faqs,
  openFAQ,
  setOpenFAQ,
  mustReadPosts,
  loading,
}) => {
  if (loading || !post) {
    return (
      <Loader text="Loading article..." />
    );
  }

  return (
    <section className="max-w-[1100px] mx-auto px-4 sm:px-6 py-8 sm:py-14">
      {post.image && (
        <SmartImage
          src={post.image}
          alt={post.title}
          className="w-full h-[220px] sm:h-[350px] lg:h-[500px] mb-6 sm:mb-8"
        />
      )}

      <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4">
        {post.title.replace(/<[^>]+>/g, "")}
      </h1>

      <div className="flex flex-wrap gap-1 text-xs sm:text-sm text-gray-500 mb-8 sm:mb-10 leading-relaxed">
        {taxonomyData.map((item, i) => (
          <Link
            key={i}
            href={`/${item.type}/${item.slug}`}
            className="hover:text-black transition-colors"
          >
            {item.name}
            {i < taxonomyData.length - 1 && ","}
          </Link>
        ))}

        <span>/</span>

        <Link
          href={`/author/${post.authorSlug}`}
          className="hover:text-black transition-colors"
        >
          By {post.author}
        </Link>
      </div>

      <article
        className="prose prose-sm sm:prose-base lg:prose-lg max-w-none font-inter overflow-hidden break-words"
        dangerouslySetInnerHTML={{
          __html: post.content,
        }}
      />

      {faqs.length > 0 && (
        <section className="mt-12 sm:mt-16">
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl mb-6 sm:mb-8">
            FAQs
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenFAQ(openFAQ === index ? null : index)
                  }
                  className="w-full text-left px-4 sm:px-6 py-4 font-medium text-sm sm:text-base flex items-center justify-between"
                >
                  <span>{faq.question}</span>
                  <span>{openFAQ === index ? "−" : "+"}</span>
                </button>

                {openFAQ === index && (
                  <p className="px-4 sm:px-6 pb-4 text-sm sm:text-base text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-14 sm:mt-20">
        <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl mb-6 sm:mb-8">
          Must Read
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {mustReadPosts.map((item) => (
            <Link
              key={item.slug}
              href={`/article/${item.slug}`}
              className="group"
            >
              <SmartImage
                src={item.image}
                alt={item.title}
                className="w-full h-[220px] sm:h-[260px] mb-4"
              />

              <h3 className="font-heading text-lg sm:text-xl leading-snug group-hover:opacity-80 transition-opacity">
                {item.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>
    </section>
  );
};

export default StandardArticleTemplate;