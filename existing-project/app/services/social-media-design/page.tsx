"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function SocialMediaDesignPage() {
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
              Social Media
              <br />
              <span className="text-primary">Design Services</span>
            </h1>
            <p className="text-xl leading-7 mb-[5px] text-black-100 max-w-2xl mx-auto">
              Transform your social media presence with stunning, scroll-stopping designs. From posts to stories, we've
              got you covered with unlimited design requests.
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

      {/* What's Included */}
      <section className="lg:pt-25 pt-15">
        <div className="container">
          <div className="text-center pb-15">
            <h2 className="xl:leading-[90px] xl:text-[80px] md:leading-[60px] md:text-[50px] leading-[50px] text-[40px] text-black-100 font-medium">
              What's Included
            </h2>
            <p className="md:text-xl md:leading-7 text-base mt-2">
              Complete social media design services for all platforms
            </p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {[
              {
                icon: "ri-image-line",
                title: "Social Media Posts",
                description: "Eye-catching posts for Instagram, Facebook, LinkedIn, and Twitter",
              },
              {
                icon: "ri-layout-masonry-line",
                title: "Instagram Stories",
                description: "Engaging story templates and animated story designs",
              },
              {
                icon: "ri-landscape-line",
                title: "Cover Photos",
                description: "Facebook covers, LinkedIn banners, Twitter headers, and YouTube banners",
              },
              {
                icon: "ri-slideshow-3-line",
                title: "Carousel Posts",
                description: "Multi-slide carousel designs for Instagram and LinkedIn",
              },
              {
                icon: "ri-movie-line",
                title: "Video Thumbnails",
                description: "Click-worthy thumbnails for YouTube, Facebook, and Instagram videos",
              },
              {
                icon: "ri-hashtag",
                title: "Campaign Graphics",
                description: "Cohesive graphics for social media campaigns and promotions",
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

      {/* Latest Designs Gallery */}
      <section className="pb-15">
        <div className="container">
          <h2 className="text-center xl:text-[60px] md:text-[45px] text-[35px] font-medium mb-10 mt-16">
            Our latest social media designs
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-[15px] overflow-hidden border border-[#bebebe]">
                <Image
                  src={`/social-media-design-example-.jpg?key=npgod&height=400&width=600&query=social media design example ${i}`}
                  alt={`Social media design ${i}`}
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
            One place for all your social media designs
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Instagram Posts",
                description:
                  "Make a lasting first impression with professionally designed Instagram posts that capture attention and drive engagement.",
                image: "/instagram-posts-design.jpg",
              },
              {
                title: "Instagram Stories",
                description:
                  "Create engaging story content with templates and animations that keep your audience coming back for more.",
                image: "/instagram-stories-design.jpg",
              },
              {
                title: "Facebook Posts",
                description:
                  "Stand out in the feed with eye-catching Facebook posts designed to maximize reach and engagement.",
                image: "/facebook-posts-design.jpg",
              },
              {
                title: "LinkedIn Graphics",
                description:
                  "Professional LinkedIn graphics that establish your brand authority and drive B2B engagement.",
                image: "/linkedin-graphics-design.jpg",
              },
              {
                title: "Twitter Headers",
                description:
                  "Make your profile pop with custom Twitter headers and post graphics that reflect your brand.",
                image: "/twitter-header.png",
              },
              {
                title: "YouTube Thumbnails",
                description: "Click-worthy thumbnails that increase video views and grow your YouTube channel.",
                image: "/youtube-thumbnail-design.jpg",
              },
              {
                title: "Pinterest Pins",
                description:
                  "Vertical designs optimized for Pinterest that drive traffic and conversions to your website.",
                image: "/pinterest-pin-design.jpg",
              },
              {
                title: "TikTok Graphics",
                description: "Trendy graphics and video overlays for TikTok that resonate with younger audiences.",
                image: "/tiktok-graphics-design.jpg",
              },
              {
                title: "Social Media Ads",
                description: "High-converting ad creatives for all social platforms that maximize your ROAS.",
                image: "/social-media-ads-design.jpg",
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
                <Image
                  src="/customer-avatar.png"
                  alt="Customer"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div>
                  <h4 className="font-medium text-xl">Loved working with ManyPixels!</h4>
                  <p className="text-primary">Sarah Johnson - Marketing Director</p>
                </div>
              </div>
              <p className="text-lg leading-relaxed text-black-100">
                "The designer gave me require updates and was still content work! The design request was completed in
                less than 24 hours which is great for a small business. It was a huge weight lifted from my shoulders
                having ManyPixels Press to lean on, at small business it was much more affordable in the sense of hiring
                and outsourcing."
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
                    src={`/social-media-design-.jpg?key=61akz&height=200&width=200&query=social media design ${i}`}
                    alt={`Design ${i}`}
                    width={200}
                    height={200}
                    className="rounded-[10px]"
                  />
                ))}
              </div>
              <div className="text-left">
                <h2 className="text-4xl font-medium mb-4">Social media design is included in all our plans</h2>
                <p className="text-lg text-black-100 mb-6">
                  All plans include unlimited design requests, unlimited revisions, and cancel anytime.
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
          <h2 className="text-center xl:text-[60px] md:text-[45px] text-[35px] font-medium mb-15 "><span className="text-white">F.A.Q</span></h2>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "Can you do any type of social design?",
                answer:
                  "Yes! We can design for all social media platforms including Instagram, Facebook, LinkedIn, Twitter, TikTok, Pinterest, YouTube, and more. From posts to stories, covers to ads, we've got you covered.",
              },
              {
                question: "How often will you provide updates on my graphic design?",
                answer:
                  "You'll receive updates within 24-48 hours for most requests. We keep you informed throughout the design process and deliver revisions quickly.",
              },
              {
                question: "What's the turnaround time?",
                answer:
                  "Most social media designs are completed within 1-2 business days. Complex projects may take longer, but we always communicate timelines upfront.",
              },
              {
                question: "Can I modify the design?",
                answer:
                  "All plans include unlimited revisions. We'll work with you until you're 100% satisfied with the design.",
              },
              {
                question: "Do you offer other services?",
                answer:
                  "Yes! In addition to social media design, we offer display ads, logos, illustrations, print design, infographics, icons, video editing, brand guides, presentations, motion graphics, landing pages, and stationary sets.",
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
            <h2 className="xl:text-[70px] md:text-[50px] text-[40px] font-semibold mb-4 text-secondary leading-[4.5rem] tracking-normal">
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
