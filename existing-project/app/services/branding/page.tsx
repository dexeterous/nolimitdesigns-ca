"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function BrandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header id="header" className="fixed top-0 py-5 w-full z-50 bg-background transition-all duration-500">
        <div className="container">
          <div className="flex justify-between items-center">
            <Link href="/">
              <Image
                src="/images/design-mode/logo(1).png"
                alt="logo"
                width={160}
                height={40}
                className="lg:max-w-[160px] max-w-[120px]"
              />
            </Link>
            <div className="text-3xl mt-1 cursor-pointer block lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <i className="ri-menu-line"></i>
            </div>
            <nav
              className={`lg:bg-secondary bg-black-300 lg:rounded-[50px] lg:static absolute left-0 top-16 z-50 w-full ${isMenuOpen ? "max-h-96 opacity-100 visible" : "max-h-0 opacity-0 invisible"} lg:max-h-full lg:opacity-100 lg:visible lg:w-auto transition-all duration-500 ease-linear overflow-hidden`}
            >
              <ul className="flex lg:flex-row flex-col">
                <li className="border-b border-b-[#ff4f01] lg:border-b-0">
                  <Link
                    href="/#how"
                    className="text-[#dedede] font-medium font-bricolage px-5 py-2.5 inline-block hover:text-[#ff4f01] transition-all duration-500"
                  >
                    How It Works
                  </Link>
                </li>
                <li className="border-b border-b-[#ff4f01] lg:border-b-0">
                  <Link
                    href="/#services"
                    className="text-[#dedede] font-medium font-bricolage px-5 py-2.5 inline-block hover:text-[#ff4f01] transition-all duration-500"
                  >
                    Services
                  </Link>
                </li>
                <li className="border-b border-b-[#ff4f01] lg:border-b-0">
                  <Link
                    href="/#projects"
                    className="text-[#dedede] font-medium font-bricolage px-5 py-2.5 inline-block hover:text-[#ff4f01] transition-all duration-500"
                  >
                    Projects
                  </Link>
                </li>
                <li className="border-b border-b-[#ff4f01] lg:border-b-0">
                  <Link
                    href="/#pricing"
                    className="text-[#dedede] font-medium font-bricolage px-5 py-2.5 inline-block hover:text-[#ff4f01] transition-all duration-500"
                  >
                    Pricing
                  </Link>
                </li>
                <li className="border-b border-b-[#ff4f01] lg:border-b-0">
                  <Link
                    href="/contact"
                    className="text-[#dedede] font-medium font-bricolage px-5 py-2.5 inline-block hover:text-[#ff4f01] transition-all duration-500"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="lg:pt-[200px] pt-[120px]">
        <div className="container">
          <div className="md:w-[80%] mx-auto text-center">
            <h3 className="border border-[#bebebe] py-2.5 px-5 rounded-3xl md:text-base md:leading-5 text-sm inline-block font-normal mb-[5px]">
              <i className="ri-star-line"></i> Branding Services
            </h3>
            <h1 className="lg:py-2.5 py-5 font-semibold xl:leading-[90px] xl:text-[80px] md:leading-[60px] md:text-[50px] leading-[50px] text-[40px]">
              Build a Brand That Stands Out
            </h1>
            <p className="text-xl leading-7 mb-[5px] text-black-100">
              From logos to complete brand identities, create a memorable brand with unlimited design requests and
              revisions.
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
            <p className="md:text-xl md:leading-7 text-base mt-2">Complete branding services for your business</p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {[
              {
                icon: "ri-contrast-drop-2-line",
                title: "Logo Design",
                description: "Primary logos, logo variations, submarks, and brand marks",
              },
              {
                icon: "ri-palette-line",
                title: "Brand Identity",
                description: "Color palettes, typography systems, and visual style guidelines",
              },
              {
                icon: "ri-file-text-line",
                title: "Brand Guidelines",
                description: "Comprehensive brand books documenting all brand elements and usage",
              },
              {
                icon: "ri-id-card-line",
                title: "Business Cards",
                description: "Professional business card designs in multiple formats",
              },
              {
                icon: "ri-file-paper-line",
                title: "Stationery",
                description: "Letterheads, envelopes, email signatures, and document templates",
              },
              {
                icon: "ri-t-shirt-line",
                title: "Brand Collateral",
                description: "Packaging, merchandise, signage, and branded materials",
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

      {/* Branding Process */}
      <section className="lg:pt-25 pt-15">
        <div className="container">
          <div className="text-center pb-15">
            <h2 className="xl:leading-[90px] xl:text-[80px] md:leading-[60px] md:text-[50px] leading-[50px] text-[40px] text-black-100 font-medium">
              Our Branding Process
            </h2>
            <p className="md:text-xl md:leading-7 text-base mt-2">From strategy to execution</p>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
            {[
              {
                icon: "ri-search-line",
                title: "Research",
                description: "Understand your business, audience, competitors, and market positioning",
              },
              {
                icon: "ri-lightbulb-line",
                title: "Strategy",
                description: "Define brand personality, values, messaging, and visual direction",
              },
              {
                icon: "ri-pencil-line",
                title: "Design",
                description: "Create logo concepts, color palettes, typography, and brand elements",
              },
              {
                icon: "ri-book-open-line",
                title: "Guidelines",
                description: "Document everything in a comprehensive brand style guide",
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 rounded-full border-2 border-primary flex items-center justify-center mx-auto mb-5">
                  <i className={`${step.icon} text-3xl text-primary`}></i>
                </div>
                <h4 className="lg:text-2xl text-xl font-medium mb-3">{step.title}</h4>
                <p className="text-base">{step.description}</p>
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
              Ready to build your brand?
            </h2>
            <p className="md:text-xl md:leading-7 text-base mt-2">
              Get unlimited branding design to create a memorable identity for your business.
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
