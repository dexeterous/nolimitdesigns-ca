export function SiteFooter() {
  return (
    <footer className="pt-20 pb-10 bg-[#fff6ec]">
      <div className="container-custom">
        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-8 pb-12 border-b border-[#ccc]">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <a href="/" className="inline-block mb-5">
              <img
                src="/nolimit-logo.png"
                alt="NoLimit Designs"
                className="h-10 w-auto"
              />
            </a>
            <p className="text-base text-[rgb(119,119,125)] mb-5">
              Your creative team on demand.
            </p>
            <div className="flex gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#070707] flex items-center justify-center text-white hover:bg-[#ff4f01] transition-all duration-300"
              >
                <i className="ri-linkedin-fill" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#070707] flex items-center justify-center text-white hover:bg-[#ff4f01] transition-all duration-300"
              >
                <i className="ri-instagram-line" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#070707] flex items-center justify-center text-white hover:bg-[#ff4f01] transition-all duration-300"
              >
                <i className="ri-twitter-x-line" />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-[#101010]">Company</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="#about" className="text-[rgb(119,119,125)] hover:text-[#ff4f01] transition-colors">About</a></li>
              <li><a href="#" className="text-[rgb(119,119,125)] hover:text-[#ff4f01] transition-colors">Careers</a></li>
              <li><a href="#contact" className="text-[rgb(119,119,125)] hover:text-[#ff4f01] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-[#101010]">Services</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="/graphic-design-services" className="text-[rgb(119,119,125)] hover:text-[#ff4f01] transition-colors">Graphic Design</a></li>
              <li><a href="/video-design-services" className="text-[rgb(119,119,125)] hover:text-[#ff4f01] transition-colors">Video Design</a></li>
              <li><a href="/#services" className="text-[rgb(119,119,125)] hover:text-[#ff4f01] transition-colors">Branding</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-[#101010]">Resources</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="/blog-posts" className="text-[rgb(119,119,125)] hover:text-[#ff4f01] transition-colors">Blog</a></li>
              <li><a href="#faqs" className="text-[rgb(119,119,125)] hover:text-[#ff4f01] transition-colors">FAQ</a></li>
              <li><a href="#" className="text-[rgb(119,119,125)] hover:text-[#ff4f01] transition-colors">Guides</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-[#101010]">Legal</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="#" className="text-[rgb(119,119,125)] hover:text-[#ff4f01] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-[rgb(119,119,125)] hover:text-[#ff4f01] transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex lg:flex-row flex-col items-center justify-between gap-y-4 pt-6">
          <p className="text-[rgb(119,119,125)]">
            Copyright{" "}
            <a href="/" className="text-[#ff4f01]">
              &copy; NoLimit Designs
            </a>{" "}
            {new Date().getFullYear()}. All Rights Reserved.
          </p>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            <li><a href="#portfolio" className="text-[rgb(119,119,125)] hover:text-[#ff4f01] transition-colors">Portfolio</a></li>
            <li><a href="#how-it-works" className="text-[rgb(119,119,125)] hover:text-[#ff4f01] transition-colors">How It Works</a></li>
            <li><a href="#about" className="text-[rgb(119,119,125)] hover:text-[#ff4f01] transition-colors">About</a></li>
            <li><a href="/pricing" className="text-[rgb(119,119,125)] hover:text-[#ff4f01] transition-colors">Pricing</a></li>
            <li><a href="#contact" className="text-[rgb(119,119,125)] hover:text-[#ff4f01] transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}