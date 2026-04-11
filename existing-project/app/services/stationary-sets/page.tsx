"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function StationarySetsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

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
                    href="/portfolio"
                    className="text-[#dedede] font-medium font-bricolage px-5 py-2.5 inline-block hover:text-[#ff4f01] transition-all duration-500"
                  >
                    Portfolio
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
                    href="/about"
                    className="text-[#dedede] font-medium font-bricolage px-5 py-2.5 inline-block hover:text-[#ff4f01] transition-all duration-500"
                  >
                    About
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
      <section className="lg:pt-[200px] pt-[120px] pb-15">
        <div className="container">
          <div className="md:w-[80%] mx-auto text-center">
            <h1 className="lg:py-2.5 py-5 font-semibold xl:leading-[90px] xl:text-[80px] md:leading-[60px] md:text-[50px] leading-[50px] text-[40px]">
              Stationary Sets
              <br />
              <span className="text-primary">Design Services</span>
            </h1>
            <p className="text-xl leading-7 mb-[5px] text-black-100 max-w-2xl mx-auto">
              Create a cohesive professional identity with custom stationary sets. From business cards to letterheads,
              get complete branded stationery that makes every touchpoint count.
            </p>
            <div className="mt-7.5">
              <Link
                href="/#pricing"
                className="btn bg-primary text-secondary border-primary hover:bg-black-200 hover:text-white"
              >
                Request a stationary set
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
            <p className="md:text-xl md:leading-7 text-base mt-2">
              Complete branded stationery for professional business communication
            </p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {[
              {
                icon: "ri-bank-card-line",
                title: "Business Cards",
                description: "Professional business cards with your branding, contact info, and unique design",
              },
              {
                icon: "ri-file-text-line",
                title: "Letterheads",
                description: "Branded letterhead templates for official correspondence and documents",
              },
              {
                icon: "ri-mail-line",
                title: "Envelopes",
                description: "Custom envelope designs in multiple sizes to match your letterhead",
              },
              {
                icon: "ri-sticky-note-line",
                title: "Notepads",
                description: "Branded notepads and memo pads for internal and external use",
              },
              {
                icon: "ri-folder-line",
                title: "Folders",
                description: "Presentation folders to organize and present documents professionally",
              },
              {
                icon: "ri-file-copy-line",
                title: "Compliment Slips",
                description: "Small branded slips for quick notes and informal correspondence",
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

      {/* Latest Stationary Sets Gallery */}
      <section className="pb-15">
        <div className="container">
          <h2 className="text-center xl:text-[60px] md:text-[45px] text-[35px] font-medium mb-10 mt-28">
            Our latest stationary sets
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-[15px] overflow-hidden border border-[#bebebe]">
                <Image
                  src={`/stationary-set-design-example-.jpg?height=500&width=400&query=stationary set design example ${i}`}
                  alt={`Stationary set ${i}`}
                  width={400}
                  height={500}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/portfolio" className="text-primary font-medium text-lg hover:underline">
              ALL OUR WORK →
            </Link>
          </div>
        </div>
      </section>

      {/* Stationary Components */}
      <section className="py-15">
        <div className="container">
          <h2 className="text-center xl:text-[60px] md:text-[45px] text-[35px] font-medium mb-15">
            Everything included in your stationary set
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Business Cards",
                description:
                  "Professional business cards with your logo, contact information, and brand colors. Available in standard and premium finishes.",
                image: "/modern-business-card.png",
              },
              {
                title: "Letterheads",
                description:
                  "Branded letterhead templates for official correspondence, featuring your logo, address, and contact details.",
                image: "/letterhead-design.jpg",
              },
              {
                title: "Envelopes",
                description:
                  "Custom envelope designs in multiple sizes (DL, C5, C4) with your branding and return address.",
                image: "/envelope-design.jpg",
              },
              {
                title: "Notepads",
                description: "Branded notepads and memo pads with your logo and design elements for everyday use.",
                image: "/notepad-design.jpg",
              },
              {
                title: "Presentation Folders",
                description:
                  "Professional folders to organize proposals, presentations, and important documents with style.",
                image: "/presentation-folder-design.jpg",
              },
              {
                title: "Compliment Slips",
                description:
                  "Small branded slips (DL size) perfect for quick notes, thank you messages, and informal correspondence.",
                image: "/compliment-slip-design.jpg",
              },
              {
                title: "Invoice Templates",
                description:
                  "Professional invoice templates with your branding for billing and financial documentation.",
                image: "/invoice-template-design.jpg",
              },
              {
                title: "Email Signatures",
                description: "HTML email signatures that match your stationery design for consistent digital branding.",
                image: "/email-signature-design.jpg",
              },
              {
                title: "Shipping Labels",
                description: "Custom shipping labels and stickers with your branding for packages and mailings.",
                image: "/shipping-label-design.jpg",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="border border-[#bebebe] rounded-[15px] overflow-hidden hover:border-primary transition-all duration-500"
              >
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  width={400}
                  height={300}
                  className="w-full h-auto"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-medium mb-3">{item.title}</h3>
                  <p className="text-black-100">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-15 bg-[#fff6ec]">
        <div className="container">
          <h2 className="text-center xl:text-[60px] md:text-[45px] text-[35px] font-medium mb-15">
            Thousands of happy customers
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-[20px] p-10 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <Image src="/customer-avatar.png" alt="Customer" width={60} height={60} className="rounded-full" />
                <div>
                  <h4 className="font-medium text-xl">Professional and cohesive!</h4>
                  <p className="text-primary">Sarah Johnson - Marketing Director</p>
                </div>
              </div>
              <p className="text-lg leading-relaxed text-black-100">
                "The stationary set DesignPro created for us is absolutely perfect. Every piece works together
                beautifully, and the quality is outstanding. Our clients have commented on how professional our
                materials look. It's made such a difference in how we present ourselves."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-15">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="grid md:grid-cols-2 gap-8 items-center mb-10">
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Image
                    key={i}
                    src={`/stationary-design-.jpg?height=250&width=200&query=stationary design ${i}`}
                    alt={`Stationary ${i}`}
                    width={200}
                    height={250}
                    className="rounded-[10px]"
                  />
                ))}
              </div>
              <div className="text-left">
                <h2 className="text-4xl font-medium mb-4">Stationary sets are included in all our plans</h2>
                <p className="text-lg text-black-100 mb-6">
                  All plans include unlimited stationary requests, unlimited revisions, and cancel anytime.
                </p>
                <Link
                  href="/#pricing"
                  className="btn bg-primary text-secondary border-primary hover:bg-black-200 hover:text-white inline-block"
                >
                  See Plans
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-15 bg-[#fff6ec]">
        <div className="container">
          <h2 className="text-center xl:text-[60px] md:text-[45px] text-[35px] font-medium mb-15">F.A.Q</h2>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "What items are included in a stationary set?",
                answer:
                  "A complete stationary set includes business cards, letterheads, envelopes, notepads, presentation folders, compliment slips, invoice templates, email signatures, and shipping labels.",
              },
              {
                question: "Can I order individual items instead of the full set?",
                answer:
                  "Yes! You can request any individual items from the stationary set. We're flexible and can create exactly what you need.",
              },
              {
                question: "Will all items match my brand identity?",
                answer:
                  "We ensure all stationary items are cohesive and consistent with your brand colors, fonts, and overall identity.",
              },
              {
                question: "Do you provide print-ready files?",
                answer:
                  "Yes, we deliver high-resolution, print-ready files with proper bleed, crop marks, and specifications for professional printing.",
              },
              {
                question: "How long does it take to complete a stationary set?",
                answer:
                  "Most stationary sets are completed within 3-5 business days, depending on the number of items and complexity.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-[10px] overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-lg">{faq.question}</span>
                  <i className={`ri-${openFaq === index ? "subtract" : "add"}-line text-2xl text-primary`}></i>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-black-100">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary">
        <div className="container">
          <div className="text-center">
            <h2 className="xl:text-[70px] md:text-[50px] text-[40px] font-semibold mb-4 text-secondary leading-[3.75rem] tracking-normal">
              Send your request today.
              <br />
              Get your stationary set tomorrow.
            </h2>
            <div className="mt-8">
              <Link
                href="/#pricing"
                className="btn bg-secondary text-primary border-secondary hover:bg-black-200 hover:text-white"
              >
                Get started
              </Link>
              <Link
                href="/contact"
                className="btn bg-black-200 text-white border-black-200 hover:bg-secondary hover:text-primary ml-4"
              >
                Book a call
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
                  <Link href="/portfolio">Portfolio</Link>
                </li>
                <li>
                  <Link href="/how-it-works">How It Works</Link>
                </li>
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/#pricing">Pricing</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
