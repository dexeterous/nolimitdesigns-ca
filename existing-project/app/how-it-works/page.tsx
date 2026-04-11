"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function HowItWorksPage() {
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
                    href="/how-it-works"
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
              <i className="ri-lightbulb-line"></i> How It Works
            </h3>
            <h1 className="lg:py-2.5 py-5 font-semibold xl:leading-[90px] xl:text-[80px] md:leading-[60px] md:text-[50px] leading-[50px] text-[40px]">
              Design Made Simple
            </h1>
            <p className="text-xl leading-7 mb-[5px] text-black-100">
              Subscribe, request designs, and get unlimited revisions. It's that simple. No contracts, no surprises.
            </p>
          </div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="lg:pt-25 pt-15">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-x-6 gap-y-12.5">
            {[
              {
                icon: "ri-shake-hands-line",
                number: "01",
                title: "Subscribe to a Plan",
                description:
                  "Choose the plan that fits your needs. Get instant access to your private Trello board within 24 hours where you can start adding design requests.",
                features: [
                  "Instant setup",
                  "Private Trello board",
                  "No onboarding calls required",
                  "Start immediately",
                ],
              },
              {
                icon: "ri-global-fill",
                number: "02",
                title: "Request Designs",
                description:
                  "Add as many design requests as you want to your queue. We'll work on them one at a time (or two for Premium) and deliver in 1-2 business days.",
                features: ["Unlimited requests", "Clear prioritization", "Fast turnaround", "Regular updates"],
              },
              {
                icon: "ri-stack-line",
                number: "03",
                title: "Revise & Approve",
                description:
                  "Review the designs and request unlimited revisions until you're 100% satisfied. Once approved, we move to the next request in your queue.",
                features: ["Unlimited revisions", "Direct feedback", "Quick iterations", "100% satisfaction"],
              },
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center relative sm:px-[25px] px-0">
                <div className="lg:w-[65px] lg:h-[65px] w-12.5 h-12.5 rounded-full flex items-center justify-center border border-[rgba(0,0,0,.08)] relative">
                  <i className={`${step.icon} text-[25px]`}></i>
                  <div className="overlay-list absolute -right-2 -top-2 bg-primary flex justify-center items-center text-white lg:w-7.5 lg:h-7.5 w-6 h-6 rounded-full">
                    <span className="lg:font-medium text-sm">{step.number}</span>
                  </div>
                </div>
                <div className="lg:pt-6 pt-5">
                  <h3 className="lg:text-[32px] text-[26px] lg:leading-[30px] font-bold mb-4">{step.title}</h3>
                  <p className="text-lg font-medium leading-7 mb-5">{step.description}</p>
                  <ul className="text-left space-y-2">
                    {step.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <i className="ri-check-line text-primary"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Workflow */}
      <section className="lg:pt-25 pt-15">
        <div className="container">
          <div className="text-center pb-15">
            <h2 className="xl:leading-[90px] xl:text-[80px] md:leading-[60px] md:text-[50px] leading-[50px] text-[40px] text-black-100 font-medium">
              Your Design Workflow
            </h2>
            <p className="md:text-xl md:leading-7 text-base mt-2">
              A transparent, efficient process from request to delivery
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                step: "Step 1",
                title: "Submit Your Request",
                description:
                  "Add your design request to Trello with as much detail as you'd like. Include references, brand guidelines, copy, and any specific requirements.",
                icon: "ri-file-add-line",
              },
              {
                step: "Step 2",
                title: "We Start Designing",
                description:
                  "Your dedicated designer begins work immediately. You'll see the card move to 'In Progress' and receive updates along the way.",
                icon: "ri-pencil-ruler-2-line",
              },
              {
                step: "Step 3",
                title: "Review the Design",
                description:
                  "Within 1-2 business days, we'll deliver the first version. Review it directly in Trello and provide your feedback.",
                icon: "ri-eye-line",
              },
              {
                step: "Step 4",
                title: "Request Revisions",
                description:
                  "Not quite right? No problem. Request as many revisions as you need. We'll iterate until you're completely satisfied.",
                icon: "ri-refresh-line",
              },
              {
                step: "Step 5",
                title: "Approve & Download",
                description:
                  "Once you're happy, approve the design and download all files. We'll move on to your next request in the queue.",
                icon: "ri-download-line",
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-6 p-7.5 border border-[#bebebe] rounded-[15px]">
                <div className="shrink-0">
                  <div className="w-15 h-15 rounded-full bg-primary flex items-center justify-center">
                    <i className={`${item.icon} text-2xl text-white`}></i>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-primary font-medium mb-1">{item.step}</div>
                  <h3 className="lg:text-3xl text-[26px] font-medium mb-3">{item.title}</h3>
                  <p className="lg:text-lg text-base">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="lg:pt-25 pt-15">
        <div className="container">
          <div className="text-center pb-15">
            <h2 className="xl:leading-[90px] xl:text-[80px] md:leading-[60px] md:text-[50px] leading-[50px] text-[40px] text-black-100 font-medium">
              What You Get
            </h2>
            <p className="md:text-xl md:leading-7 text-base mt-2">Everything included in your subscription</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {[
              {
                title: "Dedicated Design Team",
                description:
                  "Work with the same designers who learn your brand, style, and preferences over time for consistent results.",
                icon: "ri-team-line",
              },
              {
                title: "Private Trello Board",
                description:
                  "Manage all your requests in one organized place. See what's in progress, what's queued, and what's completed.",
                icon: "ri-trello-line",
              },
              {
                title: "Weekly Sync Calls",
                description:
                  "Optional weekly video calls to discuss upcoming projects, provide feedback, and align on priorities.",
                icon: "ri-video-chat-line",
              },
              {
                title: "Private Slack Channel",
                description:
                  "Direct communication with your design team for quick questions, updates, and real-time collaboration.",
                icon: "ri-slack-line",
              },
              {
                title: "Source Files Included",
                description:
                  "Get all the source files (Figma, AI, PSD, etc.) along with export-ready formats for every design.",
                icon: "ri-file-line",
              },
              {
                title: "Fast Turnaround",
                description:
                  "Most requests delivered in 1-2 business days. Smaller tasks can be completed even faster.",
                icon: "ri-timer-flash-line",
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-5 p-7.5 border border-[#bebebe] rounded-[15px]">
                <div className="shrink-0">
                  <div className="w-15 h-15 rounded-full bg-primary flex items-center justify-center">
                    <i className={`${item.icon} text-2xl text-white`}></i>
                  </div>
                </div>
                <div>
                  <h3 className="lg:text-3xl text-[26px] font-medium mb-3">{item.title}</h3>
                  <p className="lg:text-lg text-base">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flexibility */}
      <section className="lg:pt-25 pt-15">
        <div className="container">
          <div className="text-center pb-15">
            <h2 className="xl:leading-[90px] xl:text-[80px] md:leading-[60px] md:text-[50px] leading-[50px] text-[40px] text-black-100 font-medium">
              Total Flexibility
            </h2>
            <p className="md:text-xl md:leading-7 text-base mt-2">Pause or cancel anytime, no questions asked</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {[
              {
                icon: "ri-pause-circle-line",
                title: "Pause Anytime",
                description:
                  "Need to pause? No problem. Pause your subscription and resume whenever you're ready. Your unused time rolls over.",
              },
              {
                icon: "ri-close-circle-line",
                title: "Cancel Anytime",
                description:
                  "No long-term contracts or commitments. Cancel your subscription at any time with no penalties or fees.",
              },
              {
                icon: "ri-arrow-up-down-line",
                title: "Switch Plans",
                description:
                  "Upgrade or downgrade between Standard and Premium plans as your needs change. Completely flexible.",
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

      {/* CTA Section */}
      <section className="lg:pt-25 pt-15">
        <div className="container">
          <div className="lg:w-[75%] mx-auto text-center lg:px-12.5 py-7.5 px-8 border border-[rgba(0,0,0,0.05)] rounded-[20px]">
            <h2 className="xl:leading-[90px] xl:text-[80px] md:leading-[60px] md:text-[50px] leading-[50px] text-[40px] text-black-100 font-normal">
              Ready to get started?
            </h2>
            <p className="md:text-xl md:leading-7 text-base mt-2">
              Choose your plan and start submitting design requests within 24 hours.
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
