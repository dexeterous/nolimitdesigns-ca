import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { blogPosts, industries, locations, services } from "@/data/siteData";

const groups = [
  {
    title: "Main Pages",
    links: [
      ["Home", "/"],
      ["Services", "/services"],
      ["Portfolio", "/portfolio"],
      ["Pricing", "/pricing"],
      ["About", "/about"],
      ["Blog", "/blog-posts"],
      ["Contact", "/contact"],
    ],
  },
  {
    title: "Services",
    links: services.map((service) => [service.name, `/services/${service.slug}`]),
  },
  {
    title: "Industries",
    links: industries.map((industry) => [industry.name, `/portfolio/${industry.slug}`]),
  },
  {
    title: "Locations",
    links: locations.map((location) => [location.name, `/web-design/${location.slug}`]),
  },
  {
    title: "Blog",
    links: blogPosts.map((post) => [post.title, `/blog-posts/${post.slug}`]),
  },
];

export default function Sitemap() {
  return (
    <div className="min-h-screen bg-[#fff6ec]">
      <SiteHeader />
      <section className="pt-[160px] pb-16">
        <div className="container-custom">
          <span className="inline-flex items-center gap-2 border border-[#bebebe] py-2 px-5 rounded-full text-sm font-medium mb-4">
            <i className="ri-sitemap-line text-[#ff4f01]" />
            Sitemap
          </span>
          <h1 className="font-bricolage font-semibold xl:text-[64px] xl:leading-[72px] text-[40px] leading-[48px] mb-5">
            Find every page.
          </h1>
          <p className="text-lg text-[rgb(119,119,125)]">
            A complete index of Nolimit Designs pages and service areas.
          </p>
        </div>
      </section>
      <section className="pb-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8">
            {groups.map((group) => (
              <div key={group.title} className="rounded-2xl border border-[#bebebe] bg-white/70 p-8">
                <h2 className="font-bricolage text-2xl font-semibold mb-5">{group.title}</h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {group.links.map(([label, href]) => (
                    <li key={href}>
                      <Link to={href} className="text-[rgb(119,119,125)] hover:text-[#ff4f01] transition-colors">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
