"use client";
const newsletterIcon = "/assets/icons/about/newsletter.svg";
const magazineIcon = "/assets/icons/about/magazine.svg";
const adsIcon = "/assets/icons/about/ads.svg";

const services = [
  {
    icon: newsletterIcon,
    title: "Newsletter",
    description:
      "A curated weekly roundup of impactful global market trends, keeping busy professionals informed with concise, relevant insights delivered directly to your inbox.",
  },
  {
    icon: magazineIcon,
    title: "Magazine",
    description:
      "In-depth features and analysis for C-suite executives and entrepreneurs, offering actionable insights to navigate the complexities of today’s business landscape.",
  },
  {
    icon: adsIcon,
    title: "Advertisements",
    description:
      "Showcase your brand to top-tier professionals with tailored advertising solutions that maximize visibility and position your business as a corporate leader.",
  },
];

const AboutServices = () => {
  return (
    <div className="text-center">

      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-heading mb-4">
        Explore Our Range of Services
      </h2>

      {/* Underline */}
      <div className="w-16 h-[2px] bg-[#C9A34E] mx-auto mb-12"></div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-12">

        {services.map((service, index) => (
          <div key={index} className="flex flex-col items-center text-center">

            {/* Icon */}
            <div className="mb-5">
              <img
                src={service.icon}
                alt={service.title}
                className="w-10 h-10 object-contain opacity-90"
              />
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold mb-3">
              {service.title}
            </h3>

            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              {service.description}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
};

export default AboutServices;