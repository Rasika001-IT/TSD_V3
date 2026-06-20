"use client";


import { isAuthenticated } from "../../utils/auth";

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate href="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;