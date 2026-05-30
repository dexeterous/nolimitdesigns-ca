import { useState } from "react";
import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { HomePricingSection } from "@/components/HomePricingSection";
import { industries, services, testimonials, faqData, processSteps } from "@/data/siteData";

const companyLogos = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/company1-DAcU80XmDqE7n4yHBPEPaJo2GqDasE.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/company2-8A2v3xWKAJxTVDgu2XhS84M1Jux4Bk.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/company3-Rdc1oIOSvNO9bMzxHC7qZMnEFMg8w9.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/company4-maSfugMfllJUwqzgNTuW4Rs2EhmL2R.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/company5-EmHeKOlL0aPHdxYXlhmxVsnGIbgWtk.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/company6-Psf7hxqmQZCFug3zEWEiF7bi1AQX47.png",
];

export default function Index() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  return (
    <div className="min-h-screen bg-[#fff6ec]">
      <SiteHeader />

      {/* HERO SECTION */}
      <section className="lg:pt-[180px] pt-[120px] pb-16 relative overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 border border-[#bebebe] py-2 px-5 rounded-full text-sm font-medium mb-4">
                <i className="ri-map-pin-line text-[#ff4f01]" />
                Edmonton&apos;s #1 Web Development Agency
              </span>
              <h1 className="font-bricolage font-semibold xl:text-[72px] xl:leading-[80px] lg:text-[56px] lg:leading-[64px] md:text-[48px] md:leading-[56px] text-[38px] leading-[46px] text-[#101010] mb-6">
                We Build Websites That{" "}
                <span className="text-[#ff4f01]">Grow Edmonton Businesses.</span>
              </h1>
              <p className="text-lg leading-7 text-[#101010]/80 mb-8 max-w-xl">
                Custom web development, e-commerce, and SEO for 20+ industries across Edmonton and surrounding areas. From healthcare to real estate, we build websites that generate leads and drive revenue.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/contact" className="btn btn-primary">
                  Get a Free Quote
                </Link>
                <Link to="/portfolio" className="btn btn-dark">
                  View Our Work
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-8">
                <div className="flex items-center gap-2">
                  <i className="ri-check-double-line text-[#ff4f01] text-xl" />
                  <span className="text-sm text-[#101010]/70">100+ Projects Delivered</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-check-double-line text-[#ff4f01] text-xl" />
                  <span className="text-sm text-[#101010]/70">20+ Industries Served</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://mgx-backend-cdn.metadl.com/generate/images/1108746/2026-05-14/osegv5qaagoq/hero-web-agency-edmonton.png"
                  alt="Nolimit Designs - Professional Web Development Agency in Edmonton"
                  className="w-full h-auto object-cover rounded-3xl"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-xl border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <i className="ri-arrow-up-line text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Leads This Month</p>
                    <p className="text-lg font-bold text-[#101010]">+247%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED BY */}
      <section className="py-12 bg-[#fff6ec]">
        <div className="container-custom">
          <h3 className="uppercase text-sm text-center tracking-[4px] mb-6 font-medium text-[rgb(119,119,125)]">
            Trusted by Edmonton Businesses Across 20+ Industries
          </h3>
          <div className="logo-slider">
            <div className="logos-slide">
              {[...companyLogos, ...companyLogos].map((src, i) => (
                <img key={i} src={src} alt="client logo" className="max-w-[130px] h-auto mx-10 object-contain" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="lg:py-24 py-16">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 border border-[#bebebe] py-2 px-5 rounded-full text-sm font-medium mb-3">
              <i className="ri-arrow-right-up-line text-[#ff4f01]" />
              Our Services
            </span>
            <h2 className="font-bricolage font-medium xl:text-[64px] xl:leading-[72px] md:text-[48px] md:leading-[56px] text-[36px] leading-[44px] text-[#101010]">
              Full-Service Web Development
            </h2>
            <p className="text-lg text-[rgb(119,119,125)] mt-4 max-w-2xl mx-auto">
              Everything your Edmonton business needs to dominate online — from design to development to marketing.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {services.map((svc, i) => (
              <Link
                key={i}
                to={`/services/${svc.slug}`}
                className="group text-center py-12 px-8 rounded-[15px] border border-[#bebebe] hover:border-[#ff4f01] transition-all duration-500 bg-white/50 hover:shadow-lg"
              >
                <i className={`${svc.icon} text-[48px] text-[#ff4f01] mb-4 inline-block group-hover:scale-110 transition-transform`} />
                <h4 className="text-2xl font-medium mb-3 font-bricolage">{svc.name}</h4>
                <p className="text-base text-[rgb(119,119,125)] leading-7">{svc.tagline}</p>
                <span className="inline-flex items-center gap-1 text-[#ff4f01] font-medium mt-4 group-hover:gap-2 transition-all">
                  Learn More <i className="ri-arrow-right-line" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <HomePricingSection />

      {/* INDUSTRIES SECTION */}
      <section id="industries" className="lg:py-24 py-16 bg-gradient-to-br from-[#070707] to-[#1f1f1f]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 border border-[#444] py-2 px-5 rounded-full text-sm font-medium mb-3 text-white/70">
              <i className="ri-arrow-right-up-line text-[#ff4f01]" />
              Industries We Serve
            </span>
            <h2 className="font-bricolage font-medium xl:text-[64px] xl:leading-[72px] md:text-[48px] md:leading-[56px] text-[36px] leading-[44px] text-white">
              20+ Industry Specializations
            </h2>
            <p className="text-lg text-white/60 mt-4 max-w-2xl mx-auto">
              We don&apos;t just build websites — we build industry-specific solutions that understand your customers.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
            {industries.map((ind, i) => (
              <Link
                key={i}
                to={`/portfolio/${ind.slug}`}
                className="group bg-white/5 border border-white/10 rounded-xl p-5 text-center hover:bg-[#ff4f01]/10 hover:border-[#ff4f01]/50 transition-all duration-300"
              >
                <i className={`${ind.icon} text-3xl text-[#ff4f01] mb-2 inline-block group-hover:scale-110 transition-transform`} />
                <p className="text-white/90 text-sm font-medium">{ind.name}</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/portfolio" className="btn btn-primary">
              View Industry Portfolios
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS / PROCESS */}
      <section id="process" className="lg:py-24 py-16">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 border border-[#bebebe] py-2 px-5 rounded-full text-sm font-medium mb-3">
              <i className="ri-arrow-right-up-line text-[#ff4f01]" />
              Our Process
            </span>
            <h2 className="font-bricolage font-medium xl:text-[64px] xl:leading-[72px] md:text-[48px] md:leading-[56px] text-[36px] leading-[44px] text-[#101010]">
              From Concept to Launch in 4 Steps
            </h2>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {processSteps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center px-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center border border-[rgba(0,0,0,.08)] relative mb-6 bg-white shadow-sm">
                  <i className={`${step.icon} text-[28px] text-[#ff4f01]`} />
                  <div className="absolute -right-2 -top-2 bg-[#ff4f01] flex justify-center items-center text-white w-7 h-7 rounded-full text-sm font-medium">
                    {step.num}
                  </div>
                </div>
                <h3 className="text-xl font-bold font-bricolage mb-3">{step.title}</h3>
                <p className="text-base text-[rgb(119,119,125)] leading-7">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16">
            {[
              { num: "100+", label: "Projects Delivered" },
              { num: "20+", label: "Industries Served" },
              { num: "98%", label: "Client Satisfaction" },
              { num: "4.9★", label: "Google Rating" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-[40px] font-bold font-bricolage text-[#ff4f01]">{stat.num}</p>
                <p className="text-sm text-[rgb(119,119,125)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO PREVIEW */}
      <section id="portfolio" className="lg:py-24 py-16">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 border border-[#bebebe] py-2 px-5 rounded-full text-sm font-medium mb-3">
              <i className="ri-arrow-right-up-line text-[#ff4f01]" />
              Portfolio
            </span>
            <h2 className="font-bricolage font-medium xl:text-[64px] xl:leading-[72px] md:text-[48px] md:leading-[56px] text-[36px] leading-[44px] text-[#101010]">
              See Our Work in Action
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {[
              {
                name: "Atlanse Solutions",
                desc: "IT consulting, infrastructure, cybersecurity, and analytics website",
                image: "/images/portfolio/atlanse-solutions/hero-image.png",
                category: "IT Consulting",
              },
              {
                name: "Pinnacle Immigration",
                desc: "Canada PR and study pathway website with eligibility lead flow",
                image: "/images/portfolio/pinnacle/hero-image.png",
                category: "Immigration",
              },
              {
                name: "Learn French Fast",
                desc: "Language training website with package-led conversion paths",
                image: "/images/portfolio/learn-french-fast/hero-image.png",
                category: "Education",
              },
            ].map((project, i) => (
              <Link
                key={i}
                to="/portfolio"
                className="group rounded-2xl overflow-hidden border border-[#bebebe] hover:border-[#ff4f01] transition-all duration-500 bg-white/50 hover:shadow-xl"
              >
                <div className="h-56 bg-[#fff6ec] relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={`${project.name} website screenshot`}
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101010]/35 via-transparent to-transparent opacity-70" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#101010] shadow-sm">
                    {project.category}
                  </span>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-medium font-bricolage mb-2 group-hover:text-[#ff4f01] transition-colors">
                    {project.name}
                  </h4>
                  <p className="text-[rgb(119,119,125)] text-base">{project.desc}</p>
                  <span className="inline-flex items-center gap-1 text-[#ff4f01] font-medium mt-4 group-hover:gap-2 transition-all">
                    View Case Study <i className="ri-arrow-right-line" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/portfolio" className="btn btn-outline">
              View All Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* LOCATION-BASED SEO SECTION */}
      <section className="lg:py-24 py-16 bg-[#fafafa]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 border border-[#bebebe] py-2 px-5 rounded-full text-sm font-medium mb-3">
              <i className="ri-map-pin-line text-[#ff4f01]" />
              Areas We Serve
            </span>
            <h2 className="font-bricolage font-medium xl:text-[64px] xl:leading-[72px] md:text-[48px] md:leading-[56px] text-[36px] leading-[44px] text-[#101010]">
              Web Development Across Edmonton
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {[
              { name: "Edmonton", slug: "edmonton", desc: "Capital city web development" },
              { name: "St. Albert", slug: "st-albert", desc: "Growing community solutions" },
              { name: "Sherwood Park", slug: "sherwood-park", desc: "Strathcona County specialists" },
              { name: "Spruce Grove", slug: "spruce-grove", desc: "Parkland County web design" },
              { name: "Leduc", slug: "leduc", desc: "Airport corridor businesses" },
              { name: "Fort Saskatchewan", slug: "fort-saskatchewan", desc: "Industrial web solutions" },
            ].map((loc, i) => (
              <Link
                key={i}
                to={`/web-design/${loc.slug}`}
                className="group flex items-center gap-4 p-6 rounded-xl border border-[#bebebe] hover:border-[#ff4f01] transition-all bg-white hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-full bg-[#ff4f01]/10 flex items-center justify-center shrink-0 group-hover:bg-[#ff4f01]/20 transition-colors">
                  <i className="ri-map-pin-2-fill text-[#ff4f01] text-xl" />
                </div>
                <div>
                  <h4 className="font-medium font-bricolage text-lg group-hover:text-[#ff4f01] transition-colors">{loc.name}</h4>
                  <p className="text-sm text-[rgb(119,119,125)]">{loc.desc}</p>
                </div>
                <i className="ri-arrow-right-line text-[#ff4f01] ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="lg:py-24 py-16">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 border border-[#bebebe] py-2 px-5 rounded-full text-sm font-medium mb-3">
              <i className="ri-arrow-right-up-line text-[#ff4f01]" />
              Testimonials
            </span>
            <h2 className="font-bricolage font-medium xl:text-[64px] xl:leading-[72px] md:text-[48px] md:leading-[56px] text-[36px] leading-[44px] text-[#101010]">
              What Edmonton Businesses Say
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`px-10 py-12 border-2 border-[#ff4f01] rounded-2xl text-center ${
                  i === currentTestimonial ? "block" : "hidden"
                }`}
              >
                <p className="text-2xl lg:text-3xl leading-10 italic font-bricolage text-[#101010] mb-8">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-[#ff4f01] flex items-center justify-center text-white text-xl font-bold mb-2">
                    {t.author[0]}
                  </div>
                  <h5 className="text-xl font-medium font-bricolage">{t.author}</h5>
                  <span className="text-sm text-[rgb(119,119,125)]">{t.role}</span>
                  <span className="text-xs text-[#ff4f01] mt-1">{t.industry}</span>
                </div>
              </div>
            ))}

            <div className="flex justify-center gap-2 mt-8">
              <button
                onClick={() =>
                  setCurrentTestimonial(
                    currentTestimonial === 0 ? testimonials.length - 1 : currentTestimonial - 1
                  )
                }
                className="w-10 h-10 bg-[#ff4f01] inline-flex justify-center items-center rounded-full text-white border-2 border-[#ff4f01] hover:bg-transparent hover:text-[#ff4f01] transition-all duration-500 cursor-pointer"
              >
                <i className="ri-arrow-left-s-line" />
              </button>
              <button
                onClick={() =>
                  setCurrentTestimonial(
                    currentTestimonial === testimonials.length - 1 ? 0 : currentTestimonial + 1
                  )
                }
                className="w-10 h-10 bg-[#ff4f01] inline-flex justify-center items-center rounded-full text-white border-2 border-[#ff4f01] hover:bg-transparent hover:text-[#ff4f01] transition-all duration-500 cursor-pointer"
              >
                <i className="ri-arrow-right-s-line" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faqs" className="lg:py-24 py-16">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 border border-[#bebebe] py-2 px-5 rounded-full text-sm font-medium mb-3">
              <i className="ri-arrow-right-up-line text-[#ff4f01]" />
              FAQs
            </span>
            <h2 className="font-bricolage font-medium xl:text-[64px] xl:leading-[72px] md:text-[48px] md:leading-[56px] text-[36px] leading-[44px] text-[#101010]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid lg:grid-cols-[33%_auto] md:grid-cols-2 gap-8">
            <div className="p-10 rounded-2xl bg-[#070707] text-center flex flex-col items-center justify-center">
              <i className="ri-question-line text-6xl text-[#ff4f01] mb-4" />
              <h3 className="text-white text-3xl lg:text-[36px] leading-tight font-bricolage mb-4">
                Still have questions?
              </h3>
              <Link to="/contact" className="btn btn-primary">
                Get in Touch <i className="ri-chat-3-line" />
              </Link>
              <p className="text-white/70 mt-3 text-sm">
                Or call us:{" "}
                <a href="tel:+15878826700" className="text-[#ff4f01]">
                  (587) 882-6700
                </a>
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {faqData.map((faq, i) => (
                <div key={i}>
                  <button
                    onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                    className="w-full flex justify-between items-center text-lg lg:text-[20px] rounded-xl border border-[#ccc] py-4 px-5 font-medium cursor-pointer text-left hover:border-[#ff4f01] transition-all"
                  >
                    {faq.q}
                    <span
                      className={`inline-block w-3 h-3 rounded-full shrink-0 ml-4 transition-colors ${
                        openFAQ === i ? "bg-[#ff4f01]" : "bg-[#000000]"
                      }`}
                    />
                  </button>
                  <div
                    className={`px-5 transition-all duration-500 overflow-hidden ${
                      openFAQ === i
                        ? "max-h-96 opacity-100 py-4"
                        : "max-h-0 opacity-0 py-0"
                    }`}
                  >
                    <p className="text-[rgb(119,119,125)] leading-7">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="contact" className="lg:py-24 py-16">
        <div className="container-custom">
          <div className="relative bg-gradient-to-br from-[#070707] to-[#1f1f1f] rounded-3xl p-12 lg:p-20 text-center overflow-hidden">
            <div className="relative z-10">
              <h2 className="font-bricolage font-semibold xl:text-[64px] xl:leading-[72px] md:text-[48px] md:leading-[56px] text-[36px] leading-[44px] text-white mb-6">
                Ready to Grow Your Business Online?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                Get a free consultation and custom quote for your Edmonton business website. No obligation, no pressure — just expert advice.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/contact" className="btn btn-primary">
                  Get Your Free Quote
                </Link>
                <a
                  href="tel:+15878826700"
                  className="btn border-2 border-white text-white hover:bg-white hover:text-[#070707] transition-all"
                >
                  <i className="ri-phone-line mr-2" />
                  Call (587) 882-6700
                </a>
              </div>
            </div>
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#ff4f01]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#ff4f01]/5 rounded-full blur-3xl" />
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
