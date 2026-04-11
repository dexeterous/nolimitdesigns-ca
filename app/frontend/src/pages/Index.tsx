import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const HERO_DASHBOARD = "https://mgx-backend-cdn.metadl.com/generate/images/1108746/2026-04-11/3ad3c162-0ed5-406a-b8c5-174d4713373f.png";
const MASCOT = "https://mgx-backend-cdn.metadl.com/generate/images/1108746/2026-04-11/438378d0-1e71-4a36-9cf6-dfbe1aebb81b.png";
const SERVICES_COLLAGE = "https://mgx-backend-cdn.metadl.com/generate/images/1108746/2026-04-11/a6e8d843-373a-41f7-befa-7c0c6859aea5.png";
const BLOG_IMG = "https://mgx-backend-cdn.metadl.com/generate/images/1108746/2026-04-11/6b8e5648-a814-440f-8b37-f20842ce0cb7.png";

const companyLogos = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/company1-DAcU80XmDqE7n4yHBPEPaJo2GqDasE.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/company2-8A2v3xWKAJxTVDgu2XhS84M1Jux4Bk.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/company3-Rdc1oIOSvNO9bMzxHC7qZMnEFMg8w9.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/company4-maSfugMfllJUwqzgNTuW4Rs2EhmL2R.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/company5-EmHeKOlL0aPHdxYXlhmxVsnGIbgWtk.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/company6-Psf7hxqmQZCFug3zEWEiF7bi1AQX47.png",
];

const benefits = [
  { icon: "ri-infinity-line", title: "Unlimited Design Requests", desc: "Submit as many design tasks as you want. Your team works through them one at a time." },
  { icon: "ri-team-line", title: "Dedicated Design Team", desc: "Work with experienced designers who understand your brand." },
  { icon: "ri-flashlight-line", title: "Fast Turnaround", desc: "Most design requests are delivered within 1–2 business days." },
  { icon: "ri-loop-left-line", title: "Unlimited Revisions", desc: "Refine designs until they meet your exact expectations." },
  { icon: "ri-line-chart-line", title: "Scalable Creative Production", desc: "Produce more marketing assets without increasing your team size." },
  { icon: "ri-award-line", title: "High-Quality Creative Work", desc: "Professional designs built to strengthen your brand." },
];

const pricingPlans = [
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
    cta: "Start Free Trial",
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
    cta: "Start Free Trial",
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
    cta: "Start Free Trial",
    highlighted: false,
    badge: "",
  },
];

const workflowSteps = [
  { icon: "ri-file-upload-line", num: "01", title: "Submit Your Design Requests", desc: "Add unlimited design tasks through your dashboard and prioritize them." },
  { icon: "ri-palette-line", num: "02", title: "Designers Start Creating", desc: "Your design team begins working on your highest priority request." },
  { icon: "ri-check-double-line", num: "03", title: "Review and Request Revisions", desc: "Provide feedback and request changes until the design is perfect." },
];

const designServices = [
  { title: "Graphic Design", items: ["Social media graphics", "Advertising creatives", "Website visuals", "Email graphics"], color: "bg-[#ff4f01]", icon: "ri-brush-line" },
  { title: "Brand Identity", items: ["Logo design", "Brand guidelines", "Brand assets"], color: "bg-[#7c3aed]", icon: "ri-fingerprint-line" },
  { title: "Presentations", items: ["Pitch decks", "Sales presentations"], color: "bg-[#0ea5e9]", icon: "ri-slideshow-line" },
  { title: "Video & Motion", items: ["Video editing", "Animated explainers", "Social media videos"], color: "bg-[#f43f5e]", icon: "ri-video-line" },
  { title: "Web & App Graphics", items: ["Landing page design", "UI assets", "Web visuals"], color: "bg-[#22c55e]", icon: "ri-layout-line" },
];

const managementFeatures = [
  { icon: "ri-flow-chart", title: "Structured Request Workflow", desc: "Organize and prioritize your creative projects." },
  { icon: "ri-dashboard-line", title: "Queue Management", desc: "Track all design requests in a single dashboard." },
  { icon: "ri-shield-check-line", title: "Brand Consistency", desc: "Designers follow your brand guidelines and style." },
  { icon: "ri-user-star-line", title: "Dedicated Creative Team", desc: "Work with designers familiar with your brand." },
  { icon: "ri-chat-3-line", title: "Direct Communication", desc: "Collaborate easily with your design team." },
  { icon: "ri-customer-service-2-line", title: "Reliable Support", desc: "Customer support whenever you need assistance." },
];

