"use client";
import Container from "../layout/Container";
import Link from "next/link";

const logo = "/assets/icons/logo-footer.png";

const fb = "/assets/icons/facebook.svg";
const tw = "/assets/icons/twitter.svg";
const ig = "/assets/icons/instagram.svg";
const li = "/assets/icons/linkedin.svg";

const arrow = "/assets/icons/arrow-footer.svg";

const Footer = () => {
  return (
    <footer className="bg-[#0E1420] text-white pt-16">

      <Container>

        {/* MAIN LAYOUT */}
        <div className="flex flex-col md:flex-row gap-10 lg:gap-16 pb-16">

          {/* LEFT: LOGO BLOCK */}
          <div className="flex flex-col gap-3 w-full md:w-[260px]">

            <img
              src={logo}
              alt="logo"
              className="h-12 w-auto mb-1"
            />

            <div className="flex gap-4">

              {/* Facebook */}
              <div className="p-2 -m-2 cursor-pointer">
                <img
                  src={fb}
                  className="w-6 h-6 opacity-70 hover:opacity-100 transition"
                  alt="Facebook"
                />
              </div>

              {/* Twitter / X */}
              <a
                href="https://x.com/TheSucessDigest"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 -m-2"
              >
                <img
                  src={tw}
                  className="w-6 h-6 opacity-70 hover:opacity-100 transition"
                  alt="Twitter"
                />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/thesuccess_digest/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 -m-2"
              >
                <img
                  src={ig}
                  className="w-6 h-6 opacity-70 hover:opacity-100 transition"
                  alt="Instagram"
                />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/the-success-digest/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 -m-2"
              >
                <img
                  src={li}
                  className="w-6 h-6 opacity-70 hover:opacity-100 transition"
                  alt="LinkedIn"
                />
              </a>

            </div>

            <button className="bg-white text-black px-7 py-3 text-[14px] rounded-md font-medium w-fit mt-1">
              Subscribe
            </button>

          </div>

          {/* RIGHT: LINKS GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16 flex-1">

            {/* MORE FROM TSD */}
            <div>

              <h4 className="font-heading text-[20px] mb-5">
                More from TSD
              </h4>

              <ul className="space-y-3 text-[14px] text-white/60">

                <li>
                  <button className="py-2 -my-2 text-left">
                    Newsletter Sign Up
                  </button>
                </li>

                <li>
                  <button className="py-2 -my-2 text-left">
                    EI Club
                  </button>
                </li>

                <li>
                  <button className="py-2 -my-2 text-left">
                    Careers
                  </button>
                </li>

                <li>
                  <button className="py-2 -my-2 text-left">
                    Our Team
                  </button>
                </li>

              </ul>

            </div>

            {/* ABOUT */}
            <div>

              <h4 className="font-heading text-[20px] mb-5">
                About
              </h4>

              <ul className="space-y-3 text-[14px] text-white/60">

                <li>
                  <Link
                    href="/about"
                    className="inline-flex py-2 -my-2"
                  >
                    About Us
                  </Link>
                </li>

                <li>
                  <button className="py-2 -my-2 text-left">
                    Media Kit
                  </button>
                </li>

                <li>
                  <Link
                    href="/contact"
                    className="inline-flex py-2 -my-2"
                  >
                    Contact
                  </Link>
                </li>

                <li>
                  <button className="py-2 -my-2 text-left">
                    Careers
                  </button>
                </li>

              </ul>

            </div>

            {/* PRESS */}
            <div>

              <h4 className="font-heading text-[20px] mb-5">
                Press
              </h4>

              <ul className="space-y-3 text-[14px] text-white/60">

                <li>
                  <button className="py-2 -my-2 text-left">
                    Press Room
                  </button>
                </li>

                <li>
                  <Link
                    href="/contact"
                    className="inline-flex py-2 -my-2"
                  >
                    Contact Us
                  </Link>
                </li>

                <li>
                  <Link
                    href="/advertise"
                    className="inline-flex py-2 -my-2"
                  >
                    Advertising
                  </Link>
                </li>

                <li>
                  <button className="py-2 -my-2 text-left">
                    Subscriptions
                  </button>
                </li>

              </ul>

            </div>

            {/* QUICK LINKS */}
            <div>

              <h4 className="font-heading text-[20px] mb-5">
                Quick Links
              </h4>

              <ul className="space-y-3 text-[14px] text-white/60">

                <li>
                  <Link
                    href="/"
                    className="inline-flex py-2 -my-2 hover:text-white transition-colors duration-300"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    href="/news"
                    className="inline-flex py-2 -my-2 hover:text-white transition-colors duration-300"
                  >
                    News
                  </Link>
                </li>

                <li>
                  <Link
                    href="/blogs"
                    className="inline-flex py-2 -my-2 hover:text-white transition-colors duration-300"
                  >
                    Blogs
                  </Link>
                </li>

                <li>
                  <Link
                    href="/magazine"
                    className="inline-flex py-2 -my-2 hover:text-white transition-colors duration-300"
                  >
                    Magazine
                  </Link>
                </li>

                <li>
                  <Link
                    href="/featured"
                    className="inline-flex py-2 -my-2 hover:text-white transition-colors duration-300"
                  >
                    Featured Articles
                  </Link>
                </li>

                <li>
                  <Link
                    href="/women-in-business"
                    className="inline-flex py-2 -my-2 hover:text-white transition-colors duration-300"
                  >
                    Women in Business
                  </Link>
                </li>

                <li>
                  <Link
                    href="/login"
                    className="inline-flex py-2 -my-2 hover:text-white transition-colors duration-300"
                  >
                    Login
                  </Link>
                </li>

              </ul>

            </div>

          </div>

        </div>

      </Container>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10 py-5 text-sm text-white/50">

        <Container>

          <div className="flex items-center justify-between">

            <p>
              © The Success Digest. All rights reserved.
            </p>

            <div className="flex items-center gap-6">

              <Link
                href="/privacy-policy"
                className="py-2 -my-2"
              >
                Privacy Policy
              </Link>

              <Link
                href="/content-usage-policy"
                className="py-2 -my-2"
              >
                Terms of Service
              </Link>

              <button
                onClick={() =>
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  })
                }
                className="hover:text-white transition p-2 -m-2"
              >
                <img
                  src={arrow}
                  className="w-4 opacity-70"
                  alt="Scroll to top"
                />
              </button>

            </div>

          </div>

        </Container>

      </div>

    </footer>
  );
};

export default Footer;