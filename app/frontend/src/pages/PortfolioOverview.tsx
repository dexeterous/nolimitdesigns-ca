import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

type PortfolioProject = {
  eyebrow: string;
  title: string;
  summary: string;
  url: string;
  location: string;
  performance: string;
  timeline: string;
  challenge: string;
  deliverables: string[];
  showcase: string[];
  features: { icon: string; title: string; desc: string }[];
  stack: string[];
  services: string[];
  built: string;
  accent: string;
  dark: string;
};

const projects: PortfolioProject[] = [
  {
    eyebrow: "Immigration Consulting",
    title: "Pinnacle Immigration",
    summary:
      "A focused immigration website built around Canada PR and study pathways for Kuwait-based clients, with clear eligibility flows and WhatsApp-first conversion paths.",
    url: "https://immigratewithpinnacle.com/",
    location: "Kuwait / Canada",
    performance: "95/100",
    timeline: "4 Weeks",
    challenge:
      "Pinnacle needed a trustworthy website that could make complex immigration pathways feel clear. The structure had to separate PR and study routes, reduce confusion, and move qualified visitors toward an eligibility check or direct WhatsApp conversation.",
    deliverables: [
      "Pathway-focused pages for Canada PR and Study in Canada inquiries.",
      "Eligibility and contact flows designed to capture qualified leads quickly.",
      "Trust-building content blocks for process clarity, document checklists, timelines, and testimonials.",
    ],
    showcase: ["Pathway landing pages", "Eligibility CTA flow", "WhatsApp conversion layout"],
    features: [
      { icon: "ri-route-line", title: "Pathway Architecture", desc: "Separate PR and study journeys help visitors find the correct route without digging through dense immigration content." },
      { icon: "ri-whatsapp-line", title: "WhatsApp Lead Capture", desc: "Prominent chat CTAs support the way the audience naturally prefers to ask questions and submit details." },
      { icon: "ri-shield-check-line", title: "Trust And Disclaimer System", desc: "Clear disclaimers, success stories, and process sections improve confidence without overpromising outcomes." },
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    services: ["Custom Design", "Development", "Lead Generation", "Content Structure"],
    built:
      "The build organizes immigration content into two primary decision paths, then supports each path with checklists, comparison content, social proof, and contact prompts. The result is a direct lead-generation website that stays simple while still handling a serious, high-trust service.",
    accent: "#0f766e",
    dark: "#0f172a",
  },
  {
    eyebrow: "Online Education",
    title: "Yaseer Institute",
    summary:
      "A course-driven learning website for Quran, Arabic, and Islamic studies, with student registration, course discovery, and learning-platform messaging.",
    url: "https://yaseerinstitute.com/",
    location: "Online",
    performance: "90/100",
    timeline: "6 Weeks",
    challenge:
      "Yaseer Institute needed to present a large catalog of classes for kids, teens, and adults without overwhelming families. The site had to communicate flexibility, teacher quality, membership access, and clear registration paths.",
    deliverables: [
      "Course catalog structure for kids, teens, adults, one-to-one classes, group classes, and halaqah programs.",
      "Homepage messaging around flexible schedules, live teachers, online learning, and certified instructors.",
      "Conversion flow for browsing courses, registering, and starting online learning.",
    ],
    showcase: ["Course catalog layout", "Student registration journey", "Learning benefits section"],
    features: [
      { icon: "ri-book-open-line", title: "Course Discovery", desc: "Program categories help students and parents quickly compare class types, levels, and schedules." },
      { icon: "ri-user-voice-line", title: "Teacher Trust Signals", desc: "Benefit sections emphasize live teachers, certification, and flexible learning for different age groups." },
      { icon: "ri-graduation-cap-line", title: "Student Onboarding", desc: "Registration prompts and course previews guide visitors from interest to enrollment." },
    ],
    stack: ["WordPress", "LMS", "Responsive Design", "Course CMS"],
    services: ["Web Development", "LMS Setup", "Course UX", "Optimization"],
    built:
      "The page system centers the course catalog, then reinforces it with student outcomes, learning benefits, testimonials, and repeated registration CTAs. The main challenge was making a content-heavy education platform feel navigable and family-friendly.",
    accent: "#1d4ed8",
    dark: "#111827",
  },
  {
    eyebrow: "Language Training",
    title: "Learn French Fast",
    summary:
      "A streamlined education and coaching site for French learners preparing for fluency, tests, and immigration goals, with package-led conversion paths.",
    url: "https://www.learnfrenchfast.ca/",
    location: "Canada",
    performance: "96/100",
    timeline: "3 Weeks",
    challenge:
      "Learn French Fast needed a fast, simple website that could communicate outcomes quickly and direct visitors toward packages, features, FAQs, and enrollment. The audience needed clarity, confidence, and speed.",
    deliverables: [
      "Package-focused homepage structure with fast routes to pricing and enrollment.",
      "Feature and FAQ sections built to answer buying questions before the form.",
      "Conversion-first layout for students with immigration and fluency goals.",
    ],
    showcase: ["Packages section", "Feature comparison", "FAQ and enrollment CTA"],
    features: [
      { icon: "ri-price-tag-3-line", title: "Package-Led Sales", desc: "Visitors can compare offers quickly before moving into the contact or sign-up flow." },
      { icon: "ri-question-answer-line", title: "Objection Handling", desc: "FAQ content supports faster decisions by addressing common learning and enrollment questions." },
      { icon: "ri-speed-up-line", title: "Fast Landing Experience", desc: "A lean structure keeps the site focused on action instead of unnecessary page depth." },
    ],
    stack: ["Next.js", "Tailwind CSS", "v0", "Responsive UI"],
    services: ["Landing Page", "Conversion UX", "Development", "SEO Basics"],
    built:
      "The build keeps the user journey compact: proof, package comparison, feature support, FAQ, and action. This works well for a coaching offer where visitors need to understand the promise quickly and take the next step without friction.",
    accent: "#dc2626",
    dark: "#101010",
  },
  {
    eyebrow: "Business Technology",
    title: "Triplexon",
    summary:
      "A polished business website foundation for a technology-focused brand, designed to present services, credibility, and inquiry paths with a professional first impression.",
    url: "https://triplexon.com/",
    location: "Canada",
    performance: "92/100",
    timeline: "5 Weeks",
    challenge:
      "Triplexon needed a modern web presence that could communicate a technical brand clearly while still feeling approachable to business buyers. The page structure needed to support credibility, services, and lead capture.",
    deliverables: [
      "Professional homepage framework for service positioning and brand credibility.",
      "Responsive layouts for business buyers comparing technical partners.",
      "Contact and inquiry CTAs placed around the core service narrative.",
    ],
    showcase: ["Service positioning", "Business credibility layout", "Inquiry CTA sections"],
    features: [
      { icon: "ri-layout-4-line", title: "Service Framework", desc: "Content sections are arranged to explain what the company does and why buyers should trust the team." },
      { icon: "ri-building-4-line", title: "Business Buyer UX", desc: "The structure keeps the tone professional and scan-friendly for decision makers." },
      { icon: "ri-send-plane-line", title: "Lead Pathways", desc: "Inquiry prompts are placed where visitors naturally finish evaluating the offer." },
    ],
    stack: ["React", "Tailwind CSS", "Vite", "Responsive Design"],
    services: ["Web Strategy", "Development", "Responsive UI", "Launch Support"],
    built:
      "The build focuses on presenting a technical business without making the experience feel dense. Sections are paced for scanning, with simple conversion paths and a layout that can expand as the company adds more service detail.",
    accent: "#7c3aed",
    dark: "#171717",
  },
  {
    eyebrow: "Fashion E-Commerce",
    title: "Razan Fashion",
    summary:
      "An online fashion storefront designed to showcase products, build brand confidence, and support a smoother path from browsing to buying.",
    url: "https://razanfashion.com/",
    location: "Online Store",
    performance: "91/100",
    timeline: "6 Weeks",
    challenge:
      "Razan Fashion needed a retail experience that could make products easy to browse while keeping the brand presentation clean and premium. The site had to support product discovery, trust, and customer action.",
    deliverables: [
      "Fashion storefront structure for product browsing and collection discovery.",
      "Responsive shopping experience for mobile-first customers.",
      "Brand-led visual sections that support credibility and product appeal.",
    ],
    showcase: ["Collection browsing", "Product discovery", "Mobile commerce layout"],
    features: [
      { icon: "ri-shopping-bag-3-line", title: "Product Discovery", desc: "Collections and product sections give shoppers a clear path from inspiration to item-level decisions." },
      { icon: "ri-smartphone-line", title: "Mobile Storefront", desc: "The layout supports customers browsing on phones, where fashion purchases often begin." },
      { icon: "ri-vip-diamond-line", title: "Brand Presentation", desc: "Visual hierarchy and spacing keep the storefront feeling polished and focused on the products." },
    ],
    stack: ["WordPress", "WooCommerce", "Responsive UI", "Storefront CMS"],
    services: ["E-Commerce", "Store Setup", "Product UX", "Launch Support"],
    built:
      "The build prioritizes product visibility, simple navigation, and a polished retail feel. The storefront is structured so new collections, product updates, and promotional content can be managed without redesigning the site.",
    accent: "#be185d",
    dark: "#18181b",
  },
];

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
      <i className="ri-arrow-right-up-line text-teal-600" />
      {children}
    </p>
  );
}