const testimonials = [
  { text: "NoLimit Designs completely transformed our marketing workflow. We now produce high-quality creative assets consistently without hiring additional designers.", author: "Sarah Chen", role: "Marketing Director" },
  { text: "The turnaround time and attention to detail have been outstanding.", author: "James Rivera", role: "Startup Founder" },
  { text: "Our team can focus on strategy while NoLimit Designs handles all creative work.", author: "Emily Park", role: "Brand Manager" },
];

const blogPosts = [
  { title: "How Subscription Design Services Work", excerpt: "Learn how unlimited design subscriptions can transform your creative workflow.", img: BLOG_IMG },
  { title: "Design Trends Businesses Should Follow", excerpt: "Stay ahead of the curve with the latest design trends for marketing.", img: SERVICES_COLLAGE },
  { title: "Scaling Marketing with Unlimited Design", excerpt: "Discover how businesses scale their creative production without growing their team.", img: BLOG_IMG },
];

const faqs = [
  { q: "What does unlimited design mean?", a: "Unlimited design means you can submit as many design requests as you want. Our team works through them one at a time, ensuring each design gets the attention it deserves. There's no cap on the number of requests you can make during your subscription." },
  { q: "How quickly are designs delivered?", a: "Most design requests are completed within 1-2 business days. More complex projects like brand identity packages or multi-page documents may take 3-4 business days. We always communicate timelines upfront." },
  { q: "How many design requests can I submit?", a: "There is no limit to the number of requests you can submit. You can add as many tasks to your queue as needed, and we'll work through them based on your priorities." },
  { q: "Can I pause my subscription?", a: "Yes! You can pause your subscription at any time and resume when you're ready. Your unused days will be saved and applied when you reactivate." },
  { q: "Who owns the design files?", a: "You own 100% of the design files we create for you. All source files, exports, and assets are yours to use however you need." },
  { q: "Is there a minimum commitment?", a: "No minimum commitment required. Our subscriptions are month-to-month, and you can cancel anytime without penalties or hidden fees." },
];

