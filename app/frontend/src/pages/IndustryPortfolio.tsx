import { useParams, Link } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { industries } from "@/data/siteData";

export default function IndustryPortfolio() {
  const { slug } = useParams<{ slug: string }>();
  const industry = industries.find((ind) => ind.slug === slug);

  if (!industry) {
    return (
      <div className="min-h-screen bg-[#fff6ec]">
        <SiteHeader />
        <div className="pt-[160px] pb-20 text-center container-custom">
          <h1 className="font-bricolage text-4xl font-bold mb-4">Industry Not Found</h1>
          <p className="text-[rgb(119,119,125)] mb-8">The industry page you&apos;re looking for doesn&apos;t exist.</p>
          <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const otherIndustries = industries.filter((ind) => ind.slug !== slug).slice(0, 8);

  return (
    <div className="min-h-screen bg-[#fff6ec]">
      <SiteHeader />

      {/* Hero */}
      <section className="pt-[160px] pb-16 bg-gradient-to-br from-[#070707] to-[#1f1f1f] relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 border border-white/20 py-2 px-5 rounded-full text-sm font-medium mb-4 text-white/70">
              <i className={`${industry.icon} text-[#ff4f01]`} />
              {industry.name} Industry
            </span>
            <h1 className="font-bricolage font-semibold xl:text-[56px] xl:leading-[64px] lg:text-[48px] lg:leading-[56px] text-[36px] leading-[44px] text-white mb-6">
              {industry.tagline}
            </h1>
            <p className="text-lg text-white/70 mb-8 max-w-2xl">
              {industry.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact" className="btn btn-primary">
                Get a Free Quote
              </Link>
              <a href="#features" className="btn border-2 border-white text-white hover:bg-white hover:text-[#070707] transition-all">
                See Features
              </a>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff4f01]/10 rounded-full blur-3xl" />
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b border-[#eee]">
        <div className="container-custom">
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            {industry.stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl lg:text-4xl font-bold font-bricolage text-[#ff4f01]">{stat.value}</p>
                <p className="text-sm text-[rgb(119,119,125)] mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="lg:py-24 py-16">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-bricolage font-medium xl:text-[48px] xl:leading-[56px] md:text-[36px] md:leading-[44px] text-[28px] leading-[36px] text-[#101010]">
              Built for {industry.name} Success
            </h2>
            <p className="text-lg text-[rgb(119,119,125)] mt-4 max-w-2xl mx-auto">
              Every feature designed specifically for {industry.name.toLowerCase()} businesses in Edmonton.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {industry.features.map((feature, i) => (
              <div
                key={i}
                className="p-8 rounded-xl border border-[#bebebe] hover:border-[#ff4f01] transition-all bg-white/50 hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-lg bg-[#ff4f01]/10 flex items-center justify-center mb-4">
                  <i className="ri-check-line text-[#ff4f01] text-2xl" />
                </div>
                <h4 className="text-xl font-medium font-bricolage mb-2">{feature}</h4>
                <p className="text-[rgb(119,119,125)] text-sm">
                  Custom-built for {industry.name.toLowerCase()} businesses to increase efficiency and drive growth.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Website Preview */}
      {(industry.slug === "healthcare" || industry.slug === "real-estate" || industry.slug === "restaurant") && (
        <section className="lg:py-24 py-16 bg-[#fafafa]">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="font-bricolage font-medium text-3xl lg:text-4xl text-[#101010] mb-4">
                Live Demo: {industry.name} Website
              </h2>
              <p className="text-[rgb(119,119,125)]">See what we can build for your {industry.name.toLowerCase()} business.</p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#eee]">
                <div className="bg-gray-100 px-4 py-3 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="text-xs text-gray-400 ml-4">demo-{industry.slug}.nolimitdesigns.com</span>
                </div>
                <div className="p-8 text-center">
                  <i className={`${industry.icon} text-6xl text-[#ff4f01] mb-4 inline-block`} />
                  <h3 className="text-2xl font-bricolage font-bold mb-2">
                    {industry.name} Demo Website
                  </h3>
                  <p className="text-[rgb(119,119,125)] mb-6">
                    A fully functional demo showcasing our {industry.name.toLowerCase()} web development capabilities.
                  </p>
                  <a
                    href={`/demos/${industry.slug}.html`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <i className="ri-external-link-line mr-2" />
                    View Live Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="lg:py-24 py-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-bricolage font-medium text-3xl lg:text-4xl text-[#101010] mb-6">
                Why Edmonton {industry.name} Businesses Choose Us
              </h2>
              <div className="space-y-4">
                {[
                  `Deep understanding of the ${industry.name.toLowerCase()} industry`,
                  "Local Edmonton market expertise",
                  "SEO-optimized for local search rankings",
                  "Mobile-first responsive design",
                  "Ongoing support and maintenance",
                  "Fast turnaround — launch in 2-4 weeks",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#ff4f01] flex items-center justify-center shrink-0 mt-0.5">
                      <i className="ri-check-line text-white text-sm" />
                    </div>
                    <p className="text-[#101010]/80">{item}</p>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="btn btn-primary mt-8 inline-block">
                Start Your {industry.name} Project
              </Link>
            </div>
            <div className="bg-gradient-to-br from-[#ff4f01]/10 to-[#ff8c42]/10 rounded-2xl p-10 text-center">
              <i className={`${industry.icon} text-8xl text-[#ff4f01]/30 mb-4 inline-block`} />
              <p className="text-4xl font-bold font-bricolage text-[#ff4f01]">{industry.stats[0]?.value}</p>
              <p className="text-[rgb(119,119,125)]">{industry.stats[0]?.label}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Other Industries */}
      <section className="lg:py-24 py-16 bg-[#fafafa]">
        <div className="container-custom">
          <h2 className="font-bricolage font-medium text-3xl text-center mb-12">
            Explore Other Industries
          </h2>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
            {otherIndustries.map((ind, i) => (
              <Link
                key={i}
                to={`/portfolio/${ind.slug}`}
                className="group flex items-center gap-3 p-4 rounded-xl border border-[#bebebe] hover:border-[#ff4f01] transition-all bg-white"
              >
                <i className={`${ind.icon} text-2xl text-[#ff4f01]`} />
                <span className="font-medium font-bricolage group-hover:text-[#ff4f01] transition-colors">{ind.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="lg:py-24 py-16">
        <div className="container-custom">
          <div className="bg-gradient-to-br from-[#070707] to-[#1f1f1f] rounded-3xl p-12 lg:p-16 text-center">
            <h2 className="font-bricolage font-semibold text-3xl lg:text-5xl text-white mb-6">
              Ready to Build Your {industry.name} Website?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Get a free consultation and custom quote for your {industry.name.toLowerCase()} business in Edmonton.
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