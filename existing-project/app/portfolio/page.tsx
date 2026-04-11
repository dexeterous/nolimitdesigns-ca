"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"

type Project = {
  title: string
  category: string
  tags: string[]
  image: string
  description: string
}

export default function PortfolioPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const projects = [
    {
      title: "Create Winning Proposals in Minutes",
      category: "Landing Pages",
      tags: ["landing-pages", "presentations"],
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/work7.jpg-Ruw4at8IbBgY8jR0St1wMrNfu4SP0M.jpeg",
      description: "Complete UI/UX redesign for a proposal management platform",
    },
    {
      title: "Empowering The Decentralized Future",
      category: "Logos",
      tags: ["logos", "brand-guides"],
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/work1.jpg-283NdiN68Nm6S1Czvl00DYGgbl3Isc.jpeg",
      description: "Brand identity and visual system for blockchain startup",
    },
    {
      title: "Turn Meetings Into Action",
      category: "Social Media Design",
      tags: ["social-media-design", "display-ads"],
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/work6.jpg-mKGi4gdhGoxHdvMs7CLKBpGai7DqWP.jpeg",
      description: "Landing page and marketing materials for productivity app",
    },
    {
      title: "Unique Pages with AI",
      category: "Landing Pages",
      tags: ["landing-pages", "illustrations"],
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/work5.jpg-EJXZAbGsHfT0iB2FUjAEkD6lFtWWaF.jpeg",
      description: "AI-powered website builder interface design",
    },
    {
      title: "E-commerce Platform Redesign",
      category: "Landing Pages",
      tags: ["landing-pages", "icons"],
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/work.jpg-gjjY8seaPjhLEUs8IzFjhWu2HKCvcC.jpeg",
      description: "Modern e-commerce experience with seamless checkout",
    },
    {
      title: "Financial Dashboard",
      category: "Infographics",
      tags: ["infographics", "icons"],
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/work2.jpg-aQtQNU4Uoq2lVmpWc2DMus2L01woLa.jpeg",
      description: "Intuitive financial analytics dashboard",
    },
    {
      title: "Social Media Campaign",
      category: "Social Media Design",
      tags: ["social-media-design", "display-ads"],
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/work3.jpg-pa8TbG2nL9J92WCQ5eUr2cp69lQcF0.jpeg",
      description: "Complete social media graphics package",
    },
    {
      title: "Tech Startup Branding",
      category: "Brand Guides",
      tags: ["brand-guides", "logos"],
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/service1.jpg-C2KUzAV6udEUs2PeNY57mUMEZyQtjZ.jpeg",
      description: "Full brand identity including logo, colors, and guidelines",
    },
    {
      title: "Mobile App Interface Design",
      category: "Icons",
      tags: ["icons", "illustrations"],
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/service2.jpg-Ql0Ql0Ql0Ql0Ql0Ql0Ql0Ql0Ql0Ql.jpeg",
      description: "Clean and intuitive mobile app design with custom iconography",
    },
    {
      title: "Restaurant Menu Design",
      category: "Print Design",
      tags: ["print-design", "illustrations"],
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/service3.jpg-Ql0Ql0Ql0Ql0Ql0Ql0Ql0Ql0Ql0Ql.jpeg",
      description: "Elegant print menu design with custom illustrations",
    },
    {
      title: "Corporate Presentation Deck",
      category: "Presentations",
      tags: ["presentations", "infographics"],
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/service4.jpg-Ql0Ql0Ql0Ql0Ql0Ql0Ql0Ql0Ql0Ql.jpeg",
      description: "Professional presentation design for investor pitch",
    },
    {
      title: "Product Launch Campaign",
      category: "Display Ads",
      tags: ["display-ads", "social-media-design"],
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/service5.jpg-Ql0Ql0Ql0Ql0Ql0Ql0Ql0Ql0Ql0Ql.jpeg",
      description: "Multi-channel advertising campaign for product launch",
    },
    {
      title: "Animated Explainer Video",
      category: "Video Editing",
      tags: ["video-editing", "motion-graphics"],
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/service6.jpg-Ql0Ql0Ql0Ql0Ql0Ql0Ql0Ql0Ql0Ql.jpeg",
      description: "Engaging animated video explaining complex product features",
    },
    {
      title: "Custom Illustration Set",
      category: "Illustrations",
      tags: ["illustrations", "icons"],
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/service7.jpg-Ql0Ql0Ql0Ql0Ql0Ql0Ql0Ql0Ql0Ql.jpeg",
      description: "Unique illustration library for brand storytelling",
    },
    {
      title: "Business Stationary Package",
      category: "Stationary Sets",
      tags: ["stationary-sets", "print-design"],
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/service8.jpg-Ql0Ql0Ql0Ql0Ql0Ql0Ql0Ql0Ql0Ql.jpeg",
      description: "Complete stationary set including business cards and letterheads",
    },
    {
      title: "Motion Graphics Reel",
      category: "Motion Graphics",
      tags: ["motion-graphics", "video-editing"],
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/service9.jpg-Ql0Ql0Ql0Ql0Ql0Ql0Ql0Ql0Ql0Ql.jpeg",
      description: "Dynamic motion graphics for social media and advertising",
    },
  ]

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "social-media-design", label: "Social Media Design" },
    { id: "display-ads", label: "Display Ads" },
    { id: "logos", label: "Logos" },
    { id: "illustrations", label: "Illustrations" },
    { id: "print-design", label: "Print Design" },
    { id: "infographics", label: "Infographics" },
    { id: "icons", label: "Icons" },
    { id: "video-editing", label: "Video Editing" },
    { id: "brand-guides", label: "Brand Guides" },
    { id: "presentations", label: "Presentations" },
    { id: "motion-graphics", label: "Motion Graphics" },
    { id: "landing-pages", label: "Landing Pages" },
    { id: "stationary-sets", label: "Stationary Sets" },
  ]

  const filteredProjects =
    activeFilter === "all" ? projects : projects.filter((project) => project.tags.includes(activeFilter))

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setSelectedProject(null)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero Section */}
      <section className="lg:pt-[200px] pt-[120px]">
        <div className="container">
          <div className="md:w-[80%] mx-auto text-center">
            <h3 className="border border-[#bebebe] py-2.5 px-5 rounded-3xl md:text-base md:leading-5 text-sm inline-block font-normal mb-[5px]">
              <i className="ri-gallery-line"></i> Our Work
            </h3>
            <h1 className="lg:py-2.5 py-5 font-semibold xl:leading-[90px] xl:text-[80px] md:leading-[60px] md:text-[50px] leading-[50px] text-[40px]">
              Featured Projects
            </h1>
            <p className="text-xl leading-7 mb-[5px] text-black-100">
              Explore our portfolio of successful projects across various industries and design disciplines.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="lg:pt-25 pt-15">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === filter.id
                    ? "bg-primary text-white border-primary"
                    : "bg-transparent border border-[#bebebe] hover:border-primary"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
            {filteredProjects.map((project, index) => (
              <div key={index} className="group">
                <button onClick={() => setSelectedProject(project)} className="block w-full text-left">
                  <div className="rounded-lg overflow-hidden relative after:absolute after:left-0 after:top-0 after:w-full after:h-full after:bg-[linear-gradient(0deg,_rgba(0,0,0,.5),_transparent)] after:opacity-0 group-hover:after:opacity-100 after:transition-all after:duration-500">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="group-hover:blur-[1.5px] group-hover:scale-[1.04] transition-all duration-500 w-full h-[300px] object-cover"
                      loading="lazy"
                    />
                    <span className="absolute top-4 right-4 inline-block rounded-[32px] bg-[rgba(255,79,1,.8)] py-[7px] px-[14px] text-white text-sm uppercase tracking-wider leading-[30px] font-medium">
                      {project.category}
                    </span>
                    <div className="z-20 absolute left-7.5 right-7.5 -bottom-0 opacity-0 group-hover:opacity-100 group-hover:bottom-6 transition-all duration-500">
                      <h3 className="lg:text-xl text-lg font-semibold text-white mb-2">{project.title}</h3>
                      <p className="text-white text-sm">{project.description}</p>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-5xl w-full bg-background rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-300"
              aria-label="Close modal"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>

            {/* Image */}
            <div className="relative w-full h-[400px] md:h-[500px]">
              <Image
                src={selectedProject.image || "/placeholder.svg"}
                alt={selectedProject.title}
                fill
                className="object-cover"
              />
              <span className="absolute top-4 left-4 inline-block rounded-[32px] bg-primary py-[7px] px-[14px] text-white text-sm uppercase tracking-wider leading-[30px] font-medium">
                {selectedProject.category}
              </span>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">{selectedProject.title}</h2>
              <p className="text-lg md:text-xl text-black-100 leading-relaxed">{selectedProject.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Case Study Section */}
      <section className="lg:pt-25 pt-15">
        <div className="container">
          <div className="text-center pb-15">
            <h2 className="xl:leading-[90px] xl:text-[80px] md:leading-[60px] md:text-[50px] leading-[50px] text-[40px] text-black-100 font-medium">
              Featured Case Study
            </h2>
            <p className="md:text-xl md:leading-7 text-base mt-2">Deep dive into one of our recent projects</p>
          </div>

          <div className="lg:w-[90%] mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <Image
                  src="/images/design-mode/work7.jpg.jpeg"
                  alt="Case study"
                  width={600}
                  height={500}
                  className="rounded-[15px] w-full"
                />
              </div>
              <div>
                <div className="inline-block px-4 py-2 bg-primary text-white rounded-full text-sm font-medium mb-4">
                  Case Study
                </div>
                <h3 className="lg:text-[50px] lg:leading-[60px] text-[40px] leading-[50px] font-medium mb-5">
                  Proposal Management Platform Redesign
                </h3>
                <p className="text-lg leading-7 mb-6">
                  A complete UI/UX overhaul for a B2B SaaS platform that helps sales teams create winning proposals in
                  minutes. The challenge was to simplify a complex workflow while maintaining powerful features.
                </p>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-xl mb-2">The Challenge</h4>
                    <p className="text-base">
                      Users found the existing interface overwhelming and difficult to navigate. The proposal creation
                      process took too many steps and lacked visual appeal.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-xl mb-2">The Solution</h4>
                    <p className="text-base">
                      We redesigned the entire user flow, introduced a drag-and-drop builder, and created a modern
                      visual system that made the platform feel premium and easy to use.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-xl mb-2">The Results</h4>
                    <p className="text-base">
                      40% reduction in time to create proposals, 65% increase in user satisfaction, and 25% boost in
                      conversion rates.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 p-10 bg-black-200 rounded-[15px]">
              {[
                { metric: "40%", label: "Faster Workflow" },
                { metric: "65%", label: "User Satisfaction" },
                { metric: "25%", label: "Conversion Increase" },
                { metric: "3 Months", label: "Project Timeline" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-[50px] font-bold text-primary font-bricolage">{stat.metric}</div>
                  <p className="text-white text-lg" style={{ color: "#ffffff" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="lg:pt-25 pt-15">
        <div className="container">
          <div className="text-center pb-15">
            <h2 className="xl:leading-[90px] xl:text-[80px] md:leading-[60px] md:text-[50px] leading-[50px] text-[40px] text-black-100 font-medium">
              What Clients Say
            </h2>
            <p className="md:text-xl md:leading-7 text-base mt-2">Hear from businesses we've helped</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "DesignPro transformed our brand identity and helped us stand out in a crowded market. The unlimited revisions meant we got exactly what we wanted.",
                author: "Sarah Johnson",
                role: "CEO, TechStart",
                image:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/author1.jpg-zaVDi52IiHZ0QksaR7XJCDMigtTdz3.jpeg",
              },
              {
                quote:
                  "The speed and quality are unmatched. We went from concept to launch in record time thanks to their efficient process and talented team.",
                author: "Michael Chen",
                role: "Founder, GrowthLabs",
                image:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/author2.jpg-WE75ftb362gkegcVqI367nO9qm9vM7.jpeg",
              },
              {
                quote:
                  "Best design investment we've made. The subscription model gives us flexibility and the quality is consistently excellent.",
                author: "Emily Rodriguez",
                role: "Marketing Director, ScaleUp",
                image:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/author1.jpg-zaVDi52IiHZ0QksaR7XJCDMigtTdz3.jpeg",
              },
            ].map((testimonial, index) => (
              <div key={index} className="p-7.5 border border-[#bebebe] rounded-[15px]">
                <p className="text-lg leading-7 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.author}
                    width={60}
                    height={60}
                    className="rounded-full w-15 h-15"
                  />
                  <div>
                    <h4 className="font-medium text-lg">{testimonial.author}</h4>
                    <p className="text-base text-[rgb(119,119,125)]">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="lg:pt-25 pt-15">
        <div className="container">
          <div className="lg:w-[75%] mx-auto text-center lg:px-12.5 py-7.5 px-8 border border-[rgba(0,0,0,0.05)] rounded-[20px]">
            <h2 className="xl:leading-[90px] xl:text-[80px] md:leading-[60px] md:text-[50px] leading-[50px] text-[40px] text-black-100 font-normal">
              Ready to create your success story?
            </h2>
            <p className="md:text-xl md:leading-7 text-base mt-2">
              Join hundreds of businesses who trust DesignPro with their design needs.
            </p>
            <div className="mt-7.5">
              <Link
                href="/#pricing"
                className="btn bg-primary text-secondary border-primary hover:bg-black-200 hover:text-white"
              >
                See Pricing Plans
              </Link>
              <Link href="/contact" className="btn bg-black-200 text-white border-black-200 hover:text-primary">
                Book a free call
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="pt-12.5 pb-10">
          <div className="container">
            <div className="flex lg:flex-row flex-col items-center justify-between gap-y-4">
              <div className="copyright-text">
                <p>
                  Copyright{" "}
                  <Link href="/" className="text-primary">
                    &copy;DesignPro
                  </Link>{" "}
                  All Rights Reserved.
                </p>
              </div>
              <ul className="flex flex-wrap justify-center gap-x-7.5 gap-y-3">
                <li>
                  <Link href="/portfolio">Latest Project</Link>
                </li>
                <li>
                  <Link href="/#pricing">Pricing</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
                <li>
                  <Link href="/privacy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/terms">Terms & conditions</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