function PlaceholderScreen({ project, compact = false }: { project: PortfolioProject; compact?: boolean }) {
  return (
    <div className={`border border-dashed border-slate-300 bg-white p-3 ${compact ? "min-h-[260px]" : ""}`}>
      <div className="overflow-hidden bg-[#f8f5ef] shadow-sm">
        <div className="flex items-center justify-between px-4 py-3" style={{ backgroundColor: project.dark }}>
          <div className="flex items-center gap-2">
            <span className="h-6 w-6 rounded-full bg-white" />
            <span className="h-2 w-28 rounded-full bg-white/70" />
          </div>
          <div className="hidden gap-2 sm:flex">
            <span className="h-2 w-10 rounded-full bg-white/45" />
            <span className="h-2 w-10 rounded-full bg-white/45" />
            <span className="h-2 w-10 rounded-full bg-white/45" />
          </div>
        </div>
        <div className="grid min-h-[245px] gap-5 p-7 md:grid-cols-[1fr_170px]">
          <div>
            <span className="mb-4 inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white" style={{ backgroundColor: project.accent }}>
              {project.eyebrow}
            </span>
            <div className="mb-4 h-8 w-4/5 rounded-full" style={{ backgroundColor: project.dark }} />
            <div className="mb-2 h-3 w-full rounded-full bg-slate-200" />
            <div className="mb-8 h-3 w-2/3 rounded-full bg-slate-200" />
            <div className="grid gap-3 sm:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="min-h-20 rounded-lg bg-white p-3 shadow-sm">
                  <span className="mb-3 block h-6 w-6 rounded-full" style={{ backgroundColor: `${project.accent}22` }} />
                  <span className="mb-2 block h-2 w-20 rounded-full bg-slate-300" />
                  <span className="block h-2 w-14 rounded-full bg-slate-200" />
                </div>
              ))}
            </div>
          </div>
          <div className="hidden rounded-2xl md:block" style={{ background: `linear-gradient(145deg, ${project.accent}33, #ffffff)` }} />
        </div>
      </div>
    </div>
  );
}

