"use client";
import Container from "../layout/Container";

const BlogHero = ({ posts }) => {
  // Get latest post
  const featuredPost = posts?.[0];

  return (
    <section className="py-10 md:py-16">
      <Container>
        <div className="relative h-auto md:h-[460px] overflow-hidden rounded-2xl">

          {/* MOBILE LAYOUT */}
          <div className="block md:hidden">

            {/* IMAGE */}
            <div className="relative h-[320px] w-full">
              {featuredPost?.image ? (
                <img
                  src={featuredPost.image}
                  alt="Featured Blog"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">
                    No image available
                  </span>
                </div>
              )}

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/45" />

              {/* CONTENT */}
              {featuredPost && (
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <div className="backdrop-blur-md bg-white/10 rounded-2xl p-5 border border-white/20">

                    <h1
                      className="font-heading text-2xl leading-tight font-bold mb-3"
                      dangerouslySetInnerHTML={{
                        __html: featuredPost.title,
                      }}
                    />

                    <p
                      className="text-sm leading-relaxed text-gray-100"
                      dangerouslySetInnerHTML={{
                        __html:
                          featuredPost.excerpt
                            .replace(/<[^>]*>/g, "")
                            .substring(0, 120) + "...",
                      }}
                    />

                    <div className="mt-4 text-xs text-gray-200">
                      By {featuredPost.author || "TSD Staff"} •{" "}
                      {new Date(
                        featuredPost.date
                      ).toLocaleDateString()}
                    </div>

                  </div>
                </div>
              )}
            </div>
          </div>

          {/* DESKTOP LAYOUT */}
          <div className="hidden md:block relative h-[460px]">

            {/* IMAGE */}
            <div className="absolute right-0 top-0 w-[65%] h-full">
              {featuredPost?.image ? (
                <img
                  src={featuredPost.image}
                  alt="Featured Blog"
                  className="w-[1000px] h-[500px] object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">
                    No image available
                  </span>
                </div>
              )}
            </div>

            {/* CARD */}
            {featuredPost && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[602px] h-[367px] bg-white/70 backdrop-blur-xl px-14 py-12 rounded-md shadow-xl text-center">

                <h1
                  className="font-heading text-4xl lg:text-[42px] leading-tight mb-5 font-bold"
                  dangerouslySetInnerHTML={{
                    __html: featuredPost.title,
                  }}
                />

                <p
                  className="text-gray-600 text-[15px] font-body leading-relaxed max-w-[560px] mx-auto"
                  dangerouslySetInnerHTML={{
                    __html:
                      featuredPost.excerpt
                        .replace(/<[^>]*>/g, "")
                        .substring(0, 200) + "...",
                  }}
                />

                <div className="mt-4 text-sm text-gray-500">
                  By {featuredPost.author || "TSD Staff"} •{" "}
                  {new Date(
                    featuredPost.date
                  ).toLocaleDateString()}
                </div>

              </div>
            )}

          </div>
        </div>
      </Container>
    </section>
  );
};

export default BlogHero;