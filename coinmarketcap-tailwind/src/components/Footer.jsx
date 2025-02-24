import { space } from "postcss/lib/list";
import React, { useState, useEffect, useRef } from "react";

const Footer = () => {
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const footerRef = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <footer ref={footerRef} className="bg-gray-900 text-white p-6">
      <div className="flex flex-wrap justify-between">
        {/* Brand */}
        <div className="w-full md:w-1/4 mb-4">
          <h5 className="font-bold flex items-center text-lg pb-2">
            <i className="fas fa-coins text-yellow-400 mr-2 text-2xl"></i>
            CoinMarketCap
          </h5>
          <button className="border border-white text-white px-3 py-1 text-sm mr-2 cursor-pointer hover:bg-slate-100 hover:text-black  hover:border-slate-400 rounded  ">
            🌐 English
          </button>
          <button className="border border-white text-white px-3 py-1 text-sm cursor-pointer hover:bg-slate-100 hover:text-black rounded hover:border-slate-400  ">
            $ USD
          </button>
        </div>

        {/* Links */}
        <div className="w-full md:w-4/7 flex flex-wrap justify-end">
          {[
            {
              title: "Products",
              links: [
                "Academy",
                "Advertise",
                "CMC Labs",
                "Bitcoin ETFs",
                "Crypto API",
                "DexScan",
                "Global Charts",
                "NFT",
              ],
            },
            {
              title: "Company",
              links: [
                "About us",
                "Terms of use",
                "Privacy Policy",
                "Cookie preferences",
                "Disclaimer",
                "Careers",
              ],
            },
            {
              title: "Support",
              links: [
                "Get Listed",
                "Request Form",
                "Contact Support",
                "FAQ",
                "Glossary",
              ],
            },
            {
              title: "Socials",
              links: [
                "X (Twitter)",
                "Community",
                "Telegram",
                "Instagram",
                "Facebook",
                "Reddit",
                "LinkedIn",
              ],
            },
          ].map((section, index) => (
            <div key={index} className="w-1/2 md:w-1/4 mb-4">
              <h6 className="font-bold text-lg mb-2">{section.title}</h6>
              <ul className="list-none  space-y-1">
                {section.links.map((link, idx) => (
                  <li
                    className=" flex items-center space-x-1"
                    key={idx}
                  >
                    <span className="cursor-pointer opacity-50 hover:hover:text-yellow-400">{link}</span>
                    {link === "Careers" && (
                      <span className="text-center bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 mt-1 rounded-full">
                        We're Hiring
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 text-gray-400 text-sm">
        © 2025 CoinMarketCap. All rights reserved
      </div>

      {isFooterVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 w-10 h-10 flex items-center justify-center cursor-pointer hover:opacity-90 bg-yellow-400 text-black rounded-full shadow-lg"
        >
          <i className="fas fa-caret-up text-lg"></i>
        </button>
      )}
    </footer>
  );
};

export default Footer;
