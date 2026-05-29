import { useState } from "react";
import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getPackageContactPath, pricingPackages } from "@/data/pricingPackages";

const addOns = [
  { title: "SEO Services", price: "$1,500+/mo", desc: "Local SEO, content strategy, technical improvements, and monthly reporting." },
  { title: "Website Maintenance", price: "$99+/mo", desc: "Updates, monitoring, backups, and priority support after launch." },
  { title: "Custom Web App", price: "Custom quote", desc: "Dashboards, portals, booking systems, integrations, and advanced workflows." },
];

const faqs = [
  { q: "Do you offer fixed website pricing?", a: "Yes. The packages on this page are starting points. After a short discovery call, we confirm scope, timeline, and final pricing before work begins." },
  { q: "How do payments work?", a: "Most projects use a 50% deposit to start and 50% at launch. Payment plans are available for larger builds." },
  { q: "Can you rebuild an existing website?", a: "Yes. We can redesign, rebuild, migrate, or modernize an existing website while keeping important content, SEO value, and business workflows intact." },
  { q: "Is SEO included?", a: "Every website includes on-page SEO foundations. Ongoing SEO campaigns are available for businesses that want ranking growth after launch." },
  { q: "Do you provide support after launch?", a: "Yes. We offer maintenance plans for updates, monitoring, content changes, backups, and technical support." },
  { q: "Do you build outside Edmonton?", a: "Yes. We are Edmonton-based, but we work with businesses across Alberta and Canada." },
];

export default function Pricing() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#fff6ec]">
      <SiteHeader />

      <section className="lg:pt-[180px] pt-[120px] pb-16">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 border border-[#bebebe] py-2 px-5 rounded-full text-sm font-medium mb-4">
              <i className="ri-price-tag-3-line text-[#ff4f01]" />
              Website Pricing
            </span>
            <h1 className="font-bricolage font-semibold xl:text-[64px] xl:leading-[72px] md:text-[48px] md:leading-[56px] text-[38px] leading-[46px] text-[#101010] mb-5">
              Clear web development packages for growing businesses.
            </h1>
            <p className="text-lg leading-8 text-[rgb(119,119,125)] mb-8">
              Nolimit Designs builds websites, e-commerce stores, and custom web systems for Edmonton businesses. These packages give you a practical starting point before we quote your exact scope.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact" className="btn btn-primary">
                Request a Quote
              </Link>
              <Link to="/portfolio" className="btn btn-dark">
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="lg:py-20 py-12">
        <div className="container-custom">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
            {pricingPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-2xl border p-8 bg-white flex flex-col ${
                  pkg.highlighted ? "border-[#ff4f01] shadow-xl" : "border-[#bebebe]"
                }`}
              >
                {pkg.highlighted && (
                  <span className="w-max rounded-full bg-[#ff4f01] px-4 py-1 text-xs font-bold uppercase tracking-wide text-white mb-5">
                    Most Popular
                  </span>
                )}
                <div className="w-14 h-14 rounded-xl bg-[#101010] flex items-center justify-center mb-5">
                  <i className={`${pkg.icon} text-2xl text-[#ff4f01]`} />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[rgb(119,119,125)] mb-3">
                  {pkg.eyebrow}
                </p>
                <h2 className="font-bricolage text-3xl font-semibold text-[#101010] mb-3">{pkg.title}</h2>
                <p className="text-[rgb(119,119,125)] leading-7 mb-5">{pkg.description}</p>
                <p className="font-bricolage text-4xl font-semibold text-[#ff4f01] mb-6">{pkg.investment}</p>
                <div className="grid gap-3 mb-6 text-sm">
                  {pkg.details.map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between gap-3 border-b border-[#f1e5da] pb-2 last:border-b-0">
                      <p className="uppercase tracking-[0.18em] text-[rgb(119,119,125)] text-[10px] font-bold">{label}</p>
                      <p className="font-bold text-[#101010] text-right">{value}</p>
                    </div>
                  ))}
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-[#101010]/80">
                      <i className="ri-check-line text-[#ff4f01] mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to={getPackageContactPath(pkg.id)} className="btn btn-primary text-center justify-center !mb-0">
                  {pkg.cta}
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-[rgb(119,119,125)]">
            All pricing is in CAD. Final pricing depends on scope, content, integrations, and timeline.
          </p>
        </div>
      </section>

      <section className="lg:py-20 py-12 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 border border-[#bebebe] py-2 px-5 rounded-full text-sm font-medium mb-3">
              <i className="ri-add-circle-line text-[#ff4f01]" />
              Add-On Services
            </span>
            <h2 className="font-bricolage font-medium xl:text-[52px] xl:leading-[60px] md:text-[40px] md:leading-[48px] text-[32px] leading-[40px] text-[#101010]">
              Support for launch, growth, and long-term performance.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {addOns.map((item) => (
              <div key={item.title} className="rounded-2xl border border-[#bebebe] bg-[#fff6ec] p-8">
                <h3 className="font-bricolage text-2xl font-semibold mb-3">{item.title}</h3>
                <p className="text-[#ff4f01] font-bold mb-4">{item.price}</p>
                <p className="text-[rgb(119,119,125)] leading-7">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lg:py-24 py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 border border-[#bebebe] py-2 px-5 rounded-full text-sm font-medium mb-3">
              <i className="ri-question-line text-[#ff4f01]" />
              FAQs
            </span>
            <h2 className="font-bricolage font-medium xl:text-[52px] xl:leading-[60px] md:text-[40px] md:leading-[48px] text-[32px] leading-[40px] text-[#101010]">
              Website pricing questions.
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col gap-4">
              {faqs.map((faq, i) => (
                <div key={faq.q}>
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
                      openFAQ === i ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0 py-0"
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

      <section className="lg:py-24 py-16">
        <div className="container-custom">
          <div className="relative bg-gradient-to-br from-[#070707] to-[#1f1f1f] rounded-3xl p-12 lg:p-20 text-center overflow-hidden">
            <div className="relative z-10">
              <h2 className="font-bricolage font-semibold xl:text-[56px] xl:leading-[64px] md:text-[42px] md:leading-[50px] text-[32px] leading-[40px] text-white mb-4">
                Ready to build a website that works?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                Tell us what you are building and we will recommend the right scope, timeline, and investment.
              </p>
              <Link to="/contact" className="btn btn-primary">
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
