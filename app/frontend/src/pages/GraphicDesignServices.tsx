import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const HERO_IMG = "https://mgx-backend-cdn.metadl.com/generate/images/1108746/2026-04-11/40e482ef-7717-4d0b-911a-660fc20ef438.png";
const TEAM_IMG = "https://mgx-backend-cdn.metadl.com/generate/images/1108746/2026-04-11/beed5089-eb01-4da3-818e-58ffe831f8a5.png";
const SUPPORT_IMG = "https://mgx-backend-cdn.metadl.com/generate/images/1108746/2026-04-11/c8117a30-8380-427a-91df-7e05264d3b82.png";
const BUSINESSES_IMG = "https://mgx-backend-cdn.metadl.com/generate/images/1108746/2026-04-11/e78352a7-ca2a-4ff1-8ddf-32199f45a21f.png";

const companyLogos = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/company1-DAcU80XmDqE7n4yHBPEPaJo2GqDasE.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/company2-8A2v3xWKAJxTVDgu2XhS84M1Jux4Bk.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/company3-Rdc1oIOSvNO9bMzxHC7qZMnEFMg8w9.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/company4-maSfugMfllJUwqzgNTuW4Rs2EhmL2R.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/company5-EmHeKOlL0aPHdxYXlhmxVsnGIbgWtk.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/company6-Psf7hxqmQZCFug3zEWEiF7bi1AQX47.png",
];

const featureCards = [
  {
    icon: "ri-team-line",
    title: "Dedicated Design Team",
    desc: "We assign a creative team that learns your brand and design preferences so every project stays consistent.",
  },
  {
    icon: "ri-group-line",
    title: "Collaborate With Your Team",
    desc: "Invite your colleagues or clients to submit requests and manage projects together.",
  },
  {
    icon: "ri-time-line",
    title: "Designs When You Need Them",
    desc: "Submit requests anytime and receive completed designs quickly.",
  },
];

const perks = [
  { icon: "ri-infinity-line", title: "Unlimited Design Requests", desc: "Submit as many design tasks as you want." },
  { icon: "ri-loop-left-line", title: "Unlimited Revisions", desc: "Refine designs until everything looks exactly right." },
  { icon: "ri-flashlight-line", title: "Fast Turnaround", desc: "Most simple tasks are delivered within 24–48 hours." },
  { icon: "ri-group-line", title: "Collaborative Workspace", desc: "Invite unlimited team members to submit and manage design requests." },
  { icon: "ri-shield-check-line", title: "You Own Your Designs", desc: "All completed designs and source files belong to you." },
  { icon: "ri-grid-line", title: "100+ Design Categories", desc: "From social media graphics to branding, our designers handle a wide range of design needs." },
  { icon: "ri-image-line", title: "Premium Stock Assets", desc: "We source high-quality stock assets when needed for your projects." },
  { icon: "ri-customer-service-2-line", title: "Dedicated Support", desc: "Our support team is available to assist you whenever needed." },
  { icon: "ri-award-line", title: "Top-Tier Designers", desc: "Experienced professionals specializing in digital and marketing design." },
];

const designTypes = [
  "Amazon graphics", "App graphics", "Infographics", "Background removal",
  "GIF graphics", "Billboards", "Blog images", "Book covers",
  "Book layouts", "Brochures", "Business cards", "Business reports",
  "Brand characters", "Company profiles", "Corporate folders", "Custom illustrations",
  "Display ads", "Ebook covers", "Email graphics", "Event invitations",
  "Flyers and posters", "Icons", "Landing page graphics", "Logo design",
  "Magazine ads", "Newsletters", "Packaging and labels", "Podcast artwork",
  "Point of sale materials", "Presentation templates", "Product mockups", "Promotional graphics",
  "Restaurant menus", "Signage", "Social media posts", "Stationery sets",
  "T-shirt graphics", "Tradeshow banners", "UI design assets", "Vehicle graphics",
  "Web ads", "Website graphics",
];

