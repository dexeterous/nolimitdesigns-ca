import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const HERO_IMG = "https://mgx-backend-cdn.metadl.com/generate/images/1108746/2026-04-11/060a7321-acbb-4a5e-ab6e-61fe40c64740.png";

const companyLogos = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/company1-DAcU80XmDqE7n4yHBPEPaJo2GqDasE.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/company2-8A2v3xWKAJxTVDgu2XhS84M1Jux4Bk.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/company3-Rdc1oIOSvNO9bMzxHC7qZMnEFMg8w9.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/company4-maSfugMfllJUwqzgNTuW4Rs2EhmL2R.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/company5-EmHeKOlL0aPHdxYXlhmxVsnGIbgWtk.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/company6-Psf7hxqmQZCFug3zEWEiF7bi1AQX47.png",
];

const plans = [
  {
    name: "Nolimit Graphics",
    price: "CAD 1,040",
    originalPrice: "CAD 2,080",
    promo: "Save CAD 1,040 per month for the first 4 months",
    desc: "Unlimited graphic design for marketing materials, branding assets, and digital campaigns.",
    features: [
      "Unlimited Requests",
      "Unlimited Revisions",
      "Unlimited Brands",
      "No Contract Required",
      "24 Hour Turnaround",
      "3 Active Requests",
      "Unlimited Team Members",
      "Dedicated Design Team",
      "Dedicated Project Manager",
      "Free Premium Stock Images",
      "Source Files Included",
      "Print & Digital Designs",
      "Custom Illustrations",
      "Basic GIF Creation",
      "Landing Page Designs",
      "Website, App & UI Designs",
      "Canva Design Support",
      "Nolimit360 Design Management",
    ],
    highlighted: false,
    badge: "",
  },
  {
    name: "Nolimit Graphics + Video",
    price: "CAD 1,263.50",
    originalPrice: "CAD 2,527",
    promo: "Save CAD 1,263 per month for the first 4 months",
    desc: "Unlimited graphic design plus unlimited video design for one flat monthly price.",
    features: [
      "Unlimited Requests",
      "Unlimited Revisions",
      "Unlimited Brands",
      "No Contract",
      "24 Hour Turnaround",
      "5 Active Requests",
      "Unlimited Team Members",
      "Dedicated Graphic + Video Design Team",
      "Dedicated Project Manager",
      "Free Stock Images, Videos & Audio",
      "Source Files Included",
      "Print & Digital Designs",
      "Custom Illustrations & GIFs",
      "Website, App & UI Designs",
      "Canva Design Support",
      "Nolimit360 Design Management",
    ],
    highlighted: true,
    badge: "Best Value",
  },
  {
    name: "Nolimit Video",
    price: "CAD 1,040",
    originalPrice: "CAD 2,080",
    promo: "Save CAD 1,040 per month for the first 4 months",
    desc: "Unlimited video editing, animation, and motion graphics for your marketing content.",
    features: [
      "Unlimited Requests",
      "Unlimited Revisions",
      "Unlimited Brands",
      "No Contract",
      "24 Hour Turnaround",
      "2 Active Requests",
      "Unlimited Team Members",
      "Dedicated Video Design Team",
      "Dedicated Project Manager",
      "Free Stock Images, Videos & Audio",
      "Source Files Included",
      "Video Editing",
      "Motion Graphics",
      "Animation",
      "GIF Creation",
      "Template Customization",
      "UI/UX Animations",
      "Nolimit360 Design Management",
    ],
    highlighted: false,
    badge: "",
  },
];

const graphicsDesignTypes = [
  "Amazon Graphics", "Advanced Infographics", "App Designs", "Background Removal",
  "Billboards", "Blog Images", "Book Covers", "Book Layouts",
  "Brochures", "Business Cards", "Corporate Reports", "Custom Illustrations",
  "Display Ads", "Ecommerce Graphics", "Email Marketing Graphics", "Event Invitations",
  "Flyers & Posters", "Icons", "Landing Pages", "Logos",
  "Packaging Designs", "Podcast Covers", "Presentation Decks", "Product Mockups",
  "Promotional Materials", "Social Media Posts & Ads", "Stationery Sets", "Tradeshow Banners",
  "UI Designs", "Website Designs", "Web Ads",
];

const videoDesignTypes = [
  "Adding Thumbnails", "Animating Static Designs", "Basic & Advanced GIFs", "Cinemagraphs",
  "Combining & Editing Raw Footage", "Company Culture Videos", "Demo Videos", "Educational Videos",
  "Explainer Videos", "Logo Animations", "Motion Graphics", "Product Videos",
  "Promo Videos", "Short-Form Social Videos", "Social Media Ads", "Testimonial Videos",
  "UI/UX Animations", "Video Template Customization",
];

