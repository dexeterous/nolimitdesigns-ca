import { useState, useEffect } from "react";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
                ? "max-h-[500px] opacity-100 visible"
                : "max-h-0 opacity-0 invisible"
            } lg:max-h-full lg:opacity-100 lg:visible lg:w-auto transition-all duration-500 ease-linear overflow-hidden`}
          >
            <ul className="flex lg:flex-row flex-col">
              {[
                { label: "Services", href: "#services" },
                { label: "Pricing", href: "#pricing" },
                { label: "How It Works", href: "#how-it-works" },
                { label: "Portfolio", href: "#portfolio" },
                { label: "About", href: "#about" },
                { label: "Contact", href: "#contact" },
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
            href="#pricing"
            className="hidden lg:inline-block btn-primary btn text-sm !py-3 !px-6 !mb-0 !mr-0"
          >
            Start Your Subscription
          </a>
        </div>
      </div>
    </header>
  );
}