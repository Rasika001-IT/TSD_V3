const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";
 
// Generic fetch helper (clean + reusable)
const fetchAPI = async (endpoint) => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`);
 
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
 
    return await res.json();
  } catch (error) {
    console.error("Fetch Error:", error);
    return null;
  }
};
 
 
 
// ==============================
// POSTS
// ==============================
 
// Get all posts
export const fetchPosts = async () => {
  const data = await fetchAPI("/posts");
  return data || [];
};
 
 
// Get paginated posts
export const fetchPostsWithPagination = async (page = 1, perPage = 9) => {
  const data = await fetchAPI(
    `/posts/paginated?page=${page}&per_page=${perPage}`
  );
 
  return {
    posts: data?.posts || [],
    totalPosts: data?.totalPosts || 0,
    totalPages: data?.totalPages || 0,
    currentPage: data?.currentPage || page,
  };
};
 
 
// Get post by slug
export const fetchPostBySlug = async (slug) => {
  return await fetchAPI(`/posts/slug/${slug}`);
};
 
 
// ==============================
// CATEGORY
// ==============================
 
// Get all categories
export const fetchCategories = async () => {
  const data = await fetchAPI("/categories");
  return data || [];
};
 
 
// Get posts by category
export const fetchPostsByCategory = async (categoryId, perPage = 10) => {
  const data = await fetchAPI(
    `/posts/category/${categoryId}?per_page=${perPage}`
  );
 
  return data || [];
};
 
 
// ==============================
// TAGS
// ==============================
 
// Get all tags
export const fetchTags = async () => {
  const data = await fetchAPI("/tags");
  return data || [];
};
 
 
// Get posts by tag
export const fetchPostsByTag = async (tagId, perPage = 10) => {
  const data = await fetchAPI(
    `/posts/tag/${tagId}?per_page=${perPage}`
  );
 
  return data || [];
};