const perks = [
  { icon: "ri-infinity-line", title: "Unlimited Design Requests", desc: "Submit as many design tasks as you want with no limits." },
  { icon: "ri-team-line", title: "Dedicated Creative Team", desc: "Work with experienced designers who understand your brand." },
  { icon: "ri-flashlight-line", title: "Fast 24 Hour Turnaround", desc: "Most design requests are completed within 24 hours." },
  { icon: "ri-group-line", title: "Unlimited Team Collaboration", desc: "Invite your entire team to submit and manage requests." },
  { icon: "ri-shield-check-line", title: "Full Ownership of All Designs", desc: "All completed designs and source files belong to you." },
  { icon: "ri-grid-line", title: "100+ Design Categories", desc: "From social media to branding, we handle a wide range of design needs." },
  { icon: "ri-image-line", title: "Premium Stock Assets Included", desc: "High-quality stock images, videos, and audio included." },
  { icon: "ri-customer-service-2-line", title: "24/7 Support", desc: "Our support team is available whenever you need assistance." },
  { icon: "ri-award-line", title: "Top-Tier Designers", desc: "Experienced professionals specializing in digital and marketing design." },
];

const faqs = [
  { q: "Are there hidden fees?", a: "No. Our pricing is transparent and straightforward. The price you see is the price you pay. There are no setup fees, hidden charges, or surprise costs." },
  { q: "Which payment methods are accepted?", a: "We accept all major credit cards including Visa, Mastercard, and American Express. We also support payments through Stripe for secure transactions." },
  { q: "Am I locked into a contract?", a: "No. All our subscriptions are month-to-month with no long-term contracts. You can cancel or pause your subscription at any time without penalties." },
  { q: "Can I cancel anytime?", a: "Yes! You can cancel your subscription at any time. There are no cancellation fees or penalties. Your subscription will remain active until the end of your current billing period." },
  { q: "How many requests can I submit?", a: "There is no limit to the number of requests you can submit. You can add as many tasks to your queue as needed, and we'll work through them based on your priorities." },
  { q: "How long does each design take?", a: "Most simple design requests are completed within 24 hours. More complex projects may take 2-4 business days. We always communicate timelines upfront so you know what to expect." },
  { q: "Can I pause my subscription?", a: "Yes! You can pause your subscription at any time and resume when you're ready. Your unused days will be saved and applied when you reactivate." },
  { q: "Can agencies use Nolimit for client work?", a: "Absolutely! Many agencies use Nolimit Designs to scale their creative output for client projects. You can submit requests for unlimited brands under a single subscription." },
];

