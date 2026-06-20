"use client";
const AboutHero = () => {
  return (
    <div className="text-center mb-20">

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
        About Us
      </h1>

      {/* Underline */}
      <div className="w-16 h-[2px] bg-[#C9A34E] mx-auto mb-10"></div>

      {/* Content */}
      <div className="space-y-6 text-gray-300 leading-relaxed text-sm md:text-base max-w-4xl mx-auto">

        <p>
          The Success Digest is your essential weekly subscription-based report,
          providing a comprehensive overview of the news and trends shaping global
          markets and setting the corporate agenda across key economies and industries.
          Delivered straight to your inbox, The Success Digest ensures you stay informed
          and ahead of the curve in an ever-evolving business landscape.
        </p>

        <p>
          Our readers include a prestigious community of business leaders such as
          C-suite executives, directors, senior managers, fund and portfolio managers,
          entrepreneurs, non-executive board members, investor relations officers,
          researchers, and analysts. With its insightful coverage and in-depth analysis,
          The Success Digest caters to decision-makers who demand timely and actionable
          insights to drive their strategies forward.
        </p>

        <p>
          While maintaining a commitment to neutrality on broad economic and market
          developments, The Success Digest has a distinct editorial voice. We are
          unapologetically pro free-market, championing innovation, competition, and
          enterprise as key drivers of economic progress and prosperity.
        </p>

        <p>
          By subscribing to The Success Digest, you gain access to expertly curated
          insights designed to empower your business decisions and inspire growth.
          Make The Success Digest your trusted resource to stay informed, navigate
          challenges, and seize new opportunities in today’s dynamic corporate world.
        </p>

      </div>

    </div>
  );
};

export default AboutHero;