const notIncluded = [
  "Ad campaign strategy",
  "3D or CAD design",
  "Marketing consulting",
  "Software development",
  "Coding or programming",
];

const planFeatures = [
  "Unlimited design requests",
  "Unlimited revisions",
  "Unlimited brands",
  "No contracts",
  "Fast turnaround times",
  "Unlimited team members",
  "Dedicated design team",
  "Dedicated project manager",
  "Premium stock assets included",
  "Source files provided",
  "Print and digital designs",
  "Custom illustrations",
  "Basic animated graphics",
  "Landing page graphics",
  "Website and UI graphics",
  "Project management dashboard",
];

const faqs = [
  { q: "What does unlimited design mean?", a: "Unlimited design means you can submit as many design requests as you want. Our team works through them based on your priorities, ensuring each design gets the attention it deserves. There's no cap on the number of requests you can make during your subscription." },
  { q: "Who is NoLimit Designs for?", a: "NoLimit Designs is for entrepreneurs, startups, marketing teams, agencies, and established businesses that need consistent, professional graphic design without the cost and complexity of hiring in-house designers." },
  { q: "How fast are designs delivered?", a: "Most simple design requests are delivered within 24–48 hours. More complex projects like brand identity packages or multi-page documents may take longer. We always communicate timelines upfront." },
  { q: "Who works on my requests?", a: "You get a dedicated creative team consisting of experienced designers and a project manager who oversee your requests and ensure everything stays organized and on-brand." },
  { q: "Do you design using AI tools?", a: "Our designs are created by experienced human designers. We may use AI-assisted tools for certain tasks like background removal or image enhancement, but all creative work is done by our professional design team." },
  { q: "How does the free trial work?", a: "Start your free trial to experience our design service. Submit your first design request and see the quality of our work before committing to a paid subscription." },
  { q: "How do I submit requests?", a: "Submit design requests through your project management dashboard. You can add detailed briefs, upload reference files, and prioritize your tasks." },
  { q: "How many tasks can be worked on at once?", a: "Your dedicated team works through tasks one at a time to ensure quality and attention to detail. However, with fast turnaround times, your queue moves quickly." },
  { q: "How many brands can I submit requests for?", a: "There's no limit on the number of brands you can submit requests for. Whether you manage one brand or dozens, your subscription covers them all." },
  { q: "Can you create print-ready designs?", a: "Yes! We create both digital and print-ready designs. All files are delivered in the appropriate formats and specifications for your intended use." },
  { q: "How easy is it to cancel?", a: "You can cancel your subscription at any time with no penalties or hidden fees. Your subscription is month-to-month with no long-term commitment required." },
];

