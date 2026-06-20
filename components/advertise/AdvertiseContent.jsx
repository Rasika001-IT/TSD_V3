"use client";
// src/components/advertise/AdvertiseContent.jsx

const placements = "/assets/images/advertise/placements.png";

const AdvertiseContent = () => {
  return (
    <section className="bg-[#FCF9F4] px-6 md:px-12 lg:px-24 py-24">
      <div className="max-w-6xl mx-auto">

        {/* HERO */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-heading font-bold text-[#1D1F26] mb-6">
            Advertise with Us
          </h1>

          <div className="w-20 h-[3px] bg-primary mx-auto"></div>
        </div>

        {/* INTRO */}
        <div className="space-y-8 mb-20 font-body text-[#1D1F26] leading-8">
          <div>
            <h2 className="text-3xl font-heading font-bold mb-4">
              Amplify Your Brand’s Reach with The Success Digest
            </h2>

            <p>
              Our audience includes <strong>top executives and decision-makers, such as CEOs, CMOs, CTOs, CFOs, CIOs, VPs, and Directors</strong>, making <strong>The Success Digest</strong> a powerful platform for <strong>B2B marketing.</strong>
            </p>

            <p className="mt-6">
              Maximize your brand’s <strong>visibility and influence</strong> by showcasing your <strong>products, services, and solutions</strong> in our <strong>magazine</strong> and on our <strong>digital platforms.</strong>
            </p>

            <div className="mt-8">
              <h3 className="text-2xl font-heading font-bold mb-2">
                Connect with your ideal clients today:
              </h3>

              <p>info@thesuccessdigest.com</p>
            </div>
          </div>
        </div>

        {/* PLACEMENTS */}
        <div className="mb-20">
          <h2 className="text-3xl font-heading font-bold mb-10">
            Where Can You Place Your Ads?
          </h2>

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT */}
            <div>
              <h3 className="text-3xl font-heading font-bold mb-4">
                Magazine Placements
              </h3>

              <div className="w-32 h-[2px] bg-primary mb-6"></div>

              <p className="font-body leading-8">
                Place your ads where they matter most alongside our most
                exclusive content. By advertising with us, you gain direct
                access to an engaged and influential audience that actively
                seeks expert analysis, market intelligence, and innovative
                solutions.
              </p>
            </div>

            {/* RIGHT IMAGE */}
            <div>
              <img
                src={placements}
                alt="Magazine Placement Options"
                className="w-full object-contain"
              />
            </div>

          </div>
        </div>

        {/* WEBSITE ADS */}
        <div className="space-y-16 font-body text-[#1D1F26] leading-8">

          <div>
            <h2 className="text-3xl font-heading font-bold mb-6">
              Website Ad Placements – Maximize Your Brand’s Visibility
            </h2>

            <p>
              Leverage the high traffic and credibility of <strong>The Success Digest</strong> to amplify your brand’s reach. Our website attracts <strong>business leaders, entrepreneurs, and decision-makers</strong> who actively seek <strong>valuable insights and industry trends.</strong> By strategically placing your ads on our platform, you ensure <strong>maximum visibility among a highly engaged audience.</strong>
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-heading font-bold mb-6">
              Available Website Placements
            </h2>

            <ul className="list-disc pl-8 space-y-3">
              <li><strong>Homepage Banners</strong> – High-impact exposure on our most-visited page.</li>
              <li><strong>Article & Blog Ads</strong> – Get featured alongside in-depth business insights, interviews, and industry news.</li>
              <li><strong>Sidebar & Footer Ads</strong> – Ensure continuous visibility across multiple pages.</li>
              <li><strong>Pop-Up & Overlay Ads</strong> – Grab attention with interactive promotional campaigns.</li>
              <li><strong>Sponsored Content</strong> – Position your brand as an industry leader with custom articles, reports, and case studies.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-4xl font-heading font-bold mb-4">
              Let’s Get Started!
            </h2>

            <p className="mb-8">
              Maximize your brand’s exposure by advertising with The Success
              Digest. Let’s craft a campaign that aligns with your business
              goals and reaches the right audience.
            </p>

            <button className="bg-[#1D1F26] text-white px-8 py-3 rounded-md font-medium hover:opacity-90 transition">
              Get in Touch
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AdvertiseContent;