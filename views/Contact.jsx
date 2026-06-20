"use client";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/sections/Footer";
import Newsletter from "../components/sections/Newsletter";

import ContactHero from "../components/sections/contact/ContactHero";
import ContactForm from "../components/sections/contact/ContactForm";
import ContactFAQ from "../components/sections/contact/ContactFAQ";

const Contact = () => {
  return (
    <div className="bg-[#FCF9F4] min-h-screen">
      <Navbar />

      <ContactHero />
      <ContactForm />
      <ContactFAQ />

      <Newsletter />
      <Footer />
    </div>
  );
};

export default Contact;