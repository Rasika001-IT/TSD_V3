import Link from "next/link";

import Navbar from "../components/layout/Navbar";
import Newsletter from "../components/sections/Newsletter";
import Footer from "../components/sections/Footer";
import PodcastCard from "../components/magazine/PodcastCard";

// Server-fed: the magazine (+ its embedded featured post) is fetched in
// app/magazine/[slug]/page.js. The flipbook comes from `fliphtml5_url`; the
// cover-story block is auto-attached from the linked post.
const MagazineReader = ({ magazine }) => {
  if (!magazine) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p>Magazine not found</p>
        </div>
        <Footer />
      </>
    );
  }

  const post = magazine.post;
  const heading = magazine.edition_title || post?.title || "Read Here";

  return (
    <>
      <Navbar />

      <div className="bg-[#F5F2ED] py-16">

        {/* HEADER */}
        <div className="max-w-7xl mx-auto px-6 mb-10 flex justify-between items-center">
          <h1 className="text-3xl font-serif">{heading}</h1>

          <Link href="/magazine" className="text-sm text-gray-600 hover:text-[#C89632]">
            ← Back to Magazines
          </Link>
        </div>

        {/* VIEWER */}
        <div className="max-w-6xl mx-auto bg-[#1E222B] p-4 sm:p-8 lg:p-10 rounded-lg">
          {magazine.fliphtml5_url ? (
            <div className="relative w-full h-0" style={{ paddingTop: "max(60%, 324px)" }}>
              <iframe
                src={magazine.fliphtml5_url}
                title={heading}
                className="absolute left-0 top-0 w-full h-full border-none"
                seamless="seamless"
                scrolling="no"
                frameBorder="0"
                allowTransparency="true"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="w-full h-[495px] flex items-center justify-center bg-gray-700 text-white rounded">
              Coming Soon
            </div>
          )}
        </div>

        {/* FEATURED ARTICLE (cover story) — auto-attached from the linked post */}
        {post && (
          <Link href={`/article/${post.slug}`}>
            <div className="max-w-6xl mx-auto mt-20 px-6 cursor-pointer group">
              <div className="grid md:grid-cols-2 gap-12 items-center">

                <div className="w-full h-[280px] bg-gray-100 flex items-center justify-center overflow-hidden rounded-md">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div>
                  <span className="text-[#C89632] text-xs uppercase tracking-wide">Cover Story</span>

                  <h2 className="text-3xl font-serif mt-3 group-hover:text-[#C89632] transition-colors">
                    {post.title}
                  </h2>

                  <div
                    className="mt-4 text-gray-600 line-clamp-4"
                    dangerouslySetInnerHTML={{ __html: post.excerpt || "" }}
                  />

                  <p className="mt-6 text-[#C89632] font-medium">Read Full Story →</p>
                </div>

              </div>
            </div>
          </Link>
        )}

        {/* AUDIO PODCAST — themed card, shown only when the edition has audio */}
        <PodcastCard src={magazine.podcast_audio} title={heading} />

      </div>

      <Newsletter />
      <Footer />
    </>
  );
};

export default MagazineReader;
