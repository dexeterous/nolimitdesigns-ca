"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"

export default function GraphicDesignPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero Section */}
      <section className="lg:pt-[200px] pt-[120px]">
        <div className="container">
          <div className="md:w-[80%] mx-auto text-center">
            <h3 className="border border-[#bebebe] py-2.5 px-5 rounded-3xl md:text-base md:leading-5 text-sm inline-block font-normal mb-[5px]">
              <i className="ri-palette-line"></i> Graphic Design Services
            </h3>
            <h1 className="lg:py-2.5 py-5 font-semibold xl:leading-[90px] xl:text-[80px] md:leading-[60px] md:text-[50px] leading-[50px] text-[40px]">
              Unlimited Graphic Design for Your Brand
            </h1>
            <p className="text-xl leading-7 mb-[5px] text-black-100">
              From social media graphics to print materials, get all your graphic design needs covered with unlimited
              requests and revisions.
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

      {/* What's Included */}
      <section className="lg:pt-25 pt-15">
        <div className="container">
          <div className="text-center pb-15">
            <h2 className="xl:leading-[90px] xl:text-[80px] md:leading-[60px] md:text-[50px] leading-[50px] text-[40px] text-black-100 font-medium">
              What's Included
            </h2>
            <p className="md:text-xl md:leading-7 text-base mt-2">Everything you need for stunning graphic design</p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {[
              {
                icon: "ri-image-line",
                title: "Social Media Graphics",
                description: "Instagram posts, Facebook covers, Twitter headers, LinkedIn banners, and more",
              },
              {
                icon: "ri-advertisement-line",
                title: "Digital Ads",
                description: "Display ads, banner ads, Google Ads, Facebook Ads, and retargeting campaigns",
              },
              {
                icon: "ri-file-text-line",
                title: "Print Materials",
                description: "Brochures, flyers, business cards, posters, and promotional materials",
              },
              {
                icon: "ri-book-open-line",
                title: "Ebooks & Reports",
                description: "Professional layouts for ebooks, whitepapers, case studies, and reports",
              },
              {
                icon: "ri-mail-line",
                title: "Email Graphics",
                description: "Email headers, newsletter templates, promotional email designs",
              },
              {
                icon: "ri-presentation-line",
                title: "Infographics",
                description: "Data visualization, process diagrams, comparison charts, and timelines",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center py-15 px-7.5 rounded-[15px] border border-[#bebebe] hover:border-primary transition-all duration-500"
              >
                <i className={`${item.icon} text-[50px] text-primary`}></i>
                <h4 className="lg:text-3xl lg:leading-[49px] text-[26px] font-medium my-3">{item.title}</h4>
                <p className="lg:text-lg text-base font-medium">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="lg:pt-25 pt-15">
        <div className="container">
          <div className="text-center pb-15">
            <h2 className="xl:leading-[90px] xl:text-[80px] md:leading-[60px] md:text-[50px] leading-[50px] text-[40px] text-black-100 font-medium">
              Perfect For
            </h2>
            <p className="md:text-xl md:leading-7 text-base mt-2">Who benefits from unlimited graphic design?</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {[
              {
                title: "Marketing Teams",
                description:
                  "Keep your campaigns running with constant flow of fresh graphics for ads, social media, and email marketing.",
                image: "/marketing-team-working-on-graphics.jpg",
              },
              {
                title: "Startups & Scale-ups",
                description:
                  "Build your brand identity and marketing materials without the overhead of hiring a full-time designer.",
                image: "/startup-team-collaborating.jpg",
              },
              {
                title: "Agencies",
                description:
                  "Extend your design capacity for client work without hiring additional staff or managing freelancers.",
                image: "/creative-agency-workspace.jpg",
              },
              {
                title: "E-commerce Brands",
                description:
                  "Create product graphics, promotional banners, seasonal campaigns, and social content at scale.",
                image: "/ecommerce-product-graphics.jpg",
              },
            ].map((useCase, index) => (
              <div key={index} className="border border-[#bebebe] rounded-[15px] overflow-hidden">
                <Image
                  src={useCase.image || "/placeholder.svg"}
                  alt={useCase.title}
                  width={500}
                  height={300}
                  className="w-full h-[250px] object-cover"
                />
                <div className="p-7.5">
                  <h3 className="lg:text-3xl text-[26px] font-medium mb-3">{useCase.title}</h3>
                  <p className="lg:text-lg text-base">{useCase.description}</p>
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
              Ready to get unlimited graphic design?
            </h2>
            <p className="md:text-xl md:leading-7 text-base mt-2">
              Subscribe today and start submitting your design requests within 24 hours.
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
                  <Link href="/#projects">Latest Project</Link>
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
