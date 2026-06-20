"use client";
// src/pages/ContentUsagePolicy.jsx

import Navbar from "../components/layout/Navbar";
import Footer from "../components/sections/Footer";
import Newsletter from "../components/sections/Newsletter";
import ContentUsageContent from "../components/legal/ContentUsageContent";

const ContentUsagePolicy = () => {
  return (
    <div className="bg-[#FCF9F4]">
      <Navbar />
      <ContentUsageContent />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default ContentUsagePolicy;