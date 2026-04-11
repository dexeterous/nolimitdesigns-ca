"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function MotionGraphicsPage() {
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
              <i className="ri-movie-2-line"></i> Motion Graphics Services
            </h3>
            <h1 className="lg:py-2.5 py-5 font-semibold xl:leading-[90px] xl:text-[80px] md:leading-[60px] md:text-[50px] leading-[50px] text-[40px]">
              Bring Your Brand to Life with Motion
            </h1>
            <p className="text-xl leading-7 mb-[5px] text-black-100">
              Create engaging animated content for social media, ads, explainer videos, and more with unlimited motion
              design.
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
            <p className="md:text-xl md:leading-7 text-base mt-2">Professional motion graphics for every platform</p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {[
              {
                icon: "ri-video-line",
                title: "Explainer Videos",
                description: "Animated videos that explain your product, service, or concept clearly",
              },
              {
                icon: "ri-image-add-line",
                title: "Social Media Videos",
                description: "Short-form content for Instagram, TikTok, Facebook, and LinkedIn",
              },
              {
                icon: "ri-advertisement-line",
                title: "Video Ads",
                description: "Animated ads for YouTube, Facebook, Instagram, and display networks",
              },
              {
                icon: "ri-contrast-drop-line",
                title: "Logo Animations",
                description: "Animated logo reveals, intros, and outros for videos",
              },
              {
                icon: "ri-slideshow-3-line",
                title: "Animated Presentations",
                description: "Dynamic slides with transitions, animations, and motion elements",
              },
              {
                icon: "ri-gif-line",
                title: "GIFs & Micro-animations",
                description: "Looping animations, loading states, and UI micro-interactions",
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

      {/* Video Formats */}
      <section className="lg:pt-25 pt-15">
        <div className="container">
          <div className="text-center pb-15">
            <h2 className="xl:leading-[90px] xl:text-[80px] md:leading-[60px] md:text-[50px] leading-[50px] text-[40px] text-black-100 font-medium">
              Video Formats We Create
            </h2>
            <p className="md:text-xl md:leading-7 text-base mt-2">Optimized for every platform and use case</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {[
              {
                title: "Social Media",
                formats: "Square (1:1), Vertical (9:16), Horizontal (16:9), Stories (9:16)",
                platforms: "Instagram, Facebook, TikTok, LinkedIn, Twitter",
                icon: "ri-smartphone-line",
              },
              {
                title: "Video Ads",
                formats: "Pre-roll, Mid-roll, Bumper ads (6s), Standard (15-30s)",
                platforms: "YouTube, Facebook Ads, Instagram Ads, Display Networks",
                icon: "ri-advertisement-line",
              },
              {
                title: "Website & Landing Pages",
                formats: "Hero videos, Background videos, Product demos, Testimonials",
                platforms: "Website headers, Landing pages, Product pages",
                icon: "ri-computer-line",
              },
              {
                title: "Email & Newsletters",
                formats: "Animated GIFs, Cinemagraphs, Email headers",
                platforms: "Email campaigns, Newsletters, Drip sequences",
                icon: "ri-mail-line",
              },
            ].map((format, index) => (
              <div key={index} className="p-7.5 border border-[#bebebe] rounded-[15px]">
                <div className="flex items-start gap-5">
                  <div className="shrink-0">
                    <div className="w-15 h-15 rounded-full bg-primary flex items-center justify-center">
                      <i className={`${format.icon} text-2xl text-white`}></i>
                    </div>
                  </div>
                  <div>
                    <h3 className="lg:text-3xl text-[26px] font-medium mb-3">{format.title}</h3>
                    <p className="text-base mb-2">
                      <strong>Formats:</strong> {format.formats}
                    </p>
                    <p className="text-base">
                      <strong>Platforms:</strong> {format.platforms}
                    </p>
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
              Ready to add motion to your brand?
            </h2>
            <p className="md:text-xl md:leading-7 text-base mt-2">
              Get unlimited motion graphics and video design to engage your audience.
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
