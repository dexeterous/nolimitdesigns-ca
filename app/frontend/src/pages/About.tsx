import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { processSteps } from "@/data/siteData";

export default function About() {
  return (
    <div className="min-h-screen bg-[#fff6ec]">
      <SiteHeader />

      {/* Hero */}
      <section className="pt-[160px] pb-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 border border-[#bebebe] py-2 px-5 rounded-full text-sm font-medium mb-4">
                <i className="ri-team-line text-[#ff4f01]" />
                About Us
              </span>
              <h1 className="font-bricolage font-semibold xl:text-[56px] xl:leading-[64px] lg:text-[48px] lg:leading-[56px] text-[36px] leading-[44px] text-[#101010] mb-6">
                Edmonton&apos;s Web Development <span className="text-[#ff4f01]">Experts</span>
              </h1>
              <p className="text-lg leading-7 text-[#101010]/80 mb-6">
                Nolimit Designs is Edmonton&apos;s premier web development agency. We specialize in building high-performance websites for businesses across 20+ industries in the Edmonton metropolitan area.
              </p>
              <p className="text-lg leading-7 text-[#101010]/80 mb-8">
                Our team combines technical expertise with deep industry knowledge to deliver websites that don&apos;t just look great — they generate leads, drive revenue, and grow businesses.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/contact" className="btn btn-primary">
                  Work With Us
                </Link>
                <a href="#process" className="btn btn-dark">
                  Our Process
                </a>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#ff4f01]/10 to-[#ff8c42]/10 rounded-3xl p-10">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <p className="text-3xl font-bold font-bricolage text-[#ff4f01]">100+</p>
                  <p className="text-sm text-[rgb(119,119,125)]">Projects</p>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <p className="text-3xl font-bold font-bricolage text-[#ff4f01]">20+</p>
                  <p className="text-sm text-[rgb(119,119,125)]">Industries</p>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <p className="text-3xl font-bold font-bricolage text-[#ff4f01]">98%</p>
                  <p className="text-sm text-[rgb(119,119,125)]">Satisfaction</p>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <p className="text-3xl font-bold font-bricolage text-[#ff4f01]">4.9★</p>
                  <p className="text-sm text-[rgb(119,119,125)]">Google Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="lg:py-24 py-16 bg-gradient-to-br from-[#070707] to-[#1f1f1f]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-bricolage font-medium text-3xl lg:text-5xl text-white">
              What Drives Us
            </h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { icon: "ri-rocket-line", title: "Results-Driven", desc: "Every website we build is designed to achieve measurable business outcomes — more leads, more sales, more growth." },
              { icon: "ri-heart-line", title: "Client-Focused", desc: "We treat every project as a partnership. Your success is our success, and we go above and beyond to deliver excellence." },
              { icon: "ri-map-pin-line", title: "Locally Rooted", desc: "We know Edmonton. We understand the local market, the competition, and what it takes for businesses here to thrive online." },
            ].map((value, i) => (
              <div key={i} className="text-center p-8">
                <i className={`${value.icon} text-5xl text-[#ff4f01] mb-4 inline-block`} />
                <h4 className="text-2xl font-bold font-bricolage text-white mb-3">{value.title}</h4>
                <p className="text-white/70 leading-7">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="lg:py-24 py-16">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 border border-[#bebebe] py-2 px-5 rounded-full text-sm font-medium mb-3">
              <i className="ri-arrow-right-up-line text-[#ff4f01]" />
              Our Process
            </span>
            <h2 className="font-bricolage font-medium xl:text-[48px] xl:leading-[56px] md:text-[36px] md:leading-[44px] text-[28px] leading-[36px] text-[#101010]">
              How We Work
            </h2>
            <p className="text-lg text-[rgb(119,119,125)] mt-4 max-w-2xl mx-auto">
              A proven 4-step process that delivers results every time.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {processSteps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center border border-[rgba(0,0,0,.08)] relative mb-6 mx-auto bg-white shadow-sm">
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
        </div>
      </section>

      {/* Tech Stack */}
      <section className="lg:py-24 py-16 bg-[#fafafa]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-bricolage font-medium text-3xl lg:text-4xl text-[#101010]">
              Technologies We Use
            </h2>
            <p className="text-[rgb(119,119,125)] mt-4">Modern tools for modern businesses.</p>
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[
              { name: "React", icon: "ri-reactjs-line" },
              { name: "Next.js", icon: "ri-nextjs-line" },
              { name: "TypeScript", icon: "ri-code-s-slash-line" },
              { name: "Tailwind CSS", icon: "ri-css3-line" },
              { name: "Node.js", icon: "ri-nodejs-line" },
              { name: "WordPress", icon: "ri-wordpress-line" },
              { name: "Shopify", icon: "ri-shopping-bag-line" },
              { name: "PostgreSQL", icon: "ri-database-2-line" },
            ].map((tech, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#eee]">
                <i className={`${tech.icon} text-2xl text-[#ff4f01]`} />
                <span className="font-medium">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="lg:py-24 py-16">
        <div className="container-custom">
          <div className="bg-gradient-to-br from-[#070707] to-[#1f1f1f] rounded-3xl p-12 lg:p-16 text-center">
            <h2 className="font-bricolage font-semibold text-3xl lg:text-5xl text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how we can help your Edmonton business grow online.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/contact" className="btn btn-primary">Get Your Free Quote</Link>
              <a href="tel:+17809001234" className="btn border-2 border-white text-white hover:bg-white hover:text-[#070707] transition-all">
                <i className="ri-phone-line mr-2" />Call (780) 900-1234
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}