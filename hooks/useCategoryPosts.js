"use client";
import { useEffect, useState } from "react";
import {
  fetchCategories,
  fetchTags,
  fetchPostsByCategory,
  fetchPostsByTag,
} from "../services/wordpress";

const useCategoryPosts = (
  slug,
  includeChildren = false
) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter out posts that do not have an image
  const filterValidPosts = (posts = []) => {
    return posts.filter(
      (post) => post.image !== null
    );
  };

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);

        const categories = await fetchCategories();

        const matchedCategory = categories.find(
          (cat) => cat.slug === slug
        );

        if (matchedCategory) {
          let categoryIds = [matchedCategory.id];

          if (includeChildren) {
            const childCategories =
              categories.filter(
                (cat) =>
                  cat.parent === matchedCategory.id
              );

            categoryIds = [
              matchedCategory.id,
              ...childCategories.map(
                (cat) => cat.id
              ),
            ];
          }

          const fetchedPosts =
            await Promise.all(
              categoryIds.map((id) =>
                fetchPostsByCategory(id, 50)
              )
            );

          const mergedPosts =
            fetchedPosts
              .flat()
              .filter(
                (post, index, self) =>
                  index ===
                  self.findIndex(
                    (p) => p.id === post.id
                  )
              )
              .sort(
                (a, b) =>
                  new Date(b.date) -
                  new Date(a.date)
              );

          setPosts(
            filterValidPosts(mergedPosts)
          );

          return;
        }

        const tags = await fetchTags();

        const matchedTag = tags.find(
          (tag) => tag.slug === slug
        );

        if (matchedTag) {
          const fetchedPosts =
            await fetchPostsByTag(
              matchedTag.id,
              50
            );

          setPosts(
            filterValidPosts(fetchedPosts)
          );

          return;
        }

        setPosts([]);
      } catch (error) {
        console.error(error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [slug, includeChildren]);

  return { posts, loading };
};

export default useCategoryPosts;