// Guard browser-only localStorage so these can be called during SSR/prerender
// (they return empty on the server; real values resolve on the client).
const hasWindow = () => typeof window !== "undefined";

export const saveAuthData = (token, user) => {
  if (!hasWindow()) return;
  localStorage.setItem("tsd_token", token);
  localStorage.setItem("tsd_user", JSON.stringify(user));
};

export const getToken = () => {
  if (!hasWindow()) return null;
  return localStorage.getItem("tsd_token");
};

export const getUser = () => {
  if (!hasWindow()) return null;
  const user = localStorage.getItem("tsd_user");
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  if (!hasWindow()) return false;
  return !!localStorage.getItem("tsd_token");
};

export const clearAuthData = () => {
  if (!hasWindow()) return;
  localStorage.removeItem("tsd_token");
  localStorage.removeItem("tsd_user");
};