export default function Pricing() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"graphics" | "videos">("graphics");
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-[#fff6ec]">
      <SiteHeader />

      {/* HERO SECTION */}
      <section className="lg:pt-[180px] pt-[120px] pb-16 relative overflow-hidden bg-gradient-to-r from-[#ff4f01] to-[#ff8c42]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative z-10">
              <h1 className="font-bricolage font-semibold xl:text-[64px] xl:leading-[72px] lg:text-[52px] lg:leading-[60px] md:text-[44px] md:leading-[52px] text-[34px] leading-[42px] text-white mb-6">
                Unlimited Design. Simple Pricing.
              </h1>
              <p className="text-lg leading-7 text-white/80 mb-8 max-w-xl">
                Budgeting for design shouldn't be complicated. Nolimit Designs offers transparent flat-rate pricing so you can submit unlimited graphic and video design requests handled by your dedicated creative team.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#pricing-cards" className="btn bg-[#070707] text-white border-2 border-[#070707] hover:bg-white hover:text-[#070707] transition-all">
                  View Pricing
                </a>
                <a href="#book-demo" className="btn border-2 border-white text-white hover:bg-white hover:text-[#070707] transition-all">
                  Book a Demo
                </a>
              </div>
            </div>
            <div className="relative">
              <img
                src={HERO_IMG}
                alt="Pricing and plans"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff4f01]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ff4f01]/10 rounded-full blur-3xl" />
      </section>

      {/* PROMO BANNER */}
      <section className="py-8 bg-[#fff6ec]">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-[#ff4f01] to-[#ff8c42] rounded-2xl py-6 px-8 text-center">
            <p className="text-white/80 text-sm font-medium uppercase tracking-widest mb-1">Limited Time Offer</p>
            <p className="text-white text-2xl lg:text-3xl font-bricolage font-semibold">
              Save 50% on your first 4 months
            </p>
          </div>
        </div>
      </section>

      {/* PRICING CARDS */}
      <section id="pricing-cards" className="lg:py-24 py-16">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 border border-[#bebebe] py-2 px-5 rounded-full text-sm font-medium mb-3">
              <i className="ri-arrow-right-up-line text-[#ff4f01]" />
              Pricing
            </span>
            <h2 className="font-bricolage font-medium xl:text-[56px] xl:leading-[64px] md:text-[42px] md:leading-[50px] text-[32px] leading-[40px] text-[#101010]">
              Choose Your Plan
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-start">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl border-2 relative ${
                  plan.highlighted
                    ? "border-[#ff4f01] bg-white shadow-xl lg:scale-[1.03]"
                    : "border-[#bebebe] bg-white/50"
                } transition-all duration-300`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ff4f01] text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                    {plan.badge}
                  </div>
                )}
                <div className="p-6 border-b border-[#bebebe]">
                  <span
                    className={`inline-block px-5 py-2 rounded-full font-medium text-sm ${
                      plan.highlighted ? "bg-[#ff4f01] text-white" : "bg-[#000000] text-white"
                    }`}
                  >
                    {plan.name}
                  </span>
                  <div className="mt-4">
                    <p className="text-[36px] font-medium font-bricolage text-[#ff4f01]">
                      {plan.price}
                      <span className="text-base text-[rgb(119,119,125)] font-normal"> / month</span>
                    </p>
                    <p className="text-sm text-[rgb(119,119,125)] line-through mt-1">
                      {plan.originalPrice} / month
                    </p>
                    <p className="text-xs text-[#ff4f01] font-medium mt-1">{plan.promo}</p>
                  </div>
                  <p className="text-sm text-[rgb(119,119,125)] mt-3 leading-6">{plan.desc}</p>
                </div>
                <div className="p-6">
                  <ul className="flex flex-col gap-2.5 mb-6">
                    {plan.features.map((f, j) => (
                      <li key={j} className="text-[rgb(119,119,125)] text-sm flex items-start gap-2">
                        <i className="ri-check-line text-[#ff4f01] mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="#" className="btn btn-primary w-full text-center block">
                    Start Free Trial
                  </a>
                  <p className="text-center text-xs text-[rgb(119,119,125)] mt-2">
                    All prices in CAD. Cancel anytime.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENTERPRISE + CANVA CTA */}
      <section className="lg:py-16 py-10">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Enterprise */}
            <div className="bg-white rounded-2xl p-8 lg:p-10 border border-[#bebebe] hover:border-[#ff4f01] transition-all duration-300">
              <h3 className="font-bricolage font-medium text-2xl lg:text-3xl text-[#101010] mb-4">
                Need an Enterprise Design Solution?
              </h3>
              <p className="text-[rgb(119,119,125)] leading-7 mb-6">
                If your company needs a customized design workflow or high-volume creative production, Nolimit can build a tailored solution for your organization.
              </p>
              <a href="#book-demo" className="btn btn-dark">
                Book a Call
              </a>
            </div>
            {/* Canva */}
            <div className="bg-white rounded-2xl p-8 lg:p-10 border border-[#bebebe] hover:border-[#ff4f01] transition-all duration-300">
              <h3 className="font-bricolage font-medium text-2xl lg:text-3xl text-[#101010] mb-4">
                Need Custom Canva Designs?
              </h3>
              <p className="text-[rgb(119,119,125)] leading-7 mb-6">
                We offer unlimited design subscriptions specifically for Canva graphics and Canva video templates so your team can easily edit and reuse designs.
              </p>
              <a href="#" className="btn btn-primary">
                View Canva Pricing
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* DESIGN TYPES TABS */}
      <section className="lg:py-24 py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 border border-[#bebebe] py-2 px-5 rounded-full text-sm font-medium mb-3">
              <i className="ri-arrow-right-up-line text-[#ff4f01]" />
              What We Create
            </span>
            <h2 className="font-bricolage font-medium xl:text-[56px] xl:leading-[64px] md:text-[42px] md:leading-[50px] text-[32px] leading-[40px] text-[#101010] mb-4">
              Create Unlimited Graphic or Video Design
            </h2>
            <p className="text-lg text-[rgb(119,119,125)] max-w-3xl mx-auto">
              {activeTab === "graphics"
                ? "Our designers can help with nearly every type of graphic design your business needs."
                : "Our video team helps you create engaging visual content for marketing, social media, and digital campaigns."}
            </p>
          </div>

          {/* Tab Toggle */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-[#1a1a1a] rounded-full p-1">
              <button
                onClick={() => setActiveTab("graphics")}
                className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeTab === "graphics"
                    ? "bg-[#ff4f01] text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                Graphics
              </button>
              <button
                onClick={() => setActiveTab("videos")}
                className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeTab === "videos"
                    ? "bg-[#ff4f01] text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                Videos
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-5xl mx-auto">
            {activeTab === "graphics" ? (
              <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-x-6 gap-y-3">
                {graphicsDesignTypes.map((type, i) => (
                  <div key={i} className="flex items-center gap-2 py-2">
                    <i className="ri-check-line text-[#ff4f01] shrink-0" />
                    <span className="text-[#101010] text-[15px]">{type}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-x-6 gap-y-3">
                {videoDesignTypes.map((type, i) => (
                  <div key={i} className="flex items-center gap-2 py-2">
                    <i className="ri-check-line text-[#ff4f01] shrink-0" />
                    <span className="text-[#101010] text-[15px]">{type}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <p className="text-center text-[rgb(119,119,125)] italic mt-8">
            And just about anything that can be designed in PS, AI, or AE.
          </p>

          <div className="text-center mt-6">
            <a href="/graphic-design-services" className="btn btn-primary">
              View All Design Samples
            </a>
          </div>
        </div>
      </section>

      {/* SCALING SECTION */}
      <section className="lg:py-20 py-12">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-[#ff4f01] to-[#ff8c42] rounded-3xl p-12 lg:p-20 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="font-bricolage font-semibold xl:text-[56px] xl:leading-[64px] md:text-[42px] md:leading-[50px] text-[32px] leading-[40px] text-white mb-4">
                Have a High Volume of Design Work?
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Agencies and growing companies often manage multiple brands and campaigns. Nolimit makes scaling easy by allowing you to add additional subscriptions whenever you need more creative output.
              </p>
              <a href="#book-demo" className="btn bg-white text-[#ff4f01] border-2 border-white hover:bg-transparent hover:text-white transition-all">
                Contact Us
              </a>
            </div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full bg-white/10" />
            <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-white/10" />
          </div>
        </div>
      </section>

      {/* NOLIMIT PERKS */}
      <section className="lg:py-24 py-16">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 border border-[#bebebe] py-2 px-5 rounded-full text-sm font-medium mb-3">
              <i className="ri-arrow-right-up-line text-[#ff4f01]" />
              Perks
            </span>
            <h2 className="font-bricolage font-medium xl:text-[56px] xl:leading-[64px] md:text-[42px] md:leading-[50px] text-[32px] leading-[40px] text-[#101010] mb-4">
              Nolimit Perks
            </h2>
            <p className="text-lg text-[rgb(119,119,125)] max-w-3xl mx-auto">
              Get your own design team that's a fraction of the cost.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {perks.map((perk, i) => (
              <div
                key={i}
                className="text-center py-10 px-6 rounded-[15px] border border-[#bebebe] hover:border-[#ff4f01] transition-all duration-500 bg-white/50"
              >
                <i className={`${perk.icon} text-[40px] text-[#ff4f01] mb-3 inline-block`} />
                <h4 className="text-xl font-medium mb-2 font-bricolage">{perk.title}</h4>
                <p className="text-base text-[rgb(119,119,125)] leading-7">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="lg:py-24 py-16">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 border border-[#bebebe] py-2 px-5 rounded-full text-sm font-medium mb-3">
              <i className="ri-arrow-right-up-line text-[#ff4f01]" />
              FAQs
            </span>
            <h2 className="font-bricolage font-medium xl:text-[56px] xl:leading-[64px] md:text-[42px] md:leading-[50px] text-[32px] leading-[40px] text-[#101010]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col gap-4">
              {faqs.map((faq, i) => (
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

      {/* SOCIAL PROOF */}
      <section className="py-16 bg-[#fff6ec]">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="font-bricolage font-medium xl:text-[48px] xl:leading-[56px] md:text-[36px] md:leading-[44px] text-[28px] leading-[36px] text-[#101010] mb-4">
              Trusted by Businesses Worldwide
            </h2>
          </div>
          <div className="logo-slider">
            <div className="logos-slide">
              {[...companyLogos, ...companyLogos].map((src, i) => (
                <img key={i} src={src} alt="company logo" className="max-w-[130px] h-auto mx-10 object-contain" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="book-demo" className="lg:py-24 py-16">
        <div className="container-custom">
          <div className="relative bg-gradient-to-br from-[#070707] to-[#1f1f1f] rounded-3xl p-12 lg:p-20 text-center overflow-hidden">
            <div className="relative z-10">
              <h2 className="font-bricolage font-semibold xl:text-[56px] xl:leading-[64px] md:text-[42px] md:leading-[50px] text-[32px] leading-[40px] text-white mb-4">
                Design Without Limits
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                Join startups, agencies, and growing companies using Nolimit Designs to scale their creative production.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full sm:flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-[#ff4f01] transition-colors"
                />
                <a href="#" className="btn btn-primary !mb-0 whitespace-nowrap">
                  Start Free Trial
                </a>
              </div>
            </div>
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#ff4f01]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#ff4f01]/10 rounded-full blur-3xl" />
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}