import { useState, useEffect, useRef } from "react";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 py-4 w-full z-50 transition-all duration-500 ${
        isSticky ? "bg-[#fff6ec]/95 backdrop-blur-md shadow-sm is-sticky" : "bg-[#fff6ec]"
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center">
          <a href="/" className="flex items-center gap-2">
            <img
              src="/nolimit-logo.png"
              alt="NoLimit Designs"
              className="lg:h-10 h-8 w-auto"
            />
          </a>

          {/* Mobile menu toggle */}
          <button
            className="text-3xl cursor-pointer block lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <i className={isMenuOpen ? "ri-close-line" : "ri-menu-line"} />
          </button>

          {/* Desktop nav */}
          <nav
            className={`lg:bg-[#000000] bg-[#1f1f1f] lg:rounded-full lg:static absolute left-0 top-16 z-50 w-full ${
              isMenuOpen
                ? "max-h-[600px] opacity-100 visible"
                : "max-h-0 opacity-0 invisible"
            } lg:max-h-full lg:opacity-100 lg:visible lg:w-auto transition-all duration-500 ease-linear overflow-hidden lg:overflow-visible`}
          >
            <ul className="flex lg:flex-row flex-col">
              {/* Services with dropdown */}
              <li
                ref={servicesRef}
                className="border-b border-b-[#ff4f01] lg:border-b-0 relative"
              >
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="text-[#dedede] font-medium font-bricolage px-5 py-2.5 inline-flex items-center gap-1 hover:text-[#ff4f01] transition-all duration-500 w-full lg:w-auto cursor-pointer"
                >
                  Services
                  <i
                    className={`ri-arrow-down-s-line transition-transform duration-300 ${
                      isServicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown */}
                <div
                  className={`lg:absolute lg:top-full lg:left-0 lg:mt-2 lg:w-[280px] lg:rounded-xl lg:shadow-2xl lg:border lg:border-[#2a2a2a] bg-[#1a1a1a] transition-all duration-300 overflow-hidden ${
                    isServicesOpen
                      ? "max-h-[300px] opacity-100 visible"
                      : "max-h-0 opacity-0 invisible lg:max-h-0"
                  }`}
                >
                  <div className="p-2">
                    <a
                      href="/graphic-design-services"
                      onClick={() => {
                        setIsServicesOpen(false);
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#ff4f01]/10 transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#ff4f01]/20 flex items-center justify-center shrink-0 group-hover:bg-[#ff4f01]/30 transition-colors">
                        <i className="ri-brush-line text-[#ff4f01] text-xl" />
                      </div>
                      <div>
                        <span className="text-white font-medium font-bricolage block text-[15px] group-hover:text-[#ff4f01] transition-colors">
                          NoLimit Graphics
                        </span>
                        <span className="text-[#888] text-xs">
                          Unlimited graphic design
                        </span>
                      </div>
                    </a>
                    <a
                      href="/video-design-services"
                      onClick={() => {
                        setIsServicesOpen(false);
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#ff4f01]/10 transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#f43f5e]/20 flex items-center justify-center shrink-0 group-hover:bg-[#f43f5e]/30 transition-colors">
                        <i className="ri-video-line text-[#f43f5e] text-xl" />
                      </div>
                      <div>
                        <span className="text-white font-medium font-bricolage block text-[15px] group-hover:text-[#f43f5e] transition-colors">
                          NoLimit Videos
                        </span>
                        <span className="text-[#888] text-xs">
                          Unlimited video editing
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
              </li>

              {[
                { label: "Pricing", href: "/pricing" },
                { label: "Blog", href: "/blog-posts" },
                { label: "How It Works", href: "/#how-it-works" },
                { label: "Portfolio", href: "/#portfolio" },
                { label: "About", href: "/#about" },
                { label: "Contact", href: "/#contact" },
              ].map((item) => (
                <li key={item.label} className="border-b border-b-[#ff4f01] lg:border-b-0">
                  <a
                    href={item.href}
                    className="text-[#dedede] font-medium font-bricolage px-5 py-2.5 inline-block hover:text-[#ff4f01] transition-all duration-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA Button - desktop only */}
          <a
            href="/#pricing"
            className="hidden lg:inline-block btn-primary btn text-sm !py-3 !px-6 !mb-0 !mr-0"
          >
            Start Your Subscription
          </a>
        </div>
      </div>
    </header>
  );
}