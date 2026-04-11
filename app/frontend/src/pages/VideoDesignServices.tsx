import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const HERO_IMG = "https://mgx-backend-cdn.metadl.com/generate/images/1108746/2026-04-11/a230de41-4fc8-4258-9306-84ec3f52f07c.png";
const TEAM_IMG = "https://mgx-backend-cdn.metadl.com/generate/images/1108746/2026-04-11/0838773b-8170-4a81-99c5-27105cf39635.png";
const SUPPORT_IMG = "https://mgx-backend-cdn.metadl.com/generate/images/1108746/2026-04-11/02751d72-468f-46ef-8b84-9e3681512675.png";
const CONTENT_IMG = "https://mgx-backend-cdn.metadl.com/generate/images/1108746/2026-04-11/a9a829bf-0ede-4020-a1d8-e571420531d1.png";

const companyLogos = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/company1-DAcU80XmDqE7n4yHBPEPaJo2GqDasE.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/company2-8A2v3xWKAJxTVDgu2XhS84M1Jux4Bk.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/company3-Rdc1oIOSvNO9bMzxHC7qZMnEFMg8w9.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/company4-maSfugMfllJUwqzgNTuW4Rs2EhmL2R.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/company5-EmHeKOlL0aPHdxYXlhmxVsnGIbgWtk.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/company6-Psf7hxqmQZCFug3zEWEiF7bi1AQX47.png",
];

const videoTypes = [
  { title: "Animated Typography", desc: "Combine text and motion to create engaging messages for social media and marketing campaigns." },
  { title: "Animated Video Ads", desc: "Capture attention with animated advertisements designed for digital marketing." },
  { title: "Audiograms", desc: "Turn podcast content into shareable video snippets with audio wave animations and captions." },
  { title: "Cinemagraphs", desc: "Blend photography and video with subtle motion effects that loop seamlessly." },
  { title: "Product Demo Videos", desc: "Show potential customers how your product works with clear and engaging demonstration videos." },
  { title: "Display Loop Videos", desc: "Create looping visuals perfect for events, presentations, or landing pages." },
  { title: "FAQ Videos", desc: "Answer common customer questions with short informational videos." },
  { title: "GIF Animations", desc: "Use GIFs to explain features, highlight offers, or add motion to marketing campaigns." },
  { title: "Logo Animations", desc: "Bring your brand to life with animated logo intros and outros." },
  { title: "Motion Posters", desc: "Animated promotional graphics designed to boost engagement and conversions." },
  { title: "Social Media Videos", desc: "Create video content optimized for platforms like Instagram, TikTok, YouTube, and LinkedIn." },
  { title: "Template Customization", desc: "Customize motion graphics templates to match your branding and campaign goals." },
  { title: "Testimonial Videos", desc: "Turn client feedback into compelling social proof videos." },
  { title: "Text Overlays", desc: "Add captions and text highlights to make your videos clearer and more engaging." },
  { title: "UI/UX Animations", desc: "Animate product interfaces for demos, presentations, or marketing campaigns." },
  { title: "Video Editing", desc: "Send us your raw footage and we'll edit it into polished marketing videos." },
];

const videoIcons = [
  "ri-text-direction-l", "ri-movie-2-line", "ri-mic-line", "ri-camera-lens-line",
  "ri-slideshow-line", "ri-loop-left-line", "ri-question-answer-line", "ri-file-gif-line",
  "ri-magic-line", "ri-image-2-line", "ri-smartphone-line", "ri-palette-line",
  "ri-chat-quote-line", "ri-font-size-2", "ri-layout-line", "ri-film-line",
];

const featureCards = [
  {
    icon: "ri-team-line",
    title: "Dedicated Video Design Team",
    desc: "We assign a specialized video team that learns your brand and creates consistent video content.",
  },
  {
    icon: "ri-group-line",
    title: "Collaborate With Your Team",
    desc: "Invite team members to submit requests and collaborate on projects together.",
  },
  {
    icon: "ri-time-line",
    title: "Videos When You Need Them",
    desc: "Submit requests anytime and receive completed videos with fast turnaround.",
  },
];

const scalableFeatures = [
  "Dedicated video design team",
  "Unlimited video design requests",
  "Stock footage and design elements included",
  "Video optimization for multiple platforms",
];

const collabFeatures = [
  "Invite team members to submit requests",
  "Collaborate on projects together",
  "Manage feedback and revisions in one place",
];

const perks = [
  { icon: "ri-infinity-line", title: "Unlimited Video Requests", desc: "Submit as many video projects as needed." },
  { icon: "ri-loop-left-line", title: "Unlimited Revisions", desc: "Refine every video until it meets your expectations." },
  { icon: "ri-flashlight-line", title: "Fast Turnaround", desc: "Typical turnaround ranges from 2 to 4 business days depending on complexity." },
  { icon: "ri-group-line", title: "Team Collaboration", desc: "Invite unlimited collaborators at no extra cost." },
  { icon: "ri-shield-check-line", title: "You Own Your Videos", desc: "All completed videos and source files belong to you." },
  { icon: "ri-video-line", title: "Wide Range of Video Types", desc: "Create everything from social media videos to animated explainers." },
  { icon: "ri-image-line", title: "Premium Stock Assets", desc: "We source high-quality stock footage, images, and audio." },
  { icon: "ri-customer-service-2-line", title: "Dedicated Support", desc: "Our support team is available whenever you need assistance." },
  { icon: "ri-award-line", title: "Professional Video Designers", desc: "Experienced motion designers and editors working on your projects." },
];

