import Link from "next/link"
import Image from "next/image"

export function SiteFooter() {
  return (
    <footer className="pt-25 pb-10">
      <div className="container">
        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-8 pb-12.5 border-b border-[#ccc]">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-5">
              <Image
                src="/nolimit-logo.png"
                alt="NoLimit Designs"
                width={150}
                height={47}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-base text-[rgb(119,119,125)] mb-5">Your creative team on demand.</p>
            <div className="flex gap-3">
              <Link
                href="https://linkedin.com"
                target="_blank"
                className="w-10 h-10 rounded-full bg-black-200 flex items-center justify-center text-white hover:bg-primary transition-all duration-300"
              >
                <i className="ri-linkedin-fill"></i>
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                className="w-10 h-10 rounded-full bg-black-200 flex items-center justify-center text-white hover:bg-primary transition-all duration-300"
              >
                <i className="ri-instagram-line"></i>
              </Link>
              <Link
                href="https://x.com"
                target="_blank"
                className="w-10 h-10 rounded-full bg-black-200 flex items-center justify-center text-white hover:bg-primary transition-all duration-300"
              >
                <i className="ri-twitter-x-line"></i>
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-black-100">Company</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/about" className="text-[rgb(119,119,125)] hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-[rgb(119,119,125)] hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[rgb(119,119,125)] hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-[rgb(119,119,125)] hover:text-primary transition-colors">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-black-100">Services</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href="/services/graphic-design"
                  className="text-[rgb(119,119,125)] hover:text-primary transition-colors"
                >
                  Graphic Design
                </Link>
              </li>
              <li>
                <Link
                  href="/services/video-editing"
                  className="text-[rgb(119,119,125)] hover:text-primary transition-colors"
                >
                  Video Design
                </Link>
              </li>
              <li>
                <Link href="/services/branding" className="text-[rgb(119,119,125)] hover:text-primary transition-colors">
                  Branding
                </Link>
              </li>
              <li>
                <Link
                  href="/services/marketing-design"
                  className="text-[rgb(119,119,125)] hover:text-primary transition-colors"
                >
                  Marketing Creatives
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-black-100">Resources</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/blog" className="text-[rgb(119,119,125)] hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-[rgb(119,119,125)] hover:text-primary transition-colors">
                  Design Guides
                </Link>
              </li>
              <li>
                <Link href="/#faqs" className="text-[rgb(119,119,125)] hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[rgb(119,119,125)] hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-black-100">Legal</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/privacy" className="text-[rgb(119,119,125)] hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[rgb(119,119,125)] hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex lg:flex-row flex-col items-center justify-between gap-y-4 pt-7.5">
          <div className="copyright-text">
            <p className="text-[rgb(119,119,125)]">
              Copyright{" "}
              <Link href="/" className="text-primary">
                &copy; NoLimit Designs
              </Link>{" "}
              {new Date().getFullYear()}. All Rights Reserved.
            </p>
          </div>
          <ul className="flex flex-wrap justify-center gap-x-7.5 gap-y-3">
            <li>
              <Link href="/portfolio" className="text-[rgb(119,119,125)] hover:text-primary transition-colors">
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="/how-it-works" className="text-[rgb(119,119,125)] hover:text-primary transition-colors">
                How It Works
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-[rgb(119,119,125)] hover:text-primary transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/#pricing" className="text-[rgb(119,119,125)] hover:text-primary transition-colors">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-[rgb(119,119,125)] hover:text-primary transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
