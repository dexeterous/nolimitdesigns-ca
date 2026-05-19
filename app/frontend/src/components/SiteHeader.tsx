import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isIndustriesOpen, setIsIndustriesOpen] = useState(false);
  const servicesRef = useRef<HTMLLIElement>(null);
  const industriesRef = useRef<HTMLLIElement>(null);

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
      if (industriesRef.current && !industriesRef.current.contains(e.target as Node)) {
        setIsIndustriesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const serviceItems = [
    { name: "All Services", slug: "", icon: "ri-stack-line", color: "#ff4f01" },
    { name: "Web Development", slug: "web-development", icon: "ri-code-s-slash-line", color: "#ff4f01" },
    { name: "E-Commerce", slug: "ecommerce", icon: "ri-shopping-cart-line", color: "#7c3aed" },
    { name: "SEO Services", slug: "seo-services", icon: "ri-search-line", color: "#0ea5e9" },
    { name: "UI/UX Design", slug: "ui-ux-design", icon: "ri-palette-line", color: "#f43f5e" },
    { name: "Digital Marketing", slug: "digital-marketing", icon: "ri-megaphone-line", color: "#22c55e" },
    { name: "Maintenance", slug: "website-maintenance", icon: "ri-shield-check-line", color: "#eab308" },
  ];

  const topIndustries = [
    { name: "All Industries", slug: "", icon: "ri-window-line" },
    { name: "Healthcare", slug: "healthcare", icon: "ri-heart-pulse-line" },
    { name: "Real Estate", slug: "real-estate", icon: "ri-building-2-line" },
    { name: "Restaurant", slug: "restaurant", icon: "ri-restaurant-line" },
    { name: "Legal", slug: "legal", icon: "ri-scales-3-line" },
    { name: "Construction", slug: "construction", icon: "ri-building-4-line" },
    { name: "View All 20+", slug: "", icon: "ri-arrow-right-line" },
  ];

  return (
    <header
      className={`fixed top-0 py-4 w-full z-50 transition-all duration-500 ${
        isSticky ? "bg-[#fff6ec]/95 backdrop-blur-md shadow-sm is-sticky" : "bg-[#fff6ec]"
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/nolimit-logo.png"
              alt="Nolimit Designs - Edmonton Web Development"
              className="lg:h-10 h-8 w-auto"
            />
          </Link>

          <button
            className="text-3xl cursor-pointer block lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <i className={isMenuOpen ? "ri-close-line" : "ri-menu-line"} />
          </button>

          <nav
            className={`lg:bg-[#000000] bg-[#1f1f1f] lg:rounded-full lg:static absolute left-0 top-16 z-50 w-full ${
              isMenuOpen
                ? "max-h-[800px] opacity-100 visible"
                : "max-h-0 opacity-0 invisible"
            } lg:max-h-full lg:opacity-100 lg:visible lg:w-auto transition-all duration-500 ease-linear overflow-hidden lg:overflow-visible`}
          >
            <ul className="flex lg:flex-row flex-col">
              {/* Services Dropdown */}
              <li ref={servicesRef} className="border-b border-b-[#ff4f01] lg:border-b-0 relative">
                <button
                  onClick={() => { setIsServicesOpen(!isServicesOpen); setIsIndustriesOpen(false); }}
                  className="text-[#dedede] font-medium font-bricolage px-5 py-2.5 inline-flex items-center gap-1 hover:text-[#ff4f01] transition-all duration-500 w-full lg:w-auto cursor-pointer"
                >
                  Services
                  <i className={`ri-arrow-down-s-line transition-transform duration-300 ${isServicesOpen ? "rotate-180" : ""}`} />
                </button>
                <div
                  className={`lg:absolute lg:top-full lg:left-0 lg:mt-2 lg:w-[300px] lg:rounded-xl lg:shadow-2xl lg:border lg:border-[#2a2a2a] bg-[#1a1a1a] transition-all duration-300 overflow-hidden ${
                    isServicesOpen ? "max-h-[500px] opacity-100 visible" : "max-h-0 opacity-0 invisible lg:max-h-0"
                  }`}
                >
                  <div className="p-2">
                    {serviceItems.map((item) => (
                      <Link
                        key={item.slug}
                        to={item.slug ? `/services/${item.slug}` : "/services"}
                        onClick={() => { setIsServicesOpen(false); setIsMenuOpen(false); }}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#ff4f01]/10 transition-all duration-300 group"
                      >
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${item.color}20` }}>
                          <i className={`${item.icon} text-lg`} style={{ color: item.color }} />
                        </div>
                        <span className="text-white font-medium font-bricolage text-[14px] group-hover:text-[#ff4f01] transition-colors">
                          {item.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </li>

              {/* Industries Dropdown */}
              <li ref={industriesRef} className="border-b border-b-[#ff4f01] lg:border-b-0 relative">
                <button
                  onClick={() => { setIsIndustriesOpen(!isIndustriesOpen); setIsServicesOpen(false); }}
                  className="text-[#dedede] font-medium font-bricolage px-5 py-2.5 inline-flex items-center gap-1 hover:text-[#ff4f01] transition-all duration-500 w-full lg:w-auto cursor-pointer"
                >
                  Industries
                  <i className={`ri-arrow-down-s-line transition-transform duration-300 ${isIndustriesOpen ? "rotate-180" : ""}`} />
                </button>
                <div
                  className={`lg:absolute lg:top-full lg:left-0 lg:mt-2 lg:w-[260px] lg:rounded-xl lg:shadow-2xl lg:border lg:border-[#2a2a2a] bg-[#1a1a1a] transition-all duration-300 overflow-hidden ${
                    isIndustriesOpen ? "max-h-[400px] opacity-100 visible" : "max-h-0 opacity-0 invisible lg:max-h-0"
                  }`}
                >
                  <div className="p-2">
                    {topIndustries.map((item) => (
                      <Link
                        key={item.slug + item.name}
                        to={item.slug ? `/portfolio/${item.slug}` : "/portfolio"}
                        onClick={() => { setIsIndustriesOpen(false); setIsMenuOpen(false); }}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#ff4f01]/10 transition-all duration-300 group"
                      >
                        <i className={`${item.icon} text-[#ff4f01] text-lg`} />
                        <span className="text-white font-medium font-bricolage text-[14px] group-hover:text-[#ff4f01] transition-colors">
                          {item.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </li>

              {[
                { label: "Portfolio", href: "/portfolio" },
                { label: "Pricing", href: "/#pricing" },
                { label: "About", href: "/about" },
                { label: "Blog", href: "/blog-posts" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.label} className="border-b border-b-[#ff4f01] lg:border-b-0">
                  {item.href.startsWith("/") && !item.href.startsWith("/#") ? (
                    <Link
                      to={item.href}
                      className="text-[#dedede] font-medium font-bricolage px-5 py-2.5 inline-block hover:text-[#ff4f01] transition-all duration-500"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className="text-[#dedede] font-medium font-bricolage px-5 py-2.5 inline-block hover:text-[#ff4f01] transition-all duration-500"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <Link
            to="/contact"
            className="hidden lg:inline-block btn-primary btn text-sm !py-3 !px-6 !mb-0 !mr-0"
          >
            Get a Free Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
