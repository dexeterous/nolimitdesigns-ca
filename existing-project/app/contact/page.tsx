"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"

export default function ContactPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero Section */}
      <section className="lg:pt-[200px] pt-[120px]">
        <div className="container">
          <div className="md:w-[80%] mx-auto text-center">
            <h3 className="border border-[#bebebe] py-2.5 px-5 rounded-3xl md:text-base md:leading-5 text-sm inline-block font-normal mb-[5px]">
              <i className="ri-mail-line"></i> Get In Touch
            </h3>
            <h1 className="lg:py-2.5 py-5 font-semibold xl:leading-[90px] xl:text-[80px] md:leading-[60px] md:text-[50px] leading-[50px] text-[40px]">
              Let's Talk About Your Project
            </h1>
            <p className="text-xl leading-7 mb-[5px] text-black-100">
              Have questions? Want to learn more? Book a free 15-minute intro call or send us a message.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="lg:pt-25 pt-15">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-6 mb-15">
            {[
              {
                icon: "ri-video-chat-line",
                title: "Book a Call",
                description: "Schedule a free 15-minute intro call to discuss your design needs",
                action: "Schedule Now",
                link: "#",
              },
              {
                icon: "ri-mail-line",
                title: "Email Us",
                description: "Send us an email and we'll get back to you within 24 hours",
                action: "hello@designpro.com",
                link: "mailto:hello@designpro.com",
              },
              {
                icon: "ri-chat-3-line",
                title: "Live Chat",
                description: "Chat with our team in real-time during business hours",
                action: "Start Chat",
                link: "#",
              },
            ].map((option, index) => (
              <div
                key={index}
                className="text-center py-15 px-7.5 rounded-[15px] border border-[#bebebe] hover:border-primary transition-all duration-500"
              >
                <i className={`${option.icon} text-[50px] text-primary`}></i>
                <h4 className="lg:text-3xl lg:leading-[49px] text-[26px] font-medium my-3">{option.title}</h4>
                <p className="lg:text-lg text-base font-medium mb-5">{option.description}</p>
                <Link
                  href={option.link}
                  className="text-primary font-medium hover:underline inline-flex items-center gap-2"
                >
                  {option.action}
                  <i className="ri-arrow-right-line"></i>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="lg:pt-0 pt-0">
        <div className="container">
          <div className="grid lg:grid-cols-[60%_40%] gap-12">
            {/* Contact Form */}
            <div className="p-10 border border-[#bebebe] rounded-[15px]">
              <h2 className="lg:text-[40px] text-3xl font-medium mb-3">Send Us a Message</h2>
              <p className="text-lg mb-7.5">Fill out the form below and we'll get back to you within 24 hours.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-base font-medium mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 border border-[#bebebe] rounded-lg focus:outline-none focus:border-primary transition-all duration-300"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-base font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 border border-[#bebebe] rounded-lg focus:outline-none focus:border-primary transition-all duration-300"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-base font-medium mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border border-[#bebebe] rounded-lg focus:outline-none focus:border-primary transition-all duration-300"
                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-base font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-5 py-4 border border-[#bebebe] rounded-lg focus:outline-none focus:border-primary transition-all duration-300 resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="btn bg-primary text-secondary border-primary hover:bg-black-200 hover:text-white w-full"
                >
                  Send Message
                  <i className="ri-send-plane-line ml-2"></i>
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <div className="p-10 bg-black-200 rounded-[15px] text-white mb-6">
                <h3 className="text-3xl font-medium mb-6" style={{ color: "#ffffff" }}>
                  Contact Information
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <i className="ri-mail-line text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1" style={{ color: "#ffffff" }}>
                        Email
                      </h4>
                      <Link href="mailto:hello@designpro.com" className="text-primary hover:underline">
                        hello@designpro.com
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <i className="ri-time-line text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1" style={{ color: "#ffffff" }}>
                        Business Hours
                      </h4>
                      <p style={{ color: "#dedede" }}>Monday - Friday</p>
                      <p style={{ color: "#dedede" }}>9:00 AM - 6:00 PM EST</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <i className="ri-customer-service-2-line text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1" style={{ color: "#ffffff" }}>
                        Support
                      </h4>
                      <p style={{ color: "#dedede" }}>24-hour response time</p>
                      <p style={{ color: "#dedede" }}>Priority support for members</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-10 border border-[#bebebe] rounded-[15px]">
                <h3 className="text-2xl font-medium mb-4">Follow Us</h3>
                <p className="text-base mb-5">Stay updated with our latest work and design tips</p>
                <div className="flex gap-3">
                  {[
                    { icon: "ri-twitter-x-line", link: "#" },
                    { icon: "ri-linkedin-line", link: "#" },
                    { icon: "ri-instagram-line", link: "#" },
                    { icon: "ri-facebook-line", link: "#" },
                    { icon: "ri-dribbble-line", link: "#" },
                  ].map((social, index) => (
                    <Link
                      key={index}
                      href={social.link}
                      className="w-12 h-12 rounded-full border border-[#bebebe] flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                    >
                      <i className={`${social.icon} text-xl`}></i>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="lg:pt-25 pt-15">
        <div className="container">
          <div className="text-center pb-15">
            <h2 className="xl:leading-[90px] xl:text-[80px] md:leading-[60px] md:text-[50px] leading-[50px] text-[40px] text-black-100 font-medium">
              Common Questions
            </h2>
            <p className="md:text-xl md:leading-7 text-base mt-2">Quick answers to questions you may have</p>
          </div>

          <div className="lg:w-[80%] mx-auto space-y-4">
            {[
              {
                question: "How quickly will I get a response?",
                answer:
                  "We typically respond to all inquiries within 24 hours during business days. For urgent matters, we recommend booking a call directly.",
              },
              {
                question: "Can I schedule a call before subscribing?",
                answer:
                  "We offer free 15-minute intro calls to discuss your needs and answer any questions about our service.",
              },
              {
                question: "What information should I include in my message?",
                answer:
                  "Tell us about your business, your design needs, and any specific questions you have. The more details you provide, the better we can help.",
              },
              {
                question: "Do you offer custom enterprise solutions?",
                answer:
                  "Yes! For larger teams or unique requirements, we can create custom plans. Contact us to discuss your specific needs.",
              },
            ].map((faq, index) => (
              <details key={index} className="group border border-[#bebebe] rounded-lg">
                <summary className="flex justify-between items-center cursor-pointer p-6 font-medium text-lg">
                  {faq.question}
                  <i className="ri-arrow-down-s-line text-2xl group-open:rotate-180 transition-transform"></i>
                </summary>
                <div className="px-6 pb-6 text-base">{faq.answer}</div>
              </details>
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
              Skip the call and subscribe now to start submitting design requests within 24 hours.
            </p>
            <div className="mt-7.5">
              <Link
                href="/#pricing"
                className="btn bg-primary text-secondary border-primary hover:bg-black-200 hover:text-white"
              >
                See Pricing Plans
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
