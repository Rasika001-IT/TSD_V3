"use client";
import { useEffect, useState } from "react";
import {
  fetchPosts,
  fetchPostsByCategory,
  fetchCategories,
  fetchPostsWithPagination
} from "../services/wordpress";

const usePosts = (categoryId = null, perPage = 10, usePagination = false) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalPosts: 0
  });

  useEffect(() => {
    // Fetch categories once
    fetchCategoriesData();

    // Fetch posts based on whether categoryId is provided and if pagination is enabled
    if (usePagination) {
      fetchPostsWithPaginationData(1, perPage);
    } else if (categoryId) {
      fetchPostsByCategoryData(categoryId, perPage);
    } else {
      fetchAllPostsData();
    }
  }, [categoryId, perPage, usePagination]);

  // Filter out posts that do not have an image
  const filterValidPosts = (posts = []) => {
    return posts.filter(post => post.image !== null);
  };

  const fetchCategoriesData = async () => {
    try {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchAllPostsData = async () => {
    setLoading(true);

    try {
      const postsData = await fetchPosts();

      setPosts(filterValidPosts(postsData));
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPostsByCategoryData = async (catId, limit = 10) => {
    setLoading(true);

    try {
      const postsData = await fetchPostsByCategory(catId, limit);

      setPosts(filterValidPosts(postsData));
    } catch (error) {
      console.error("Error fetching posts by category:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPostsWithPaginationData = async (page = 1, limit = 9) => {
    setLoading(true);

    try {
      const result = await fetchPostsWithPagination(page, limit);

      const filteredPosts = filterValidPosts(result.posts);

      setPosts(filteredPosts);

      setPagination({
        currentPage: result.currentPage,
        totalPages: result.totalPages,
        totalPosts: result.totalPosts
      });
    } catch (error) {
      console.error("Error fetching posts with pagination:", error);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get category name by ID
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);

    return category ? category.name : "Unknown";
  };

  // Helper function to get posts by specific category from all posts
  const getPostsByCategory = (categoryName) => {
    const category = categories.find(
      cat => cat.name.toLowerCase() === categoryName.toLowerCase()
    );

    if (!category) return [];

    return posts.filter(post =>
      post.categories.includes(category.id)
    );
  };

  // Function to change page
  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchPostsWithPaginationData(newPage, perPage);
    }
  };

  return {
    posts,
    loading,
    categories,
    getCategoryName,
    getPostsByCategory,
    pagination,
    changePage
  };
};

export default usePosts;