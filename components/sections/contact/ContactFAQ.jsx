"use client";
import { useState } from "react";

const faqs = [
  {
    question: "How can TSD help us?",
    answer:
      "The Success Digest helps your business shine by offering unparalleled promotional opportunities. Through our magazine, you can showcase your brand, products, or services to a highly engaged audience of C-suite executives, entrepreneurs, and decision-makers. Our tailored advertising solutions position your business at the forefront of the corporate world, ensuring maximum visibility among top-tier professionals. By partnering with us, you’ll elevate your brand’s presence, build credibility, and connect with the leaders who matter most in your industry."
  },
  {
    question: "What makes The Success Digest unique compared to other business magazines?",
    answer:
      "The Success Digest stands out by combining expert analysis, curated global market insights, and high-impact promotional opportunities tailored for top-tier professionals. We provide not only valuable content but also a platform for businesses to connect with an influential audience, ensuring their brand gets the recognition it deserves."
  },
  {
    question: "How can I advertise my business in The Success Digest?",
    answer:
      "The Success Digest stands out by combining expert analysis, curated global market insights, and high-impact promotional opportunities tailored for top-tier professionals. We provide not only valuable content but also a platform for businesses to connect with an influential audience, ensuring their brand gets the recognition it deserves."
  },
  {
    question: "What type of information is provided by The Success Digest?",
    answer:
      "You can advertise your business with us by contacting our team. We offer customized advertising options, including feature articles, display ads, and collaborative content, to position your brand in front of C-suite executives, entrepreneurs, and decision-makers. Reach out today to discuss the best solution for your business!"
  }
];

const ContactFAQ = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="max-w-7xl mx-auto px-6 pb-28">
      <div className="grid lg:grid-cols-2 gap-14 items-start">

        <div>
          <h2 className="font-heading text-[54px] leading-tight mb-6">
            Frequently Asked <br />
            <span className="text-[#C89632]">Questions</span>
          </h2>

          <p className="text-gray-600 max-w-md text-lg">
            Find answers to common questions and get the clarity you need.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
  <div
    key={index}
    className="bg-[#F5F1EA] rounded-md overflow-hidden transition-all duration-300"
  >
    <button
      onClick={() => setActive(active === index ? null : index)}
      className="w-full px-6 py-5 flex justify-between items-center text-left"
    >
      <span className="font-medium text-[#1D1F26]">
        {faq.question}
      </span>

      <span
        className={`text-xl transition-transform duration-300 ${
          active === index ? "rotate-180" : ""
        }`}
      >
        +
      </span>
    </button>

    <div
      className={`grid transition-all duration-300 ease-in-out ${
        active === index
          ? "grid-rows-[1fr] opacity-100"
          : "grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="overflow-hidden">
        <div className="px-6 pb-5 text-gray-600 leading-relaxed">
          {faq.answer}
        </div>
      </div>
    </div>
  </div>
))}
        </div>

      </div>
    </section>
  );
};

export default ContactFAQ;