function ProjectCaseStudy({ project, index }: { project: PortfolioProject; index: number }) {
  return (
    <article className={index === 0 ? "pt-20" : "border-t border-dashed border-slate-300 pt-20"}>
      <div className="mb-12 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
        <div>
          <SectionLabel>{project.eyebrow}</SectionLabel>
          <h2 className="font-bricolage text-4xl font-black uppercase leading-none text-slate-950 md:text-5xl">
            {project.title}
          </h2>
          <p className="mt-5 max-w-2xl leading-7 text-slate-500">{project.summary}</p>
        </div>
        <div className="grid grid-cols-3 border border-dashed border-slate-300 bg-white/60 text-sm">
          {[
            ["Location", project.location],
            ["Pagespeed", project.performance],
            ["Timeline", project.timeline],
          ].map(([label, value]) => (
            <div key={label} className="border-r border-dashed border-slate-300 p-5 last:border-r-0">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{label}</p>
              <p className="font-bold text-slate-950">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid border border-dashed border-slate-400 bg-white lg:grid-cols-[1fr_310px]">
        <PlaceholderScreen project={project} />
        <div className="flex flex-col justify-center border-t border-dashed border-slate-400 p-8 lg:border-l lg:border-t-0">
          <h3 className="font-bricolage text-3xl font-black uppercase leading-none text-slate-950">{project.title}</h3>
          <p className="mt-4 leading-7 text-slate-500">{project.summary}</p>
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn btn-dark mt-6 w-max !rounded-full !px-6 !py-3 !text-xs uppercase tracking-wide">
            Visit Live Website <i className="ri-arrow-right-line ml-1" />
          </a>
        </div>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-[300px_1fr]">
        <div>
          <SectionLabel>Project Overview</SectionLabel>
          <h3 className="font-bricolage text-2xl font-black uppercase leading-tight text-slate-950">
            The Challenge & Solution
          </h3>
        </div>
        <p className="border-l border-dashed border-slate-300 pl-8 leading-8 text-slate-500">{project.challenge}</p>
      </div>

      <div className="mt-14">
        <SectionLabel>Key Deliverables</SectionLabel>
        <div className="grid gap-3">
          {project.deliverables.map((item) => (
            <div key={item} className="flex gap-4 border-l border-dashed border-slate-300 pl-3 text-sm text-slate-600">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center border border-dashed border-teal-500 text-[10px] text-teal-700">
                <i className="ri-check-line" />
              </span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <SectionLabel>Visual Showcase</SectionLabel>
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <PlaceholderScreen project={project} compact />
          <div className="grid gap-8">
            {project.showcase.map((item) => (
              <div key={item}>
                <PlaceholderScreen project={project} />
                <p className="mt-3 text-[11px] font-black uppercase tracking-wide text-slate-950">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16">
        <SectionLabel>Key Features</SectionLabel>
        <div className="grid border border-dashed border-slate-300 bg-white md:grid-cols-3">
          {project.features.map((feature) => (
            <div key={feature.title} className="border-b border-dashed border-slate-300 p-8 md:border-b-0 md:border-r md:last:border-r-0">
              <span className="mb-6 flex h-12 w-12 items-center justify-center border border-dashed border-teal-500 text-xl text-teal-700">
                <i className={feature.icon} />
              </span>
              <h4 className="font-bricolage text-base font-black uppercase text-slate-950">{feature.title}</h4>
              <p className="mt-3 text-sm leading-6 text-slate-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14 grid border border-dashed border-slate-300 bg-white md:grid-cols-2">
        <div className="border-b border-dashed border-slate-300 p-8 md:border-b-0 md:border-r">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">Technology Stack</p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span key={item} className="border border-teal-300 bg-teal-50 px-3 py-1 text-xs font-medium text-slate-800">{item}</span>
            ))}
          </div>
        </div>
        <div className="p-8">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">Services Provided</p>
          <div className="flex flex-wrap gap-2">
            {project.services.map((item) => (
              <span key={item} className="border border-teal-300 bg-teal-50 px-3 py-1 text-xs font-medium text-slate-800">{item}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-[300px_1fr]">
        <div>
          <SectionLabel>Development</SectionLabel>
          <h3 className="font-bricolage text-2xl font-black uppercase leading-tight text-slate-950">
            How It Was Built
          </h3>
        </div>
        <p className="border-l border-dashed border-slate-300 pl-8 leading-8 text-slate-500">{project.built}</p>
      </div>
    </article>
  );
}

export default function PortfolioOverview() {
  return (
    <div className="min-h-screen bg-[#f8f5ef] text-slate-950">
      <SiteHeader />
      <section className="border-b border-dashed border-slate-300 pt-[150px] pb-16">
        <div className="container-custom">
          <SectionLabel>Featured Client Work</SectionLabel>
          <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-end">
            <div>
              <h1 className="font-bricolage text-5xl font-black uppercase leading-none text-slate-950 md:text-7xl">
                Portfolio
              </h1>
              <p className="mt-5 max-w-2xl leading-7 text-slate-500">
                Real websites, real project structure. These case studies show how we shape custom websites around service clarity, conversion paths, trust, and long-term growth.
              </p>
            </div>
            <div className="w-max rounded-full border border-dashed border-slate-300 bg-white px-5 py-3 shadow-sm">
              <div className="flex items-center gap-3 text-sm">
                <i className="ri-google-fill text-[#4285f4]" />
                <span className="font-bold">5.0</span>
                <span className="text-[#ffb703]">★★★★★</span>
                <span className="text-slate-400">Client work</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="container-custom pb-24">
        {projects.map((project, index) => (
          <ProjectCaseStudy key={project.title} project={project} index={index} />
        ))}
      </main>

      <section className="border-y border-dashed border-slate-300 bg-white py-20">
        <div className="container-custom grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <SectionLabel>Next Project</SectionLabel>
            <h2 className="font-bricolage text-4xl font-black uppercase leading-tight text-slate-950 md:text-5xl">
              Want your website presented like this?
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-slate-500">
              Send your project goals and we will map the page structure, conversion flow, and launch plan.
            </p>
          </div>
          <Link to="/contact" className="btn btn-primary w-max">
            Start a Project <i className="ri-arrow-right-line ml-1" />
          </Link>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