export default function GraphicDesignServices() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
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
                Unlimited Graphic Design That Scales With Your Business
              </h1>
              <p className="text-lg leading-7 text-white/80 mb-8 max-w-xl">
                Launching a brand, growing a startup, or managing multiple clients? NoLimit Designs gives you a dependable creative team ready to handle your graphic design needs without the cost and complexity of hiring in-house designers.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#graphics-plan" className="btn bg-[#070707] text-white border-2 border-[#070707] hover:bg-white hover:text-[#070707] transition-all">
                  See Pricing
                </a>
                <a href="#book-demo" className="btn border-2 border-white text-white hover:bg-white hover:text-[#070707] transition-all">
                  Schedule Demo
                </a>
              </div>
              <p className="text-sm text-white/60 mt-4 flex flex-wrap gap-x-4 gap-y-1">
                <span>✓ Sign up in minutes</span>
                <span>✓ Cancel anytime</span>
                <span>✓ No long-term contracts</span>
              </p>
            </div>
            <div className="relative">
              <img
                src={HERO_IMG}
                alt="Graphic design team at work"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff4f01]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ff4f01]/10 rounded-full blur-3xl" />
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-16 bg-[#fff6ec]">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="font-bricolage font-medium xl:text-[48px] xl:leading-[56px] md:text-[36px] md:leading-[44px] text-[28px] leading-[36px] text-[#101010] mb-4">
              Businesses Are Scaling Faster With NoLimit Designs
            </h2>
            <p className="text-lg text-[rgb(119,119,125)] max-w-3xl mx-auto">
              Entrepreneurs, marketing teams, and agencies rely on NoLimit Designs to produce consistent, high-quality graphics without the hassle of managing freelancers.
            </p>
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

      {/* DEPENDABLE GRAPHIC DESIGN */}
      <section className="lg:py-24 py-16">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 border border-[#bebebe] py-2 px-5 rounded-full text-sm font-medium mb-3">
              <i className="ri-arrow-right-up-line text-[#ff4f01]" />
              Dependable Design
            </span>
            <h2 className="font-bricolage font-medium xl:text-[56px] xl:leading-[64px] md:text-[42px] md:leading-[50px] text-[32px] leading-[40px] text-[#101010] mb-4">
              Let Our Design Team Handle Your Graphics
            </h2>
            <p className="text-lg text-[rgb(119,119,125)] max-w-3xl mx-auto">
              Stop worrying about whether you'll have the design resources you need. With NoLimit Graphics, you get a dedicated creative team that understands your brand and consistently delivers professional designs.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {featureCards.map((card, i) => (
              <div
                key={i}
                className="text-center py-12 px-8 rounded-[15px] border border-[#bebebe] hover:border-[#ff4f01] transition-all duration-500 bg-white/50"
              >
                <i className={`${card.icon} text-[48px] text-[#ff4f01] mb-4 inline-block`} />
                <h4 className="text-2xl font-medium mb-3 font-bricolage">{card.title}</h4>
                <p className="text-base text-[rgb(119,119,125)] leading-7">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL HIGHLIGHT */}
      <section className="lg:py-20 py-12">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-[#ff4f01] to-[#ff8c42] rounded-2xl p-10 lg:p-16 text-center relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex justify-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <i key={star} className="ri-star-fill text-white text-2xl" />
                ))}
              </div>
              <h3 className="font-bricolage text-white text-xl lg:text-2xl font-medium mb-2">What Clients Are Saying</h3>
              <blockquote className="text-white/95 text-lg lg:text-xl leading-8 max-w-3xl mx-auto italic mb-6">
                "NoLimit Designs completely changed the way we manage design projects. We get consistent, high-quality graphics without spending hours managing freelancers."
              </blockquote>
              <p className="text-white/80 font-medium">— Marketing Agency Owner</p>
            </div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
            <div className="absolute -top-8 -left-8 w-24 h-24 rounded-full bg-white/10" />
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
              Why Businesses Choose NoLimit Graphics
            </h2>
            <p className="text-lg text-[rgb(119,119,125)] max-w-3xl mx-auto">
              Instead of chasing unreliable freelancers or hiring expensive in-house designers, get a dedicated creative team for a predictable monthly rate.
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

      {/* YOUR DESIGN TEAM */}
      <section className="lg:py-24 py-16 bg-gradient-to-r from-[#ff4f01] to-[#ff8c42] relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 border border-white/30 py-2 px-5 rounded-full text-sm font-medium mb-3 text-white/80">
                <i className="ri-arrow-right-up-line text-[#ff4f01]" />
                Your Team
              </span>
              <h2 className="font-bricolage font-medium xl:text-[56px] xl:leading-[64px] md:text-[42px] md:leading-[50px] text-[32px] leading-[40px] text-white mb-6">
                A Dedicated Creative Team Focused On Your Brand
              </h2>
              <p className="text-lg text-white/80 leading-8 mb-4">
                Your subscription includes a dedicated creative team consisting of designers and a project manager who oversee your requests and ensure everything stays organized.
              </p>
              <p className="text-lg text-white/80 leading-8">
                Over time, your team becomes familiar with your brand guidelines, allowing them to produce designs faster and more accurately.
              </p>
            </div>
            <div>
              <img
                src={TEAM_IMG}
                alt="Dedicated creative team"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff4f01]/10 rounded-full blur-3xl" />
      </section>

      {/* DESIGN TYPES */}
      <section className="lg:py-24 py-16">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 border border-[#bebebe] py-2 px-5 rounded-full text-sm font-medium mb-3">
              <i className="ri-arrow-right-up-line text-[#ff4f01]" />
              What We Do
            </span>
            <h2 className="font-bricolage font-medium xl:text-[56px] xl:leading-[64px] md:text-[42px] md:leading-[50px] text-[32px] leading-[40px] text-[#101010] mb-4">
              Graphic Designs We Create For Our Clients
            </h2>
            <p className="text-lg text-[rgb(119,119,125)] max-w-3xl mx-auto">
              Whether you're a startup founder or an established business, we help you produce creative assets efficiently.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-x-6 gap-y-3 max-w-5xl mx-auto mb-8">
            {designTypes.map((type, i) => (
              <div key={i} className="flex items-center gap-2 py-2">
                <i className="ri-check-line text-[#ff4f01] shrink-0" />
                <span className="text-[#101010] text-[15px]">{type}</span>
              </div>
            ))}
          </div>

          <p className="text-center text-[rgb(119,119,125)] italic mb-8">
            And nearly anything that can be created in modern design software.
          </p>

          <div className="text-center">
            <a href="#" className="btn btn-primary">
              View Graphic Design Samples
            </a>
          </div>

          {/* What's Not Included */}
          <div className="mt-16 max-w-2xl mx-auto">
            <h3 className="font-bricolage font-medium text-2xl text-center mb-6">What's Not Included</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {notIncluded.map((item, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#bebebe] text-[rgb(119,119,125)] text-sm"
                >
                  <i className="ri-close-line text-red-400" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GRAPHICS PLAN */}
      <section id="graphics-plan" className="lg:py-24 py-16">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 border border-[#bebebe] py-2 px-5 rounded-full text-sm font-medium mb-3">
              <i className="ri-arrow-right-up-line text-[#ff4f01]" />
              Pricing
            </span>
            <h2 className="font-bricolage font-medium xl:text-[56px] xl:leading-[64px] md:text-[42px] md:leading-[50px] text-[32px] leading-[40px] text-[#101010]">
              The NoLimit Graphics Plan
            </h2>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="p-3 rounded-xl border-2 border-[#ff4f01] bg-white shadow-lg">
              <div className="p-6 border-b border-[#bebebe]">
                <span className="inline-block px-5 py-2 rounded-full font-medium text-sm bg-[#ff4f01] text-white">
                  NoLimit Graphics
                </span>
                <p className="text-[42px] font-medium font-bricolage text-[#ff4f01] mt-4">
                  CAD 1,040
                  <span className="text-base text-[rgb(119,119,125)] font-normal"> / month</span>
                </p>
                <p className="text-sm text-[rgb(119,119,125)] line-through mt-1">CAD 2,080 / month</p>
                <p className="text-xs text-[#ff4f01] font-medium mt-1">Save CAD 1,040 per month for the first 4 months</p>
              </div>
              <div className="p-6">
                <ul className="flex flex-col gap-3 mb-6">
                  {planFeatures.map((f, j) => (
                    <li key={j} className="text-[rgb(119,119,125)] text-base flex items-start gap-2">
                      <i className="ri-check-line text-[#ff4f01] mt-1 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#" className="btn btn-primary w-full text-center block">
                  Start Free Trial
                </a>
                <p className="text-center text-sm text-[rgb(119,119,125)] mt-3">
                  All prices shown in CAD.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RATINGS */}
      <section className="lg:py-20 py-12">
        <div className="container-custom">
          <h2 className="font-bricolage font-medium xl:text-[48px] xl:leading-[56px] md:text-[36px] md:leading-[44px] text-[28px] leading-[36px] text-[#101010] text-center mb-12">
            Trusted By Businesses Worldwide
          </h2>
          <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { platform: "Google Reviews", rating: "4.7", icon: "ri-google-fill" },
              { platform: "Clutch", rating: "4.9", icon: "ri-award-fill" },
              { platform: "Trustpilot", rating: "4.9", icon: "ri-star-fill" },
            ].map((badge, i) => (
              <div key={i} className="text-center bg-white rounded-xl p-6 border border-[#bebebe] hover:border-[#ff4f01] transition-all duration-300">
                <i className={`${badge.icon} text-3xl text-[#ff4f01] mb-2 inline-block`} />
                <p className="text-[#101010] font-semibold font-bricolage">{badge.platform}</p>
                <p className="text-[#ff4f01] font-bold text-2xl font-bricolage">{badge.rating}</p>
                <p className="text-sm text-[rgb(119,119,125)]">average rating</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="lg:py-24 py-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 border border-[#bebebe] py-2 px-5 rounded-full text-sm font-medium mb-3">
                <i className="ri-arrow-right-up-line text-[#ff4f01]" />
                For Every Business
              </span>
              <h2 className="font-bricolage font-medium xl:text-[56px] xl:leading-[64px] md:text-[42px] md:leading-[50px] text-[32px] leading-[40px] text-[#101010] mb-6">
                Design Support For Businesses Of All Sizes
              </h2>
              <p className="text-lg text-[rgb(119,119,125)] leading-8 mb-8">
                Whether you're building a new brand or scaling a growing business, NoLimit Graphics helps you produce professional design assets quickly and affordably.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#" className="btn btn-primary">
                  View Design Portfolio
                </a>
                <a href="#book-demo" className="btn btn-dark">
                  Book a Call
                </a>
              </div>
            </div>
            <div>
              <img
                src={BUSINESSES_IMG}
                alt="Businesses of all sizes"
                className="w-full rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* BOOK A DEMO */}
      <section id="book-demo" className="lg:py-24 py-16">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-[#ff4f01] to-[#ff8c42] rounded-3xl p-12 lg:p-20 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="font-bricolage font-semibold xl:text-[56px] xl:leading-[64px] md:text-[42px] md:leading-[50px] text-[32px] leading-[40px] text-white mb-4">
                See How NoLimit Designs Works
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Book a quick call with our team and learn how unlimited design can help your business produce creative assets faster.
              </p>
              <a href="#" className="btn bg-white text-[#ff4f01] border-2 border-white hover:bg-transparent hover:text-white transition-all">
                Book a Call <i className="ri-video-chat-line ml-1" />
              </a>
            </div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full bg-white/10" />
            <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-white/10" />
          </div>
        </div>
      </section>

      {/* SUPPORT */}
      <section className="lg:py-24 py-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={SUPPORT_IMG}
                alt="Dedicated support team"
                className="w-full rounded-2xl shadow-lg"
              />
            </div>
            <div>
              <span className="inline-flex items-center gap-2 border border-[#bebebe] py-2 px-5 rounded-full text-sm font-medium mb-3">
                <i className="ri-arrow-right-up-line text-[#ff4f01]" />
                Support
              </span>
              <h2 className="font-bricolage font-medium xl:text-[48px] xl:leading-[56px] md:text-[36px] md:leading-[44px] text-[28px] leading-[36px] text-[#101010] mb-6">
                Dedicated Support When You Need It
              </h2>
              <p className="text-lg text-[rgb(119,119,125)] leading-8">
                Our support team is available to help you manage requests, answer questions, and make the most of your design subscription.
              </p>
            </div>
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

            <div className="text-center mt-10">
              <a href="#" className="btn btn-outline">
                Read All FAQs
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="lg:py-24 py-16">
        <div className="container-custom">
          <div className="relative bg-gradient-to-br from-[#070707] to-[#1f1f1f] rounded-3xl p-12 lg:p-20 text-center overflow-hidden">
            <div className="relative z-10">
              <h2 className="font-bricolage font-semibold xl:text-[56px] xl:leading-[64px] md:text-[42px] md:leading-[50px] text-[32px] leading-[40px] text-white mb-4">
                Start Scaling Your Creative Output
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                Whether you're launching a brand or managing multiple marketing campaigns, NoLimit Designs gives you the creative power to produce more designs faster.
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