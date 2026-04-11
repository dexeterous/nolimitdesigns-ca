"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function InfographicsPage() {
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
              Infographics
              <br />
              <span className="text-primary">Design Services</span>
            </h1>
            <p className="text-xl leading-7 mb-[5px] text-black-100 max-w-2xl mx-auto">
              Transform complex data into engaging visual stories. From statistical infographics to process diagrams,
              get beautiful infographics ready in a few clicks!
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
            Our latest infographics
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-[15px] overflow-hidden border border-[#bebebe]">
                <Image
                  src={`/infographic-design-.jpg?height=600&width=450&query=infographic design ${i}`}
                  alt={`Infographic ${i}`}
                  width={450}
                  height={600}
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
            One place for all your infographic needs
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Statistical Infographics",
                description: "Present data and statistics in visually compelling and easy-to-understand formats.",
                image: "/placeholder.svg?key=stat1",
              },
              {
                title: "Timeline Infographics",
                description: "Visualize chronological events and historical progressions with clarity.",
                image: "/placeholder.svg?key=time1",
              },
              {
                title: "Process Infographics",
                description: "Explain workflows, procedures, and step-by-step guides visually.",
                image: "/placeholder.svg?key=proc1",
              },
              {
                title: "Comparison Infographics",
                description: "Compare options, products, or concepts side-by-side for easy decision making.",
                image: "/placeholder.svg?key=comp1",
              },
              {
                title: "Geographic Infographics",
                description: "Display location-based data and regional information on maps.",
                image: "/placeholder.svg?key=geo1",
              },
              {
                title: "List Infographics",
                description: "Present tips, facts, or ranked information in engaging visual lists.",
                image: "/placeholder.svg?key=list1",
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
                  height={500}
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
          <span className="text-white">  Thousands of happy customers</span>
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-[20px] p-10 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <Image src="/customer-avatar.png" alt="Customer" width={60} height={60} className="rounded-full" />
                <div>
                  <h4 className="font-medium text-xl">Loved working with DesignPro!</h4>
                  <p className="text-primary">Lisa - Marketing Manager</p>
                </div>
              </div>
              <p className="text-lg leading-relaxed text-black-100">
                "Our infographics get shared 10x more than our regular content. DesignPro took our complex data and made
                it not just understandable, but actually engaging and shareable. The turnaround time was impressive and
                the quality exceeded our expectations every time!"
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
                    src={`/ceholder-svg-key-infog.jpg?key=infog${i}&height=300&width=200&query=infographic ${i}`}
                    alt={`Infographic ${i}`}
                    width={200}
                    height={300}
                    className="rounded-[10px]"
                  />
                ))}
              </div>
              <div className="text-left">
                <h2 className="text-4xl font-medium mb-4">Infographics are included in all our plans</h2>
                <p className="text-lg text-black-100 mb-6">
                  All plans include unlimited infographic requests, unlimited revisions, and source files.
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
                question: "What data do you need from me?",
                answer:
                  "Just provide your data in any format (spreadsheet, document, or even rough notes) along with your key message, and we'll handle the visualization.",
              },
              {
                question: "How long does an infographic take?",
                answer:
                  "Most infographics are delivered within 2-3 business days. Complex data visualizations may take slightly longer.",
              },
              {
                question: "Can I update the data later?",
                answer:
                  "Yes! We provide editable source files so you can update numbers and text as your data changes.",
              },
              {
                question: "What sizes do you provide?",
                answer:
                  "We optimize infographics for your specific use case - social media, blog posts, presentations, or print materials.",
              },
              {
                question: "Do you offer unlimited revisions?",
                answer:
                  "Yes! All plans include unlimited revisions until you're completely satisfied with the final infographic.",
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
