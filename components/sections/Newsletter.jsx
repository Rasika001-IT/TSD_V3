"use client";
import { useState } from "react";
import Container from "../layout/Container";

const Newsletter = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.email) {
      alert("Please enter your email");
      return;
    }
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      alert(data.message || (response.ok ? "Subscribed!" : "Something went wrong"));
      if (response.ok) setFormData({ name: "", email: "" });
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <section id="newsletter" className="bg-[#FCF9F4] py-24 text-center">
      <Container>

        <h2 className="font-heading font-bold text-4xl">
          Sign Up for the TSD Newsletter
        </h2>

        <p className="text-black/70 mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
          Get the latest business news, informative insight, business strategies,
          technological hacks, culture reviews, innovations directly in your inbox.
        </p>

        <div className="flex justify-center items-center gap-10 mt-12 flex-wrap">

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="bg-transparent border-b border-black/40 w-[280px] pb-2 outline-none text-sm placeholder:text-black/50"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="bg-transparent border-b border-black/40 w-[280px] pb-2 outline-none text-sm placeholder:text-black/50"
          />

          <button
            onClick={handleSubmit}
            className="bg-black text-white px-6 py-2 text-sm rounded-[5px] hover:opacity-90 transition"
          >
            Subscribe
          </button>

        </div>

      </Container>
    </section>
  );
};

export default Newsletter;