import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { services } from "@/data/siteData";

export default function ServicesOverview() {
  return (
    <div className="min-h-screen bg-[#fff6ec]">
      <SiteHeader />
      <section className="pt-[160px] pb-16">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 border border-[#bebebe] py-2 px-5 rounded-full text-sm font-medium mb-4">
              <i className="ri-stack-line text-[#ff4f01]" />
              Services
            </span>
            <h1 className="font-bricolage font-semibold xl:text-[64px] xl:leading-[72px] text-[40px] leading-[48px] mb-5">
              Web services built for Edmonton businesses.
            </h1>
            <p className="text-lg leading-8 text-[rgb(119,119,125)]">
              Explore strategy, design, development, SEO, e-commerce, marketing, and maintenance services from one local team.
            </p>
          </div>
        </div>
      </section>
      <section className="pb-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="group rounded-2xl border border-[#bebebe] bg-white/70 p-8 transition-all hover:border-[#ff4f01] hover:shadow-lg"
              >
                <i className={`${service.icon} text-5xl text-[#ff4f01] mb-5 inline-block`} />
                <h2 className="font-bricolage text-2xl font-semibold mb-3 group-hover:text-[#ff4f01] transition-colors">
                  {service.name}
                </h2>
                <p className="text-[rgb(119,119,125)] leading-7 mb-5">{service.tagline}</p>
                <span className="font-bold text-[#101010] group-hover:text-[#ff4f01]">
                  View service <i className="ri-arrow-right-line" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
