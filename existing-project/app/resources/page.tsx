import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Resources | NoLimit Designs",
  description: "Design guides, templates, and resources to help you create better marketing materials.",
}

const resources = [
  {
    title: "Brand Guidelines Template",
    description: "A comprehensive template to document your brand identity, colors, typography, and usage rules.",
    category: "Template",
    icon: "ri-book-open-line",
  },
  {
    title: "Social Media Size Guide",
    description: "Up-to-date dimensions for all major social media platforms including Instagram, Facebook, and LinkedIn.",
    category: "Guide",
    icon: "ri-ruler-line",
  },
  {
    title: "Color Psychology in Marketing",
    description: "Learn how colors influence perception and how to choose the right palette for your brand.",
    category: "Guide",
    icon: "ri-palette-line",
  },
  {
    title: "Typography Best Practices",
    description: "Essential typography principles for creating readable, engaging, and professional designs.",
    category: "Guide",
    icon: "ri-font-size",
  },
  {
    title: "Video Marketing Checklist",
    description: "A complete checklist for planning, producing, and publishing effective marketing videos.",
    category: "Checklist",
    icon: "ri-video-line",
  },
  {
    title: "Design Brief Template",
    description: "Get better design results by providing clear briefs. Use this template for every request.",
    category: "Template",
    icon: "ri-file-text-line",
  },
]

const guides = [
  {
    title: "The Complete Guide to Social Media Design",
    description: "Everything you need to know about creating scroll-stopping social media graphics.",
    image: "/social-media-design-mockup.jpg",
    link: "/blog/design-tips-social-media",
  },
  {
    title: "Brand Identity Design Fundamentals",
    description: "Learn the foundations of building a strong, consistent brand identity.",
    image: "/brand-identity-design.jpg",
    link: "/blog/consistent-branding-builds-trust",
  },
  {
    title: "Video Content Strategy Guide",
    description: "How to plan and execute a video content strategy that drives results.",
    image: "/promotional-video-editing.jpg",
    link: "/blog/video-content-improves-engagement",
  },
]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="lg:pt-[180px] pt-[120px] pb-15">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <h3 className="border border-[#bebebe] py-2.5 px-5 rounded-3xl md:text-base md:leading-5 text-sm inline-block font-normal mb-[5px]">
              <i className="ri-folder-download-line text-primary"></i>
              Resources
            </h3>
            <h1 className="lg:py-2.5 py-5 font-semibold xl:leading-[90px] xl:text-[70px] md:leading-[60px] md:text-[50px] leading-[50px] text-[40px]">
              Design Resources & Guides
            </h1>
            <p className="text-xl leading-7 text-black-100">
              Free templates, guides, and resources to help you create better marketing materials.
            </p>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="pb-25">
        <div className="container">
          <h2 className="text-[40px] font-medium text-black-100 mb-10">Free Resources</h2>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {resources.map((resource, index) => (
              <div
                key={index}
                className="p-7.5 border border-[#bebebe] rounded-[15px] hover:border-primary transition-all duration-500"
              >
                <div className="w-15 h-15 rounded-full bg-primary flex items-center justify-center mb-5">
                  <i className={`${resource.icon} text-2xl text-white`}></i>
                </div>
                <span className="text-sm text-primary font-medium">{resource.category}</span>
                <h3 className="text-xl font-medium my-3">{resource.title}</h3>
                <p className="text-[rgb(119,119,125)] mb-5">{resource.description}</p>
                <button className="text-primary font-medium inline-flex items-center gap-2 hover:gap-3 transition-all">
                  Download Free <i className="ri-download-line"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Guides */}
      <section className="py-25 bg-[rgba(0,0,0,0.02)]">
        <div className="container">
          <h2 className="text-[40px] font-medium text-black-100 mb-10">Featured Guides</h2>
          <div className="grid lg:grid-cols-3 gap-6">
            {guides.map((guide, index) => (
              <Link key={index} href={guide.link}>
                <article className="bg-background border border-[#bebebe] rounded-[15px] overflow-hidden hover:border-primary transition-all duration-500 h-full flex flex-col">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={guide.image}
                      alt={guide.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-medium mb-3">{guide.title}</h3>
                    <p className="text-[rgb(119,119,125)] mb-4 flex-grow">{guide.description}</p>
                    <span className="text-primary font-medium inline-flex items-center gap-2 hover:gap-3 transition-all">
                      Read Guide <i className="ri-arrow-right-line"></i>
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-25">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-[40px] font-medium text-black-100 mb-6">Have Questions?</h2>
              <p className="text-lg mb-7.5">
                Check out our FAQ section for answers to common questions about our subscription service, design
                process, and more.
              </p>
              <Link
                href="/#faqs"
                className="btn bg-primary text-secondary border-primary hover:bg-black-200 hover:text-white"
              >
                View FAQs <i className="ri-question-line ml-2"></i>
              </Link>
            </div>
            <div className="space-y-4">
              {[
                "What does unlimited design mean?",
                "How fast will my designs be delivered?",
                "Can I pause my subscription?",
                "Who owns the final files?",
              ].map((question, index) => (
                <Link
                  key={index}
                  href="/#faqs"
                  className="flex items-center justify-between p-5 border border-[#bebebe] rounded-lg hover:border-primary transition-all"
                >
                  <span className="font-medium">{question}</span>
                  <i className="ri-arrow-right-line text-primary"></i>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-25">
        <div className="container">
          <div className="lg:w-[75%] mx-auto text-center lg:px-12.5 py-7.5 px-8 border border-[rgba(0,0,0,0.05)] rounded-[20px]">
            <h2 className="xl:text-[60px] md:text-[50px] text-[40px] text-black-100 font-normal">
              Need help with your design?
            </h2>
            <p className="md:text-xl md:leading-7 text-base mt-2">
              Let our team handle your design needs so you can focus on growing your business.
            </p>
            <div className="mt-7.5">
              <Link
                href="/#pricing"
                className="btn bg-primary text-secondary border-primary hover:bg-black-200 hover:text-white"
              >
                See Pricing Plans
              </Link>
              <Link href="/contact" className="btn bg-black-200 text-white border-black-200 hover:text-primary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
