"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function VideoEditingPage() {
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
              Video Editing
              <br />
              <span className="text-primary">Services</span>
            </h1>
            <p className="text-xl leading-7 mb-[5px] text-black-100 max-w-2xl mx-auto">
              Transform your raw footage into stunning videos with professional editing. From social media clips to
              promotional videos, we bring your vision to life.
            </p>
            <div className="mt-7.5">
              <Link
                href="/#pricing"
                className="btn bg-primary text-secondary border-primary hover:bg-black-200 hover:text-white"
              >
                Request a video edit
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
              Complete video editing services for all your content needs
            </p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {[
              {
                icon: "ri-video-line",
                title: "Social Media Videos",
                description: "Engaging short-form videos optimized for Instagram, TikTok, Facebook, and LinkedIn",
              },
              {
                icon: "ri-youtube-line",
                title: "YouTube Videos",
                description: "Professional long-form content with intros, outros, transitions, and effects",
              },
              {
                icon: "ri-movie-2-line",
                title: "Promotional Videos",
                description: "Compelling product demos, explainer videos, and brand promotional content",
              },
              {
                icon: "ri-briefcase-line",
                title: "Corporate Videos",
                description: "Professional training videos, company presentations, and internal communications",
              },
              {
                icon: "ri-calendar-event-line",
                title: "Event Videos",
                description: "Highlight reels, recap videos, and event coverage with dynamic editing",
              },
              {
                icon: "ri-advertisement-line",
                title: "Video Ads",
                description: "High-converting video ads for Facebook, Instagram, YouTube, and other platforms",
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

      {/* Latest Video Edits Gallery */}
      <section className="pb-15">
        <div className="container">
          <h2 className="text-center xl:text-[60px] md:text-[45px] text-[35px] font-medium mb-10 mt-28">
            Our latest video edits
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-[15px] overflow-hidden border border-[#bebebe]">
                <Image
                  src={`/video-editing-example-.jpg?key=video${i}&height=400&width=600&query=professional video editing example ${i}`}
                  alt={`Video editing ${i}`}
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
      

      {/* Specific Video Types */}
      <section className="py-15">
        <div className="container">
          <h2 className="text-center xl:text-[60px] md:text-[45px] text-[35px] font-medium mb-15">
            One place for all your video editing needs
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Social Media Videos",
                description:
                  "Engaging short-form videos optimized for Instagram Reels, TikTok, Facebook, and LinkedIn that capture attention.",
                image: "/social-media-video-editing.jpg",
              },
              {
                title: "YouTube Videos",
                description:
                  "Professional long-form content with custom intros, outros, smooth transitions, and engaging effects.",
                image: "/youtube-video-editing.jpg",
              },
              {
                title: "Promotional Videos",
                description:
                  "Compelling product demos, explainer videos, and brand promotional content that drives conversions.",
                image: "/promotional-video-editing.jpg",
              },
              {
                title: "Corporate Videos",
                description:
                  "Professional training videos, company presentations, and internal communications with polished editing.",
                image: "/corporate-video-editing.png",
              },
              {
                title: "Event Videos",
                description: "Dynamic highlight reels, recap videos, and event coverage that capture the best moments.",
                image: "/event-video-editing.jpg",
              },
              {
                title: "Testimonial Videos",
                description:
                  "Customer testimonials and case study videos that build trust and credibility with your audience.",
                image: "/testimonial-video-editing.jpg",
              },
              {
                title: "Educational Videos",
                description:
                  "Tutorial videos, online courses, and educational content with clear visuals and engaging editing.",
                image: "/educational-video-editing.jpg",
              },
              {
                title: "Podcast Editing",
                description:
                  "Audio and video podcast editing with intro/outro music, visual enhancements, and professional polish.",
                image: "/podcast-video-editing.jpg",
              },
              {
                title: "Video Ads",
                description:
                  "High-converting video ads for Facebook, Instagram, YouTube, and other platforms that maximize ROAS.",
                image: "/video-ad-editing.jpg",
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
                  <h4 className="font-medium text-xl">Loved working with DesignPro!</h4>
                  <p className="text-primary">Sarah Johnson - Marketing Director</p>
                </div>
              </div>
              <p className="text-lg leading-relaxed text-black-100">
                "The video editing quality is exceptional. Our social media engagement increased by 300% after we
                started using their services. The turnaround time is incredibly fast, and the team always delivers
                exactly what we need. It was a huge weight lifted from my shoulders having DesignPro to lean on."
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
                    src={`/video-editing-.jpg?key=vid${i}&height=200&width=200&query=video editing ${i}`}
                    alt={`Video ${i}`}
                    width={200}
                    height={200}
                    className="rounded-[10px]"
                  />
                ))}
              </div>
              <div className="text-left">
                <h2 className="text-4xl font-medium mb-4">Video editing is included in all our plans</h2>
                <p className="text-lg text-black-100 mb-6">
                  All plans include unlimited video editing requests, unlimited revisions, and cancel anytime.
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
                question: "What types of video editing do you offer?",
                answer:
                  "We offer comprehensive video editing services including social media videos, YouTube content, promotional videos, corporate videos, event coverage, testimonials, educational content, podcast editing, and video ads.",
              },
              {
                question: "How long does it take to edit a video?",
                answer:
                  "Most video editing requests are completed within 2-3 business days. Simple edits like social media clips can be delivered in 24-48 hours, while more complex projects may take 3-5 days.",
              },
              {
                question: "What video formats do you accept?",
                answer:
                  "We accept all major video formats including MP4, MOV, AVI, MKV, and more. We can also work with footage from any camera or device.",
              },
              {
                question: "Do you provide motion graphics and animations?",
                answer:
                  "Yes! We can add motion graphics, text animations, transitions, and visual effects to enhance your videos.",
              },
              {
                question: "Can I request revisions?",
                answer:
                  "All our plans include unlimited revisions until you're completely satisfied with the final video.",
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
              Get your video tomorrow.
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
