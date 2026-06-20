"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/sections/Footer";
import Newsletter from "../components/sections/Newsletter";

import StandardArticleTemplate from "../components/articles/StandardArticleTemplate";
import FeaturedArticleTemplate from "../components/articles/FeaturedArticleTemplate";

import {
  fetchPostBySlug,
  fetchCategories,
  fetchTags,
  fetchPosts,
} from "../services/wordpress";

const parseFAQBlock = (html) => {
  const faqRegex =
    /<h[1-6][^>]*>FAQs<\/h[1-6]>\s*<div class="wp-block-uagb-faq[\s\S]*?<\/div><\/div><\/div>/i;

  const faqMatch = html.match(faqRegex);

  if (!faqMatch) {
    return {
      cleanedContent: html,
      faqs: [],
    };
  }

  const faqHtml = faqMatch[0];

  const faqItemRegex =
    /<span class="uagb-question">[\s\S]*?<strong><strong>(.*?)<\/strong><\/strong><\/span>[\s\S]*?<div class="uagb-faq-content"><p>(.*?)<\/p><\/div>/g;

  const faqs = [];

  let itemMatch;

  while ((itemMatch = faqItemRegex.exec(faqHtml)) !== null) {
    faqs.push({
      question: itemMatch[1],
      answer: itemMatch[2],
    });
  }

  const cleanedContent = html.replace(
    faqRegex,
    ""
  );

  return {
    cleanedContent,
    faqs,
  };
};

const ArticlePage = () => {
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [taxonomyData, setTaxonomyData] =
    useState([]);
  const [mustReadPosts, setMustReadPosts] =
    useState([]);
  const [loading, setLoading] =
    useState(true);

  const [faqs, setFaqs] = useState([]);
  const [openFAQ, setOpenFAQ] =
    useState(null);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setLoading(true);

        const [
          wpPost,
          categories,
          tags,
          allPosts,
        ] = await Promise.all([
          fetchPostBySlug(slug),
          fetchCategories(),
          fetchTags(),
          fetchPosts(),
        ]);

        if (!wpPost) return;

        const {
          cleanedContent,
          faqs,
        } = parseFAQBlock(wpPost.content);

        setPost({
          ...wpPost,
          content: cleanedContent,
        });

        setFaqs(faqs);

        const categoryItems =
          categories
            .filter((cat) =>
              wpPost.categories.includes(
                cat.id
              )
            )
            .map((cat) => ({
              name: cat.name,
              slug: cat.slug,
              type: "category",
            }));

        const tagItems = tags
          .filter((tag) =>
            wpPost.tags.includes(tag.id)
          )
          .map((tag) => ({
            name: tag.name,
            slug: tag.slug,
            type: "tag",
          }));

        setTaxonomyData([
          ...categoryItems,
          ...tagItems,
        ]);

        const related = allPosts
          .filter((p) => p.slug !== slug)
          .slice(0, 2);

        setMustReadPosts(related);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [slug]);

  const isFeaturedArticle =
    taxonomyData.some(
      (item) =>
        item.type === "category" &&
        item.slug ===
          "featured-articles"
    );

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex justify-center items-center bg-[#FCF9F4]">
          Loading...
        </div>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex justify-center items-center bg-[#FCF9F4]">
          Article not found.
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="bg-[#FCF9F4] min-h-screen">
        {isFeaturedArticle ? (
          <FeaturedArticleTemplate
            post={post}
            taxonomyData={taxonomyData}
            faqs={faqs}
            openFAQ={openFAQ}
            setOpenFAQ={setOpenFAQ}
            mustReadPosts={mustReadPosts}
          />
        ) : (
          <StandardArticleTemplate
            post={post}
            taxonomyData={taxonomyData}
            faqs={faqs}
            openFAQ={openFAQ}
            setOpenFAQ={setOpenFAQ}
            mustReadPosts={mustReadPosts}
          />
        )}

        <Newsletter />
      </main>

      <Footer />
    </>
  );
};

export default ArticlePage;