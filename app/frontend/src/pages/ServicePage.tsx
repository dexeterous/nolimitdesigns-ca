import { useParams, Link } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { services } from "@/data/siteData";

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen bg-[#fff6ec]">
        <SiteHeader />
        <div className="pt-[160px] pb-20 text-center container-custom">
          <h1 className="font-bricolage text-4xl font-bold mb-4">Service Not Found</h1>
          <p className="text-[rgb(119,119,125)] mb-8">The service page you&apos;re looking for doesn&apos;t exist.</p>
          <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const otherServices = services.filter((s) => s.slug !== slug);

  return (
    <div className="min-h-screen bg-[#fff6ec]">
      <SiteHeader />

      {/* Hero */}
      <section className="pt-[160px] pb-16 relative overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 border border-[#bebebe] py-2 px-5 rounded-full text-sm font-medium mb-4">
                <i className={`${service.icon} text-[#ff4f01]`} />
                {service.name}
              </span>
              <h1 className="font-bricolage font-semibold xl:text-[56px] xl:leading-[64px] lg:text-[48px] lg:leading-[56px] text-[36px] leading-[44px] text-[#101010] mb-6">
                {service.tagline}
              </h1>
              <p className="text-lg leading-7 text-[#101010]/80 mb-8 max-w-xl">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/contact" className="btn btn-primary">
                  Get Started Today
                </Link>
                <a href="#features" className="btn btn-dark">
                  See What&apos;s Included
                </a>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#ff4f01]/10 to-[#ff8c42]/10 rounded-3xl p-10 text-center">
              <i className={`${service.icon} text-[120px] text-[#ff4f01]/30 inline-block`} />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gradient-to-br from-[#070707] to-[#1f1f1f]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
            {service.benefits.map((benefit, i) => (
              <div key={i} className="text-center p-6">
                <div className="w-12 h-12 rounded-full bg-[#ff4f01] flex items-center justify-center mx-auto mb-4">
                  <i className="ri-check-line text-white text-xl" />
                </div>
                <p className="text-white font-medium">{benefit}</p>
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
              What&apos;s Included
            </h2>
            <p className="text-lg text-[rgb(119,119,125)] mt-4">
              Everything you need for a successful {service.name.toLowerCase()} project.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {service.features.map((feature, i) => (
              <div
                key={i}
                className="p-8 rounded-xl border border-[#bebebe] hover:border-[#ff4f01] transition-all bg-white/50 hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-lg bg-[#ff4f01]/10 flex items-center justify-center mb-4">
                  <i className="ri-check-double-line text-[#ff4f01] text-2xl" />
                </div>
                <h4 className="text-xl font-medium font-bricolage">{feature}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="lg:py-24 py-16 bg-[#fafafa]">
        <div className="container-custom">
          <h2 className="font-bricolage font-medium text-3xl lg:text-4xl text-center mb-12">
            Our {service.name} Process
          </h2>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              { num: "01", title: "Consultation", desc: "We discuss your goals and requirements" },
              { num: "02", title: "Strategy", desc: "We create a custom plan for your project" },
              { num: "03", title: "Execution", desc: "Our team builds and tests everything" },
              { num: "04", title: "Launch", desc: "We deploy and provide ongoing support" },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 rounded-full bg-[#ff4f01] flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                  {step.num}
                </div>
                <h4 className="font-bricolage font-medium text-lg mb-2">{step.title}</h4>
                <p className="text-sm text-[rgb(119,119,125)]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="lg:py-24 py-16">
        <div className="container-custom">
          <h2 className="font-bricolage font-medium text-3xl text-center mb-12">
            Other Services
          </h2>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {otherServices.map((svc, i) => (
              <Link
                key={i}
                to={`/services/${svc.slug}`}
                className="group flex items-center gap-4 p-6 rounded-xl border border-[#bebebe] hover:border-[#ff4f01] transition-all bg-white/50"
              >
                <i className={`${svc.icon} text-3xl text-[#ff4f01]`} />
                <div>
                  <h4 className="font-medium font-bricolage group-hover:text-[#ff4f01] transition-colors">{svc.name}</h4>
                  <p className="text-sm text-[rgb(119,119,125)]">{svc.tagline}</p>
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
              Ready to Get Started with {service.name}?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Contact us today for a free consultation and custom quote.
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