const planFeatures = [
  "Unlimited video design requests",
  "Unlimited revisions",
  "Unlimited brands",
  "2 active video tasks at a time",
  "2–4 day turnaround",
  "Dedicated video design team",
  "Dedicated project manager",
  "Stock footage and audio included",
  "Source files provided",
  "Project management dashboard",
  "No contracts or hidden fees",
];

const faqs = [
  { q: "What does unlimited video design mean?", a: "Unlimited video design means you can submit as many video requests as you want. Our team works through them based on your priorities, with up to 2 active tasks at a time. There's no cap on total requests during your subscription." },
  { q: "Who is NoLimit Designs for?", a: "NoLimit Designs is for entrepreneurs, startups, marketing teams, agencies, and established businesses that need consistent, professional video content without the cost and complexity of hiring in-house video editors." },
  { q: "How quickly are videos delivered?", a: "Most video requests are delivered within 2–4 business days depending on complexity. Simple edits and animations may be faster, while more complex projects may take slightly longer." },
  { q: "Who works on my video requests?", a: "You get a dedicated video design team consisting of experienced motion designers, video editors, and a project manager who oversee your requests and ensure everything stays organized." },
  { q: "Do you create videos using AI tools?", a: "Our videos are created by experienced human designers and editors. We may use AI-assisted tools for certain tasks, but all creative work is done by our professional video team." },
  { q: "How does the free trial work?", a: "Start your free trial to experience our video design service. Submit your first video request and see the quality of our work before committing to a paid subscription." },
  { q: "How do I submit requests?", a: "Submit video requests through your project management dashboard. You can add detailed briefs, upload reference files, footage, and prioritize your tasks." },
  { q: "How many projects can be active at once?", a: "Your dedicated team works on up to 2 active video tasks at a time to ensure quality and attention to detail. With fast turnaround times, your queue moves quickly." },
  { q: "How many brands can I submit requests for?", a: "There's no limit on the number of brands you can submit requests for. Whether you manage one brand or dozens, your subscription covers them all." },
  { q: "How easy is it to cancel?", a: "You can cancel your subscription at any time with no penalties or hidden fees. Your subscription is month-to-month with no long-term commitment required." },
];

