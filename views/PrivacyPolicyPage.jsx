"use client";
// src/pages/PrivacyPolicy.jsx

import Navbar from "../components/layout/Navbar";
import Footer from "../components/sections/Footer";
import Newsletter from "../components/sections/Newsletter";
import PrivacyContent from "../components/privacy/PrivacyContent";

const PrivacyPolicy = () => {
  return (
    <div className="bg-[#FCF9F4]">
      <Navbar />
      <PrivacyContent />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;