export default function Index() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  return (
    <div className="min-h-screen bg-[#fff6ec]">
      <SiteHeader />

      {/* SECTION 1 — HERO */}
      <section className="lg:pt-[180px] pt-[120px] pb-16 relative overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side */}
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 border border-[#bebebe] py-2 px-5 rounded-full text-sm font-medium mb-4">
                <i className="ri-refresh-line text-[#ff4f01]" />
                Subscription. Pause or cancel anytime
              </span>
              <h1 className="font-bricolage font-semibold xl:text-[72px] xl:leading-[80px] lg:text-[56px] lg:leading-[64px] md:text-[48px] md:leading-[56px] text-[38px] leading-[46px] text-[#101010] mb-6">
                Unlimited Graphic &amp; Video Design.{" "}
                <span className="text-[#ff4f01]">A Simple Monthly Subscription.</span>
              </h1>
              <p className="text-lg leading-7 text-[#101010]/80 mb-8 max-w-xl">
                NoLimit Designs gives businesses access to professional designers without the cost of hiring in-house or managing freelancers. Submit unlimited design requests and get consistent, high-quality creative work delivered quickly.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#pricing" className="btn btn-primary">
                  Start Your Subscription
                </a>
                <a href="#pricing" className="btn btn-dark">
                  See Pricing
                </a>
              </div>
              <p className="text-sm text-[rgb(119,119,125)] mt-4">
                Cancel anytime • No long-term contracts
              </p>
            </div>

            {/* Right side */}
            <div className="relative">
              <img
                src={HERO_DASHBOARD}
                alt="Design dashboard workflow"
                className="w-full rounded-2xl shadow-2xl"
              />
              
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — TRUSTED BY BUSINESSES */}
      <section className="py-12 bg-[#fff6ec]">
        <div className="container-custom">
          <h3 className="uppercase text-sm text-center tracking-[4px] mb-6 font-medium text-[rgb(119,119,125)]">
            Trusted by Businesses Across Multiple Industries
          </h3>
          <p className="text-center text-base text-[rgb(119,119,125)] mb-8 max-w-2xl mx-auto">
            Companies rely on NoLimit Designs to scale their creative production with consistent, professional designs.
          </p>
          <div className="logo-slider">
            <div className="logos-slide">
              {[...companyLogos, ...companyLogos].map((src, i) => (
                <img key={i} src={src} alt="company logo" className="max-w-[130px] h-auto mx-10 object-contain" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — BENEFITS GRID */}
      <section className="lg:py-24 py-16" id="about">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 border border-[#bebebe] py-2 px-5 rounded-full text-sm font-medium mb-3">
              <i className="ri-arrow-right-up-line text-[#ff4f01]" />
              Benefits
            </span>
            <h2 className="font-bricolage font-medium xl:text-[64px] xl:leading-[72px] md:text-[48px] md:leading-[56px] text-[36px] leading-[44px] text-[#101010]">
              Discover the Benefits of NoLimit Designs
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="text-center py-12 px-8 rounded-[15px] border border-[#bebebe] hover:border-[#ff4f01] transition-all duration-500 bg-white/50"
              >
                <i className={`${b.icon} text-[48px] text-[#ff4f01] mb-4 inline-block`} />
                <h4 className="text-2xl font-medium mb-3 font-bricolage">{b.title}</h4>
                <p className="text-base text-[rgb(119,119,125)] leading-7">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — PRICING */}
      <section id="pricing" className="lg:py-24 py-16">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 border border-[#bebebe] py-2 px-5 rounded-full text-sm font-medium mb-3">
              <i className="ri-arrow-right-up-line text-[#ff4f01]" />
              Pricing
            </span>
            <h2 className="font-bricolage font-medium xl:text-[64px] xl:leading-[72px] md:text-[48px] md:leading-[56px] text-[36px] leading-[44px] text-[#101010]">
              Design Without Limits
            </h2>
            <p className="text-lg text-[rgb(119,119,125)] mt-3">
              Choose the subscription that fits your creative needs.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
            {pricingPlans.map((plan, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl border-2 relative flex flex-col ${
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
                <div className="p-6 flex flex-col flex-1">
                  <ul className="flex flex-col gap-2.5 flex-1">
                    {plan.features.map((f, j) => (
                      <li key={j} className="text-[rgb(119,119,125)] text-sm flex items-start gap-2">
                        <i className="ri-check-line text-[#ff4f01] mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <a href="#" className="btn btn-primary w-full text-center block">
                      {plan.cta}
                    </a>
                    <p className="text-center text-xs text-[rgb(119,119,125)] mt-2">
                      All prices in CAD. Cancel anytime.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — HOW THE SUBSCRIPTION WORKS */}
      <section id="how-it-works" className="lg:py-24 py-16">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 border border-[#bebebe] py-2 px-5 rounded-full text-sm font-medium mb-3">
              <i className="ri-arrow-right-up-line text-[#ff4f01]" />
              How It Works
            </span>
            <h2 className="font-bricolage font-medium xl:text-[64px] xl:leading-[72px] md:text-[48px] md:leading-[56px] text-[36px] leading-[44px] text-[#101010]">
              A Design Workflow Built for Speed
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {workflowSteps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center px-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center border border-[rgba(0,0,0,.08)] relative mb-6">
                  <i className={`${step.icon} text-[28px]`} />
                  <div className="absolute -right-2 -top-2 bg-[#ff4f01] flex justify-center items-center text-white w-7 h-7 rounded-full text-sm font-medium">
                    {step.num}
                  </div>
                </div>
                <h3 className="text-[28px] leading-[34px] font-bold font-bricolage mb-4">{step.title}</h3>
                <p className="text-lg text-[rgb(119,119,125)] leading-7">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { num: "1,000+", label: "Designs delivered monthly" },
              { num: "24h", label: "Average turnaround" },
              { num: "50+", label: "Global clients" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-[40px] font-bold font-bricolage text-[#ff4f01]">{stat.num}</p>
                <p className="text-sm text-[rgb(119,119,125)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — DESIGN SERVICES GRID */}
      <section id="services" className="lg:py-24 py-16">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 border border-[#bebebe] py-2 px-5 rounded-full text-sm font-medium mb-3">
              <i className="ri-arrow-right-up-line text-[#ff4f01]" />
              Services
            </span>
            <h2 className="font-bricolage font-medium xl:text-[64px] xl:leading-[72px] md:text-[48px] md:leading-[56px] text-[36px] leading-[44px] text-[#101010]">
              Unlock Unlimited Creative Possibilities
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {designServices.map((svc, i) => (
              <div
                key={i}
                className={`${svc.color} rounded-2xl p-8 text-white relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300`}
              >
                <i className={`${svc.icon} text-[48px] mb-4 inline-block opacity-90`} />
                <h4 className="text-2xl font-bold font-bricolage mb-4">{svc.title}</h4>
                <ul className="space-y-2">
                  {svc.items.map((item, j) => (
                    <li key={j} className="text-white/90 text-base flex items-center gap-2">
                      <i className="ri-arrow-right-s-line" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-white/10" />
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a href="#services" className="btn btn-primary">
              Explore All Services
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 7 — CREATIVE MANAGEMENT FEATURES */}
      <section className="lg:py-24 py-16">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 border border-[#bebebe] py-2 px-5 rounded-full text-sm font-medium mb-3">
              <i className="ri-arrow-right-up-line text-[#ff4f01]" />
              Features
            </span>
            <h2 className="font-bricolage font-medium xl:text-[64px] xl:leading-[72px] md:text-[48px] md:leading-[56px] text-[36px] leading-[44px] text-[#101010]">
              Effortless Design Management
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {managementFeatures.map((feat, i) => (
              <div
                key={i}
                className="text-center py-12 px-8 rounded-[15px] border border-[#bebebe] hover:border-[#ff4f01] transition-all duration-500 bg-white/50"
              >
                <i className={`${feat.icon} text-[48px] text-[#ff4f01] mb-4 inline-block`} />
                <h4 className="text-xl font-medium mb-3 font-bricolage">{feat.title}</h4>
                <p className="text-base text-[rgb(119,119,125)] leading-7">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 — GLOBAL TRUST SECTION */}
      <section className="py-20 bg-gradient-to-br from-[#070707] to-[#1f1f1f] relative overflow-hidden" id="portfolio">
        <div className="container-custom relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-bricolage font-medium xl:text-[64px] xl:leading-[72px] md:text-[48px] md:leading-[56px] text-[36px] leading-[44px] text-white">
              Trusted by Brands Worldwide
            </h2>
          </div>

          <div className="bg-gradient-to-r from-[#ff4f01] to-[#ff8c42] rounded-2xl p-10 text-center mb-12 max-w-3xl mx-auto">
            <p className="text-[64px] font-bold font-bricolage text-white leading-tight">5,000+</p>
            <p className="text-xl text-white/90">Designs Delivered</p>
          </div>

          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            {[
              { platform: "Google", rating: "4.7 Rated", icon: "ri-google-fill" },
              { platform: "Trustpilot", rating: "4.9 Rated", icon: "ri-star-fill" },
              { platform: "Clutch", rating: "4.9 Rated", icon: "ri-award-fill" },
            ].map((badge, i) => (
              <div key={i} className="text-center bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <i className={`${badge.icon} text-3xl text-[#ff4f01] mb-2 inline-block`} />
                <p className="text-white font-semibold">{badge.platform}</p>
                <p className="text-[#ff4f01] font-bold text-lg">{badge.rating}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff4f01]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ff4f01]/5 rounded-full blur-3xl" />
      </section>

      {/* SECTION 9 — TESTIMONIALS */}
      <section className="lg:py-24 py-16">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 border border-[#bebebe] py-2 px-5 rounded-full text-sm font-medium mb-3">
              <i className="ri-arrow-right-up-line text-[#ff4f01]" />
              Testimonials
            </span>
            <h2 className="font-bricolage font-medium xl:text-[64px] xl:leading-[72px] md:text-[48px] md:leading-[56px] text-[36px] leading-[44px] text-[#101010]">
              What Our Clients Say
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`px-10 py-12 border-2 border-[#ff4f01] rounded-2xl text-center ${
                  i === currentTestimonial ? "block" : "hidden"
                }`}
              >
                <p className="text-2xl lg:text-3xl leading-10 italic font-bricolage text-[#101010] mb-8">
                  "{t.text}"
                </p>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-[#ff4f01] flex items-center justify-center text-white text-xl font-bold mb-2">
                    {t.author[0]}
                  </div>
                  <h5 className="text-xl font-medium font-bricolage">{t.author}</h5>
                  <span className="text-sm text-[rgb(119,119,125)]">{t.role}</span>
                </div>
              </div>
            ))}

            <div className="flex justify-center gap-2 mt-8">
              <button
                onClick={() =>
                  setCurrentTestimonial(
                    currentTestimonial === 0 ? testimonials.length - 1 : currentTestimonial - 1
                  )
                }
                className="w-10 h-10 bg-[#ff4f01] inline-flex justify-center items-center rounded-full text-white border-2 border-[#ff4f01] hover:bg-transparent hover:text-[#ff4f01] transition-all duration-500 cursor-pointer"
              >
                <i className="ri-arrow-left-s-line" />
              </button>
              <button
                onClick={() =>
                  setCurrentTestimonial(
                    currentTestimonial === testimonials.length - 1 ? 0 : currentTestimonial + 1
                  )
                }
                className="w-10 h-10 bg-[#ff4f01] inline-flex justify-center items-center rounded-full text-white border-2 border-[#ff4f01] hover:bg-transparent hover:text-[#ff4f01] transition-all duration-500 cursor-pointer"
              >
                <i className="ri-arrow-right-s-line" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10 — BLOG PREVIEW */}
      <section className="lg:py-24 py-16" id="blog">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 border border-[#bebebe] py-2 px-5 rounded-full text-sm font-medium mb-3">
              <i className="ri-arrow-right-up-line text-[#ff4f01]" />
              Blog
            </span>
            <h2 className="font-bricolage font-medium xl:text-[64px] xl:leading-[72px] md:text-[48px] md:leading-[56px] text-[36px] leading-[44px] text-[#101010]">
              Design Tips &amp; Marketing Insights
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {blogPosts.map((post, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden border border-[#bebebe] hover:border-[#ff4f01] transition-all duration-500 bg-white/50 group"
              >
                <div className="overflow-hidden">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-medium font-bricolage mb-2 group-hover:text-[#ff4f01] transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-[rgb(119,119,125)] text-base">{post.excerpt}</p>
                  <a href="#" className="inline-flex items-center gap-1 text-[#ff4f01] font-medium mt-4 hover:gap-2 transition-all">
                    Read More <i className="ri-arrow-right-line" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a href="#blog" className="btn btn-outline">
              Visit the Blog
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 11 — FAQ */}
      <section id="faqs" className="lg:py-24 py-16">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 border border-[#bebebe] py-2 px-5 rounded-full text-sm font-medium mb-3">
              <i className="ri-arrow-right-up-line text-[#ff4f01]" />
              FAQs
            </span>
            <h2 className="font-bricolage font-medium xl:text-[64px] xl:leading-[72px] md:text-[48px] md:leading-[56px] text-[36px] leading-[44px] text-[#101010]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid lg:grid-cols-[33%_auto] md:grid-cols-2 gap-8">
            {/* Left side - CTA card */}
            <div className="p-10 rounded-2xl bg-[#070707] text-center flex flex-col items-center justify-center">
              <img
                src="https://mgx-backend-cdn.metadl.com/mgx-backend-1300249583/production/s0rj2/2a90607c42ad49da8bce1e3c3e8e412c/b6c8df64196840c08001b85a5ef4a6bc.png"
                alt="mascot"
                className="w-32 h-32 object-contain mx-auto mb-4"
              />
              <h3 className="text-white text-3xl lg:text-[36px] leading-tight font-bricolage mb-4">
                Still have questions?
              </h3>
              <a href="#contact" className="btn btn-primary">
                Book a Call <i className="ri-video-chat-line" />
              </a>
              <p className="text-white/70 mt-3 text-sm">
                Prefer to email?{" "}
                <a href="mailto:hello@nolimitdesigns.com" className="text-[#ff4f01]">
                  hello@nolimitdesigns.com
                </a>
              </p>
            </div>

            {/* Right side - Accordion */}
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

      {/* SECTION 12 — FINAL CTA */}
      <section id="contact" className="lg:py-24 py-16">
        <div className="container-custom">
          <div className="relative bg-gradient-to-br from-[#070707] to-[#1f1f1f] rounded-3xl p-12 lg:p-20 text-center overflow-hidden">
            <div className="relative z-10">
              <h2 className="font-bricolage font-semibold xl:text-[64px] xl:leading-[72px] md:text-[48px] md:leading-[56px] text-[36px] leading-[44px] text-white mb-6">
                Your Creative Team Is Ready
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                Start producing high-quality graphics and videos without hiring in-house designers.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="#pricing" className="btn btn-primary">
                  Start Your Subscription
                </a>
                <a
                  href="#pricing"
                  className="btn border-2 border-white text-white hover:bg-white hover:text-[#070707] transition-all"
                >
                  View Pricing
                </a>
              </div>
            </div>
            
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#ff4f01]/10 rounded-full blur-3xl" />
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}