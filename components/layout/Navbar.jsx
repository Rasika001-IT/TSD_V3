"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import Container from "../layout/Container";

const logo = "/assets/images/logo.png";
const searchIcon = "/assets/icons/search.svg";
const hamburgerIcon = "/assets/icons/hamburger.svg";

import {
  isAuthenticated,
  clearAuthData,
  getToken,
} from "../../utils/auth";

import {
  logoutAdmin,
} from "../../services/authService";

const navLinks = [
  { name: "Home", path: "/" },

  {
    name: "News",
    path: "/news",
    dropdown: [
      { name: "Regulations", path: "/news/regulations" },
      { name: "Sports", path: "/news/sports" },
      { name: "Startups", path: "/news/startups" },
      { name: "Breaking News", path: "/news/breaking-news" },
      { name: "Crypto", path: "/news/crypto" },
      { name: "Industries", path: "/news/industries" },
      { name: "Markets", path: "/news/markets" },
    ],
  },

  {
    name: "Blogs",
    path: "/blogs",
    dropdown: [
      { name: "Explainers", path: "/blogs/explainers" },
      { name: "How To", path: "/blogs/how-to" },
      { name: "Lifestyle", path: "/blogs/lifestyle" },
      { name: "Sports", path: "/blogs/sports" },
      { name: "Travel", path: "/blogs/travel" },
      { name: "Events", path: "/blogs/events" },
      { name: "Crypto", path: "/blogs/crypto" },
    ],
  },

  { name: "Magazine", path: "/magazine" },

  { name: "Featured Articles", path: "/featured" },

  { name: "Women in Business", path: "/women-in-business" },

  {
    name: "About Us",
    path: "/about",
    dropdown: [
      { name: "About Us", path: "/about" },
      { name: "Privacy Policy", path: "/privacy-policy" },
      { name: "Advertise With Us", path: "/advertise" },
    ],
  },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  const navigate = useRouter();
  const location = usePathname();

  useEffect(() => {
    setAuthenticated(isAuthenticated());

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const handleSubscribeClick = () => {
    if (location === "/") {
      const section = document.getElementById("newsletter");

      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate.push("/");

      setTimeout(() => {
        const section = document.getElementById("newsletter");

        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  const handleLogout = async () => {
  try {
    const token = getToken();

    if (token) {
      await logoutAdmin(token);
    }
  } catch (error) {
    console.error(error);
  } finally {
    clearAuthData();

    setAuthenticated(false);

    navigate.push("/");
  }
};

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#f9f6ef]/80 backdrop-blur-md shadow-sm"
          : "bg-[#f9f6ef]"
      }`}
    >
      <Container>

        <div className="flex items-center justify-between h-[88px]">

          {/* LEFT */}
          <div className="flex items-center gap-10">

            <Link href="/">
              <img
                src={logo}
                alt="The Success Digest"
                className="h-10 lg:h-14 w-auto object-contain cursor-pointer"
              />
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center gap-8 font-body text-[14px]">

              {navLinks.map((link, index) => (
                <div key={index} className="relative group">

                  {/* MAIN NAV ITEM */}
                  <Link
                    href={link.path}
                    className={`relative ${
                      location === link.path ? "font-semibold" : ""
                    }`}
                  >
                    {link.name}

                    <span
                      className={`absolute left-0 -bottom-1 h-[1px] bg-black transition-all duration-300 ${
                        location === link.path
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </Link>

                  {/* DESKTOP DROPDOWN */}
                  {link.dropdown && (
                    <div className="absolute top-full left-0 mt-4 w-[190px] bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">

                      <div className="py-3 px-4 flex flex-col gap-3 text-[#1D1F26]">

                        {link.dropdown.map((item, i) => (
                          <Link
                            key={i}
                            href={item.path}
                            className="hover:translate-x-1 transition-all duration-200"
                          >
                            {item.name}
                          </Link>
                        ))}

                      </div>

                    </div>
                  )}

                </div>
              ))}

            </nav>

          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3 lg:gap-6">

            {/* SEARCH */}
            <div className="hidden lg:flex items-center bg-white/70 border border-gray-200 rounded-md px-3 py-1.5">

              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none text-[13px] w-32 placeholder-gray-500"
              />

              <img
                src={searchIcon}
                alt="Search"
                className="w-4 h-4 ml-2 opacity-70"
              />

            </div>

            {/* AUTH BUTTONS */}
            {authenticated ? (
              <div className="hidden lg:flex items-center gap-3">

                <button
                  onClick={() => navigate.push("/add-post")}
                  className="bg-black text-white px-4 py-2 text-[13px] rounded-md hover:bg-black/80 transition"
                >
                  Add Post
                </button>

                <button
                  onClick={handleLogout}
                  className="border border-black/10 px-4 py-2 text-[13px] rounded-md hover:bg-black hover:text-white transition"
                >
                  Logout
                </button>

              </div>
            ) : (
              <button
                onClick={handleSubscribeClick}
                className="hidden lg:block bg-black text-white px-4 py-2 text-[13px] rounded-md hover:bg-black/80 transition"
              >
                Subscribe
              </button>
            )}

            {/* HAMBURGER */}
            <button
              className="lg:hidden transition-transform duration-300 hover:scale-105"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <img
                src={hamburgerIcon}
                alt="Menu"
                className={`w-7 h-7 object-contain transition-transform duration-300 ${
                  mobileMenuOpen ? "rotate-90" : "rotate-0"
                }`}
              />
            </button>

          </div>

        </div>

        {/* MOBILE MENU */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen
              ? "max-h-[1000px] opacity-100 pt-4 pb-6 border-t border-black/10"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-2">

            {navLinks.map((link, index) => (
              <div key={index}>

                {/* MOBILE NAV ITEM */}
                <div
                  className={`flex items-center justify-between px-2 py-3 text-[15px] font-medium transition-all duration-300 ${
                    mobileMenuOpen
                      ? "translate-y-0 opacity-100"
                      : "-translate-y-2 opacity-0"
                  }`}
                  style={{
                    transitionDelay: `${index * 50}ms`,
                  }}
                >

                  <Link
                    href={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1"
                  >
                    {link.name}
                  </Link>

                  {/* MOBILE DROPDOWN TOGGLE */}
                  {link.dropdown && (
                    <button
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === link.name
                            ? null
                            : link.name
                        )
                      }
                      className="ml-3 text-lg"
                    >
                      {openDropdown === link.name ? "−" : "+"}
                    </button>
                  )}

                </div>

                {/* MOBILE DROPDOWN MENU */}
                {link.dropdown && openDropdown === link.name && (
                  <div className="ml-4 mb-3 flex flex-col gap-2 border-l border-black/10 pl-4">

                    {link.dropdown.map((item, i) => (
                      <Link
                        key={i}
                        href={item.path}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setOpenDropdown(null);
                        }}
                        className="text-[14px] text-black/75 hover:text-black transition"
                      >
                        {item.name}
                      </Link>
                    ))}

                  </div>
                )}

              </div>
            ))}

            {/* MOBILE AUTH */}
            <div className="px-2 pt-4 flex flex-col gap-3">

              {authenticated ? (
                <>
                  <button
                    onClick={() => {
                      navigate.push("/add-post");
                      setMobileMenuOpen(false);
                    }}
                    className="bg-black text-white py-3 rounded-md text-sm"
                  >
                    Add Post
                  </button>

                  <button
                    onClick={handleLogout}
                    className="border border-black/10 py-3 rounded-md text-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    handleSubscribeClick();
                    setMobileMenuOpen(false);
                  }}
                  className="bg-black text-white py-3 rounded-md text-sm"
                >
                  Subscribe
                </button>
              )}

            </div>

          </div>
        </div>

      </Container>
    </header>
  );
};

export default Navbar;