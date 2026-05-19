import { useState } from "react";
import { Link } from "react-router-dom";

const packages = [
  {
    id: "starter",
    label: "Starter",
    icon: "ri-computer-line",
    eyebrow: "Starter Package",
    title: "Starter Website",
    description:
      "A polished, fast website for businesses that need to look credible online and start collecting leads.",
    investment: "$1,600",
    details: [
      ["Pages", "5-6 Custom"],
      ["Timeline", "3-4 Weeks"],
      ["Best For", "New Businesses"],
    ],
    features: ["Mobile responsive", "Contact forms", "Basic on-page SEO", "Launch support"],
    cta: "Get Started",
  },
  {
    id: "professional",
    label: "Professional",
    icon: "ri-layout-4-line",
    eyebrow: "Most Popular",
    title: "Professional Website",
    description:
      "A conversion-focused website with stronger content structure, local SEO, and pages built around your services.",
    investment: "$1,800 - $5,000",
    details: [
      ["Pages", "7-15+ Custom"],
      ["SEO", "Full Local SEO"],
      ["Best For", "Growing Teams"],
    ],
    features: ["Service pages", "Local search setup", "Analytics ready", "Conversion strategy"],
    cta: "Get Started",
  },
  {
    id: "ecommerce",
    label: "E-Commerce",
    icon: "ri-shopping-cart-line",
    eyebrow: "Online Store",
    title: "E-Commerce Store",
    description:
      "A complete online store with product structure, cart flows, secure payment setup, and inventory foundations.",
    investment: "$4,500 - $7,000",
    details: [
      ["Store", "Full Setup"],
      ["Payments", "Secure Processing"],
      ["Best For", "Online Sales"],
    ],
    features: ["Product catalog", "Cart and checkout", "Payment setup", "Inventory basics"],
    cta: "Get a Quote",
  },
  {
    id: "seo",
    label: "SEO Services",
    icon: "ri-line-chart-line",
    eyebrow: "Monthly Service",
    title: "SEO Services",
    description:
      "Ongoing local SEO for Edmonton businesses that want stronger rankings, better content, and monthly reporting.",
    investment: "$1,500+/mo",
    details: [
      ["Contract", "Month-to-Month"],
      ["Reporting", "Monthly Reports"],
      ["Best For", "Ranking Growth"],
    ],
    features: ["Keyword research", "On-page optimization", "Competitor analysis", "Backlink building"],
    cta: "Learn More",
  },
];

export function HomePricingSection() {
  const [activeId, setActiveId] = useState(packages[1].id);
  const activePackage = packages.find((pkg) => pkg.id === activeId) ?? packages[0];

  return (
    <section id="pricing" className="lg:py-24 py-16 bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="inline-flex items-center gap-2 border border-[#bebebe] py-2 px-5 rounded-full text-sm font-medium mb-4">
              <i className="ri-price-tag-3-line text-[#ff4f01]" />
              Website Pricing
            </span>
            <h2 className="font-bricolage font-medium xl:text-[58px] xl:leading-[66px] md:text-[44px] md:leading-[52px] text-[34px] leading-[42px] text-[#101010] mb-5">
              Clear packages for the way you want to grow.
            </h2>
            <p className="text-lg text-[rgb(119,119,125)] leading-8 mb-8">
              Use these as starting points. Every project includes ownership, mobile optimization, professional support, and a launch plan tailored to your business.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {packages.map((pkg) => (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => setActiveId(pkg.id)}
                  className={`rounded-full border px-5 py-3 text-sm font-bold uppercase tracking-wide transition-all ${
                    activeId === pkg.id
                      ? "border-[#101010] bg-[#101010] text-white"
                      : "border-[#bebebe] bg-[#fff6ec] text-[#101010] hover:border-[#ff4f01]"
                  }`}
                >
                  {pkg.label}
                </button>
              ))}
            </div>
        </div>

        <div className="rounded-2xl border border-[#bebebe] bg-[#fff6ec] p-5 shadow-sm">
            <div className="grid lg:grid-cols-[210px_1fr_260px] gap-8 items-stretch">
              <div className="rounded-xl bg-[#101010] min-h-[220px] flex items-center justify-center">
                <i className={`${activePackage.icon} text-[82px] text-[#ff4f01]`} />
              </div>
              <div className="py-3 flex flex-col justify-center">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[rgb(119,119,125)] mb-3">
                  {activePackage.eyebrow}
                </p>
                <h3 className="font-bricolage text-4xl lg:text-[52px] font-semibold leading-tight mb-4">
                  {activePackage.title}
                </h3>
                <p className="text-[rgb(119,119,125)] leading-7 mb-7 max-w-2xl">
                  {activePackage.description}
                </p>
                <div className="grid sm:grid-cols-3 gap-5">
                  {activePackage.details.map(([label, value]) => (
                    <div key={label}>
                      <p className="text-[11px] uppercase tracking-[0.22em] text-[rgb(119,119,125)] font-bold">
                        {label}
                      </p>
                      <p className="font-bold text-[#101010]">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl bg-white/70 border border-[#eadccd] p-6 flex flex-col justify-center">
                <div className="grid gap-3 mb-7">
                  {activePackage.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-[#101010]/80">
                      <i className="ri-check-line text-[#ff4f01]" />
                      {feature}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-4">
                  <Link to="/contact" className="btn btn-primary !mb-0">
                    {activePackage.cta} <i className="ri-arrow-right-line ml-1" />
                  </Link>
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-[rgb(119,119,125)] font-bold">
                      Investment
                    </p>
                    <p className="text-xl font-bold">{activePackage.investment}</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-5 text-center text-sm text-[rgb(119,119,125)]">
              50% deposit to start, 50% at launch. Payment plans are available.
            </p>
        </div>
      </div>
    </section>
  );
}
