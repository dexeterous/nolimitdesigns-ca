import { Link } from "react-router-dom";

export function SiteFooter() {
  return (
    <footer className="pt-20 pb-10 bg-[#fff6ec]">
      <div className="container-custom">
        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-8 pb-12 border-b border-[#ccc]">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-5">
              <img
                src="/nolimit-logo.png"
                alt="Nolimit Designs"
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-base text-[rgb(119,119,125)] mb-3">
              Edmonton&apos;s premier web development agency. Building websites that grow businesses.
            </p>
            <p className="text-sm text-[rgb(119,119,125)] mb-5">
              <i className="ri-phone-line text-[#ff4f01]" /> (780) 900-1234<br />
              <i className="ri-mail-line text-[#ff4f01]" /> hello@nolimitdesigns.com
            </p>
            <div className="flex gap-3">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#070707] flex items-center justify-center text-white hover:bg-[#ff4f01] transition-all duration-300">
                <i className="ri-linkedin-fill" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#070707] flex items-center justify-center text-white hover:bg-[#ff4f01] transition-all duration-300">
                <i className="ri-instagram-line" />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#070707] flex items-center justify-center text-white hover:bg-[#ff4f01] transition-all duration-300">
                <i className="ri-twitter-x-line" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#070707] flex items-center justify-center text-white hover:bg-[#ff4f01] transition-all duration-300">
                <i className="ri-facebook-fill" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-[#101010]">Services</h4>
            <ul className="flex flex-col gap-3">
              <li><Link to="/services/web-development" className="text-[rgb(119,119,125)] hover:text-[#ff4f01] transition-colors">Web Development</Link></li>
              <li><Link to="/services/ecommerce" className="text-[rgb(119,119,125)] hover:text-[#ff4f01] transition-colors">E-Commerce</Link></li>
              <li><Link to="/services/seo-services" className="text-[rgb(119,119,125)] hover:text-[#ff4f01] transition-colors">SEO Services</Link></li>
              <li><Link to="/services/ui-ux-design" className="text-[rgb(119,119,125)] hover:text-[#ff4f01] transition-colors">UI/UX Design</Link></li>
              <li><Link to="/services/digital-marketing" className="text-[rgb(119,119,125)] hover:text-[#ff4f01] transition-colors">Digital Marketing</Link></li>
              <li><Link to="/services/website-maintenance" className="text-[rgb(119,119,125)] hover:text-[#ff4f01] transition-colors">Maintenance</Link></li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-[#101010]">Industries</h4>
            <ul className="flex flex-col gap-3">
              <li><Link to="/portfolio/healthcare" className="text-[rgb(119,119,125)] hover:text-[#ff4f01] transition-colors">Healthcare</Link></li>
              <li><Link to="/portfolio/real-estate" className="text-[rgb(119,119,125)] hover:text-[#ff4f01] transition-colors">Real Estate</Link></li>
              <li><Link to="/portfolio/restaurant" className="text-[rgb(119,119,125)] hover:text-[#ff4f01] transition-colors">Restaurant</Link></li>
              <li><Link to="/portfolio/legal" className="text-[rgb(119,119,125)] hover:text-[#ff4f01] transition-colors">Legal</Link></li>
              <li><Link to="/portfolio/construction" className="text-[rgb(119,119,125)] hover:text-[#ff4f01] transition-colors">Construction</Link></li>
              <li><Link to="/portfolio/healthcare" className="text-[#ff4f01] font-medium">View All 20+ →</Link></li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-[#101010]">Locations</h4>
            <ul className="flex flex-col gap-3">
              <li><Link to="/web-design/edmonton" className="text-[rgb(119,119,125)] hover:text-[#ff4f01] transition-colors">Edmonton</Link></li>
              <li><Link to="/web-design/st-albert" className="text-[rgb(119,119,125)] hover:text-[#ff4f01] transition-colors">St. Albert</Link></li>
              <li><Link to="/web-design/sherwood-park" className="text-[rgb(119,119,125)] hover:text-[#ff4f01] transition-colors">Sherwood Park</Link></li>
              <li><Link to="/web-design/spruce-grove" className="text-[rgb(119,119,125)] hover:text-[#ff4f01] transition-colors">Spruce Grove</Link></li>
              <li><Link to="/web-design/leduc" className="text-[rgb(119,119,125)] hover:text-[#ff4f01] transition-colors">Leduc</Link></li>
              <li><Link to="/web-design/fort-saskatchewan" className="text-[rgb(119,119,125)] hover:text-[#ff4f01] transition-colors">Fort Saskatchewan</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-[#101010]">Company</h4>
            <ul className="flex flex-col gap-3">
              <li><Link to="/about" className="text-[rgb(119,119,125)] hover:text-[#ff4f01] transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-[rgb(119,119,125)] hover:text-[#ff4f01] transition-colors">Contact</Link></li>
              <li><Link to="/blog-posts" className="text-[rgb(119,119,125)] hover:text-[#ff4f01] transition-colors">Blog</Link></li>
              <li><a href="#" className="text-[rgb(119,119,125)] hover:text-[#ff4f01] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-[rgb(119,119,125)] hover:text-[#ff4f01] transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex lg:flex-row flex-col items-center justify-between gap-y-4 pt-6">
          <p className="text-[rgb(119,119,125)]">
            Copyright{" "}
            <Link to="/" className="text-[#ff4f01]">
              &copy; Nolimit Designs
            </Link>{" "}
            {new Date().getFullYear()}. All Rights Reserved. | Edmonton, Alberta, Canada
          </p>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            <li><Link to="/services/web-development" className="text-[rgb(119,119,125)] hover:text-[#ff4f01] transition-colors">Web Development</Link></li>
            <li><Link to="/services/seo-services" className="text-[rgb(119,119,125)] hover:text-[#ff4f01] transition-colors">SEO</Link></li>
            <li><Link to="/about" className="text-[rgb(119,119,125)] hover:text-[#ff4f01] transition-colors">About</Link></li>
            <li><Link to="/contact" className="text-[rgb(119,119,125)] hover:text-[#ff4f01] transition-colors">Contact</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}