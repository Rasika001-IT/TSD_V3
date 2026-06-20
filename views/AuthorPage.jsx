"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/sections/Footer";
import Newsletter from "../components/sections/Newsletter";

import { fetchPosts } from "../services/wordpress";

const AuthorPage = () => {
  const { slug } = useParams();

  const [posts, setPosts] = useState([]);
  const [authorName, setAuthorName] =
    useState("");
  const [loading, setLoading] =
    useState(true);

  const [visiblePosts, setVisiblePosts] =
    useState(4);

  useEffect(() => {
    setVisiblePosts(4);
  }, [slug]);

  useEffect(() => {
    const loadAuthorPosts =
      async () => {
        try {
          setLoading(true);

          const allPosts =
            await fetchPosts();

          const filtered =
            allPosts.filter(
              (post) =>
                post.authorSlug === slug
            );

          setPosts(filtered);

          if (filtered.length) {
            setAuthorName(
              filtered[0].author
            );
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    loadAuthorPosts();
  }, [slug]);

  const handleLoadMore = () => {
    setVisiblePosts(
      (prev) => prev + 4
    );
  };

  return (
    <>
      <Navbar />

      <main className="bg-[#FCF9F4] min-h-screen">

        <section className="max-w-[1100px] mx-auto px-6 py-20">

          <h1 className="font-heading text-6xl mb-14">
            {authorName}
          </h1>

          {loading ? (
            <p>Loading...</p>
          ) : posts.length === 0 ? (
            <p>No posts found.</p>
          ) : (
            <>
              <div className="space-y-16">

                {posts
                  .slice(
                    0,
                    visiblePosts
                  )
                  .map((post) => (
                    <Link
                      key={post.slug}
                      href={`/article/${post.slug}`}
                    >
                      <article>

                        <img
                          src={post.image}
                          alt={
                            post.title
                          }
                          className="w-full h-[320px] object-cover mb-6"
                        />

                        <h2 className="font-heading text-4xl mb-4">
                          {post.title.replace(
                            /<[^>]+>/g,
                            ""
                          )}
                        </h2>

                        <p
                          dangerouslySetInnerHTML={{
                            __html:
                              post.excerpt,
                          }}
                        />

                      </article>
                    </Link>
                  ))}

              </div>

              {visiblePosts <
                posts.length && (
                <button
                  onClick={
                    handleLoadMore
                  }
                  className="mt-14 bg-black text-white px-10 py-3"
                >
                  View More
                </button>
              )}
            </>
          )}

        </section>

        <Newsletter />

      </main>

      <Footer />
    </>
  );
};

export default AuthorPage;