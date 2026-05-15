import { useParams, Link } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { locations, industries, services } from "@/data/siteData";

export default function LocationPage() {
  const { slug } = useParams<{ slug: string }>();
  const location = locations.find((loc) => loc.slug === slug);

  if (!location) {
    return (
      <div className="min-h-screen bg-[#fff6ec]">
        <SiteHeader />
        <div className="pt-[160px] pb-20 text-center container-custom">
          <h1 className="font-bricolage text-4xl font-bold mb-4">Location Not Found</h1>
          <p className="text-[rgb(119,119,125)] mb-8">The location page you&apos;re looking for doesn&apos;t exist.</p>
          <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const otherLocations = locations.filter((loc) => loc.slug !== slug);

  return (
    <div className="min-h-screen bg-[#fff6ec]">
      <SiteHeader />

      {/* Hero */}
      <section className="pt-[160px] pb-16 bg-gradient-to-br from-[#070707] to-[#1f1f1f] relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 border border-white/20 py-2 px-5 rounded-full text-sm font-medium mb-4 text-white/70">
              <i className="ri-map-pin-2-fill text-[#ff4f01]" />
              {location.region}
            </span>
            <h1 className="font-bricolage font-semibold xl:text-[56px] xl:leading-[64px] lg:text-[48px] lg:leading-[56px] text-[36px] leading-[44px] text-white mb-6">
              Web Design &amp; Development in {location.name}
            </h1>
            <p className="text-lg text-white/70 mb-8 max-w-2xl">
              {location.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact" className="btn btn-primary">
                Get a Free Quote
              </Link>
              <a href="#services" className="btn border-2 border-white text-white hover:bg-white hover:text-[#070707] transition-all">
                Our Services
              </a>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff4f01]/10 rounded-full blur-3xl" />
      </section>

      {/* Local Stats */}
      <section className="py-12 bg-white border-b border-[#eee]">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <p className="text-3xl font-bold font-bricolage text-[#ff4f01]">100+</p>
              <p className="text-sm text-[rgb(119,119,125)]">Projects Completed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold font-bricolage text-[#ff4f01]">{location.population}</p>
              <p className="text-sm text-[rgb(119,119,125)]">Population Served</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold font-bricolage text-[#ff4f01]">4.9★</p>
              <p className="text-sm text-[rgb(119,119,125)]">Google Rating</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold font-bricolage text-[#ff4f01]">2-4 wks</p>
              <p className="text-sm text-[rgb(119,119,125)]">Avg Delivery Time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services for this location */}
      <section id="services" className="lg:py-24 py-16">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-bricolage font-medium xl:text-[48px] xl:leading-[56px] md:text-[36px] md:leading-[44px] text-[28px] leading-[36px] text-[#101010]">
              Web Development Services in {location.name}
            </h2>
            <p className="text-lg text-[rgb(119,119,125)] mt-4 max-w-2xl mx-auto">
              Full-service web development tailored for {location.name} businesses.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {services.map((svc, i) => (
              <Link
                key={i}
                to={`/services/${svc.slug}`}
                className="group p-8 rounded-xl border border-[#bebebe] hover:border-[#ff4f01] transition-all bg-white/50 hover:shadow-md"
              >
                <i className={`${svc.icon} text-4xl text-[#ff4f01] mb-4 inline-block`} />
                <h4 className="text-xl font-medium font-bricolage mb-2 group-hover:text-[#ff4f01] transition-colors">
                  {svc.name} in {location.name}
                </h4>
                <p className="text-sm text-[rgb(119,119,125)]">{svc.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Industries in this location */}
      <section className="lg:py-24 py-16 bg-[#fafafa]">
        <div className="container-custom">
          <h2 className="font-bricolage font-medium text-3xl lg:text-4xl text-center mb-4">
            Industries We Serve in {location.name}
          </h2>
          <p className="text-center text-[rgb(119,119,125)] mb-12">
            Key industries in {location.name}: {location.keyIndustries.join(", ")}
          </p>
          <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
            {industries.slice(0, 10).map((ind, i) => (
              <Link
                key={i}
                to={`/portfolio/${ind.slug}`}
                className="group bg-white border border-[#bebebe] rounded-xl p-4 text-center hover:border-[#ff4f01] transition-all"
              >
                <i className={`${ind.icon} text-2xl text-[#ff4f01] mb-2 inline-block`} />
                <p className="text-sm font-medium">{ind.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Local */}
      <section className="lg:py-24 py-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-bricolage font-medium text-3xl lg:text-4xl text-[#101010] mb-6">
                Why Choose a Local {location.name} Web Developer?
              </h2>
              <div className="space-y-4">
                {[
                  `We understand the ${location.name} market and local customer behavior`,
                  "Face-to-face meetings available for local clients",
                  `SEO optimized for "${location.name}" search terms`,
                  "Knowledge of local business regulations and requirements",
                  "Quick response times in your timezone",
                  "Supporting the local Edmonton-area economy",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#ff4f01] flex items-center justify-center shrink-0 mt-0.5">
                      <i className="ri-check-line text-white text-sm" />
                    </div>
                    <p className="text-[#101010]/80">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#ff4f01]/10 to-[#ff8c42]/10 rounded-2xl p-10 text-center">
              <i className="ri-map-pin-2-fill text-8xl text-[#ff4f01]/30 mb-4 inline-block" />
              <h3 className="text-2xl font-bricolage font-bold">{location.name}</h3>
              <p className="text-[rgb(119,119,125)]">{location.region}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Other Locations */}
      <section className="lg:py-24 py-16 bg-[#fafafa]">
        <div className="container-custom">
          <h2 className="font-bricolage font-medium text-3xl text-center mb-12">
            Also Serving These Areas
          </h2>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {otherLocations.map((loc, i) => (
              <Link
                key={i}
                to={`/web-design/${loc.slug}`}
                className="group flex items-center gap-4 p-6 rounded-xl border border-[#bebebe] hover:border-[#ff4f01] transition-all bg-white"
              >
                <div className="w-12 h-12 rounded-full bg-[#ff4f01]/10 flex items-center justify-center shrink-0">
                  <i className="ri-map-pin-2-fill text-[#ff4f01] text-xl" />
                </div>
                <div>
                  <h4 className="font-medium font-bricolage group-hover:text-[#ff4f01] transition-colors">{loc.name}</h4>
                  <p className="text-sm text-[rgb(119,119,125)]">{loc.region}</p>
                </div>
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
              Need a Website in {location.name}?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Get a free consultation and see how we can help your {location.name} business grow online.
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