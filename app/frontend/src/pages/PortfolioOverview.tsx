import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { industries } from "@/data/siteData";

export default function PortfolioOverview() {
  return (
    <div className="min-h-screen bg-[#fff6ec]">
      <SiteHeader />
      <section className="pt-[160px] pb-16 bg-gradient-to-br from-[#070707] to-[#1f1f1f]">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 border border-white/20 py-2 px-5 rounded-full text-sm font-medium mb-4 text-white/70">
              <i className="ri-window-line text-[#ff4f01]" />
              Portfolio
            </span>
            <h1 className="font-bricolage font-semibold xl:text-[64px] xl:leading-[72px] text-[40px] leading-[48px] text-white mb-5">
              Industry-specific website work.
            </h1>
            <p className="text-lg leading-8 text-white/70">
              Browse the industries we serve and see how each website can be shaped around the way customers buy, book, call, and compare.
            </p>
          </div>
        </div>
      </section>
      <section className="py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5">
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                to={`/portfolio/${industry.slug}`}
                className="group rounded-xl border border-[#bebebe] bg-white/70 p-6 transition-all hover:border-[#ff4f01] hover:shadow-md"
              >
                <i className={`${industry.icon} text-4xl text-[#ff4f01] mb-4 inline-block`} />
                <h2 className="font-bricolage text-xl font-semibold mb-2 group-hover:text-[#ff4f01] transition-colors">
                  {industry.name}
                </h2>
                <p className="text-sm leading-6 text-[rgb(119,119,125)]">{industry.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