export default function VideoDesignServices() {
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
                Unlimited Video Design for Modern Marketing
              </h1>
              <p className="text-lg leading-7 text-white/80 mb-8 max-w-xl">
                Create engaging promo videos, animated content, and social media videos with a dedicated video design team. Whether you have footage that needs editing or need videos created from scratch, NoLimit Designs has you covered.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#video-plan" className="btn bg-[#070707] text-white border-2 border-[#070707] hover:bg-white hover:text-[#070707] transition-all">
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
                alt="Video design team at work"
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
              Businesses Are Scaling With NoLimit Video
            </h2>
            <p className="text-lg text-[rgb(119,119,125)] max-w-3xl mx-auto">
              Companies and marketing teams rely on NoLimit Designs to produce engaging video content that drives traffic, engagement, and conversions.
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

      {/* VIDEO DESIGN REQUESTS GRID */}
      <section className="lg:py-24 py-16">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 border border-[#bebebe] py-2 px-5 rounded-full text-sm font-medium mb-3">
              <i className="ri-arrow-right-up-line text-[#ff4f01]" />
              Video Services
            </span>
            <h2 className="font-bricolage font-medium xl:text-[56px] xl:leading-[64px] md:text-[42px] md:leading-[50px] text-[32px] leading-[40px] text-[#101010] mb-4">
              What You Can Request With NoLimit Video
            </h2>
            <p className="text-lg text-[rgb(119,119,125)] max-w-3xl mx-auto">
              Video marketing is one of the most powerful ways to capture attention and communicate your message. With NoLimit Video, you can request a wide variety of animated and edited video content.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5">
            {videoTypes.map((type, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-5 border border-[#e5e5e5] hover:border-[#ff4f01] hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-[#ff4f01]/10 flex items-center justify-center mb-4 group-hover:bg-[#ff4f01]/20 transition-colors">
                  <i className={`${videoIcons[i]} text-[#ff4f01] text-2xl`} />
                </div>
                <h4 className="text-[15px] font-medium mb-2 font-bricolage text-[#101010]">{type.title}</h4>
                <p className="text-sm text-[rgb(119,119,125)] leading-6">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCALABLE VIDEO CREATION */}
      <section className="lg:py-24 py-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 border border-[#bebebe] py-2 px-5 rounded-full text-sm font-medium mb-3">
                <i className="ri-arrow-right-up-line text-[#ff4f01]" />
                Scalable Video
              </span>
              <h2 className="font-bricolage font-medium xl:text-[56px] xl:leading-[64px] md:text-[42px] md:leading-[50px] text-[32px] leading-[40px] text-[#101010] mb-6">
                Video Content That Scales With Your Marketing
              </h2>
              <p className="text-lg text-[rgb(119,119,125)] leading-8 mb-4">
                Create engaging videos for every marketing campaign without worrying about production costs or hiring additional editors.
              </p>
              <p className="text-lg text-[rgb(119,119,125)] leading-8 mb-6">
                With NoLimit Video, you get a dedicated video design team ready to handle your requests quickly and consistently.
              </p>
              <ul className="flex flex-col gap-3 mb-8">
                {scalableFeatures.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#101010]">
                    <i className="ri-check-line text-[#ff4f01] text-lg shrink-0" />
                    <span className="text-base">{f}</span>
                  </li>
                ))}
              </ul>

              {/* Collaboration sub-section */}
              <h3 className="font-bricolage font-medium text-2xl text-[#101010] mb-4">
                Collaborate With Your Team Easily
              </h3>
              <ul className="flex flex-col gap-3">
                {collabFeatures.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#101010]">
                    <i className="ri-check-line text-[#ff4f01] text-lg shrink-0" />
                    <span className="text-base">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <img
                src={CONTENT_IMG}
                alt="Video content types"
                className="w-full rounded-2xl shadow-lg"
              />
            </div>
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
              <h3 className="font-bricolage text-white text-xl lg:text-2xl font-medium mb-2">What Clients Say About NoLimit Designs</h3>
              <blockquote className="text-white/95 text-lg lg:text-xl leading-8 max-w-3xl mx-auto italic mb-6">
                "NoLimit Designs helped us scale our video marketing without hiring an in-house video team. The turnaround times and quality have been incredible."
              </blockquote>
              <p className="text-white/80 font-medium">— Marketing Director</p>
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
              Why Businesses Choose NoLimit Video
            </h2>
            <p className="text-lg text-[rgb(119,119,125)] max-w-3xl mx-auto">
              Instead of managing freelancers or hiring expensive in-house video editors, get a dedicated creative team for a predictable monthly rate.
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

      {/* YOUR VIDEO TEAM */}
      <section className="lg:py-24 py-16 bg-gradient-to-r from-[#ff4f01] to-[#ff8c42] relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 border border-white/30 py-2 px-5 rounded-full text-sm font-medium mb-3 text-white/80">
                <i className="ri-arrow-right-up-line text-white" />
                Your Team
              </span>
              <h2 className="font-bricolage font-medium xl:text-[56px] xl:leading-[64px] md:text-[42px] md:leading-[50px] text-[32px] leading-[40px] text-white mb-6">
                A Dedicated Video Design Team
              </h2>
              <p className="text-lg text-white/80 leading-8 mb-4">
                Your subscription includes a specialized video team with a project manager who oversees your requests and ensures your projects stay organized.
              </p>
              <p className="text-lg text-white/80 leading-8">
                As your team becomes familiar with your brand, they can deliver content faster while maintaining consistency across campaigns.
              </p>
            </div>
            <div>
              <img
                src={TEAM_IMG}
                alt="Dedicated video design team"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff4f01]/10 rounded-full blur-3xl" />
      </section>

      {/* VIDEO PLAN */}
      <section id="video-plan" className="lg:py-24 py-16">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 border border-[#bebebe] py-2 px-5 rounded-full text-sm font-medium mb-3">
              <i className="ri-arrow-right-up-line text-[#ff4f01]" />
              Pricing
            </span>
            <h2 className="font-bricolage font-medium xl:text-[56px] xl:leading-[64px] md:text-[42px] md:leading-[50px] text-[32px] leading-[40px] text-[#101010]">
              The NoLimit Video Plan
            </h2>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="p-3 rounded-xl border-2 border-[#ff4f01] bg-white shadow-lg">
              <div className="p-6 border-b border-[#bebebe]">
                <span className="inline-block px-5 py-2 rounded-full font-medium text-sm bg-[#ff4f01] text-white">
                  NoLimit Video
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
                <a href="/register" className="btn btn-primary w-full text-center block">
                  Start Free Trial
                </a>
                <p className="text-center text-sm text-[rgb(119,119,125)] mt-3">
                  All prices displayed in CAD.
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
            Highly Rated By Businesses Worldwide
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

      {/* BOOK A DEMO */}
      <section id="book-demo" className="lg:py-24 py-16">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-[#ff4f01] to-[#ff8c42] rounded-3xl p-12 lg:p-20 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="font-bricolage font-semibold xl:text-[56px] xl:leading-[64px] md:text-[42px] md:leading-[50px] text-[32px] leading-[40px] text-white mb-4">
                See How NoLimit Video Works
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Schedule a short call with our team to learn how unlimited video design can help your business produce better content faster.
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
                Our team is available to help you manage your projects and get the most value from your design subscription.
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
                Start Creating Better Videos Today
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                Produce engaging marketing videos consistently without hiring an in-house video team.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full sm:flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-[#ff4f01] transition-colors"
                />
                <a href="/register" className="btn btn-primary !mb-0 whitespace-nowrap">
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