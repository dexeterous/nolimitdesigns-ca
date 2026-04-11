"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function LogosPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-background">
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
              Logo
              <br />
              <span className="text-primary">Design Services</span>
            </h1>
            <p className="text-xl leading-7 mb-[5px] text-black-100 max-w-2xl mx-auto">
              Transform your brand with stunning logo designs. From modern wordmarks to iconic symbols, get your perfect
              logo ready in a few clicks!
            </p>
            <div className="mt-7.5">
              <Link
                href="/#pricing"
                className="btn bg-primary text-secondary border-primary hover:bg-black-200 hover:text-white"
              >
                Request a design
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Designs Gallery */}
      <section className="pb-15">
        <div className="container">
          <h2 className="text-center xl:text-[60px] md:text-[45px] text-[35px] font-medium mb-10">
            Our latest logo designs
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { src: "/modern-tech-startup-logo-design.jpg", alt: "Tech Startup Logo" },
              { src: "/elegant-restaurant-logo-design.jpg", alt: "Restaurant Logo" },
              { src: "/creative-agency-logo-design.jpg", alt: "Creative Agency Logo" },
            ].map((item, i) => (
              <div key={i} className="rounded-[15px] overflow-hidden border border-[#bebebe]">
                <Image
                  src={item.src || "/placeholder.svg"}
                  alt={item.alt}
                  width={600}
                  height={400}
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

      {/* Benefits Section */}
      

      {/* Specific Design Types */}
      <section className="py-15">
        <div className="container">
          <h2 className="text-center xl:text-[60px] md:text-[45px] text-[35px] font-medium mb-15">
            One place for all your logo needs
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Wordmark Logos",
                description: "Clean, typography-based logos that make your brand name the star of the show.",
                image: "/wordmark-logo-design.jpg",
              },
              {
                title: "Icon Logos",
                description: "Memorable symbols and marks that represent your brand visually and instantly.",
                image: "/icon-logo-design-symbol.jpg",
              },
              {
                title: "Combination Marks",
                description: "Perfect blend of text and symbol for maximum brand impact and versatility.",
                image: "/combination-logo-design.jpg",
              },
              {
                title: "Emblem Logos",
                description: "Traditional badge-style logos with text inside a symbol for a classic look.",
                image: "/emblem-logo-design-badge.jpg",
              },
              {
                title: "Mascot Logos",
                description: "Character-based logos that bring personality and fun to your brand identity.",
                image: "/mascot-logo-design-character.jpg",
              },
              {
                title: "Abstract Logos",
                description: "Unique geometric forms that create distinctive and modern brand identity.",
                image: "/abstract-logo-design-geometric.jpg",
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
      <section className="py-15 bg-secondary">
        <div className="container">
          <h2 className="text-center xl:text-[60px] md:text-[45px] text-[35px] font-medium mb-15">
            <span className="text-white">Thousands of happy customers</span>
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-[20px] p-10 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <Image src="/customer-avatar.png" alt="Customer" width={60} height={60} className="rounded-full" />
                <div>
                  <h4 className="font-medium text-xl">Loved working with DesignPro!</h4>
                  <p className="text-primary">Sarah - Tech Startup Founder</p>
                </div>
              </div>
              <p className="text-lg leading-relaxed text-black-100">
                "The designer gave me multiple concepts and was patient through all my revision requests. The final logo
                perfectly captures our brand's innovative spirit. It was completed in less than 48 hours which is
                amazing for a startup. It was a huge relief to find such a reliable design partner!"
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
                    src={`/logo-design-.jpg?height=200&width=200&query=logo design ${i}`}
                    alt={`Logo ${i}`}
                    width={200}
                    height={200}
                    className="rounded-[10px]"
                  />
                ))}
              </div>
              <div className="text-left">
                <h2 className="text-4xl font-medium mb-4">Logo design is included in all our plans</h2>
                <p className="text-lg text-black-100 mb-6">
                  All plans include unlimited logo design requests, unlimited revisions, and source files.
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
      <section className="py-15 bg-secondary">
        <div className="container">
          <h2 className="text-center xl:text-[60px] md:text-[45px] text-[35px] font-medium mb-15"><span className="text-white">F.A.Q</span></h2>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "Can you do any type of logo design?",
                answer:
                  "Yes! We can create any type of logo including wordmarks, icons, combination marks, emblems, mascots, and abstract designs. Just let us know your preferences and brand vision.",
              },
              {
                question: "How many logo concepts will I receive?",
                answer:
                  "You'll typically receive 3-5 unique logo concepts for each request. You can then choose your favorite and request unlimited revisions until it's perfect.",
              },
              {
                question: "What file formats do I get?",
                answer:
                  "You'll receive your logo in all necessary formats: PNG (transparent and with background), SVG, PDF, and source files (AI or Figma) for future modifications.",
              },
              {
                question: "Can I modify the design?",
                answer:
                  "All plans include unlimited revisions and we provide source files so you can make future modifications if needed.",
              },
              {
                question: "Do you offer brand identity services?",
                answer:
                  "Yes! We offer complete brand identity services including brand guides, business cards, stationery, and all other branding materials.",
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
            <h2 className="xl:text-[70px] md:text-[50px] text-[40px] font-semibold mb-4 text-secondary leading-[3.75rem]">
              Send your request today.
              <br />
              Get your design tomorrow.
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
