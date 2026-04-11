import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Pricing | NoLimit Designs",
  description:
    "Simple and transparent pricing for unlimited graphic and video design. Choose the plan that fits your business needs.",
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="lg:pt-[180px] pt-[120px] pb-15">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <h3 className="border border-[#bebebe] py-2.5 px-5 rounded-3xl md:text-base md:leading-5 text-sm inline-block font-normal mb-[5px]">
              <i className="ri-arrow-right-up-line text-primary"></i>
              Pricing
            </h3>
            <h1 className="lg:py-2.5 py-5 font-semibold xl:leading-[90px] xl:text-[70px] md:leading-[60px] md:text-[50px] leading-[50px] text-[40px]">
              Simple and Transparent Pricing
            </h1>
            <p className="text-xl leading-7 text-black-100">
              Choose the creative subscription that fits your business needs. No contracts, pause or cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-25">
        <div className="container">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 justify-center gap-6 max-w-6xl mx-auto">
            {/* Graphics Plan */}
            <div className="pricing-item p-2.5 rounded-xl border border-primary">
              <div className="pricing-header p-5 border-b border-b-primary">
                <h4
                  className="title px-5 py-2.5 rounded-[20px] font-medium leading-[19px] inline-block bg-secondary text-white"
                  style={{ color: "#ffffff" }}
                >
                  Graphics
                </h4>
                <p className="price text-[38px] font-medium font-bricolage text-primary mt-5">
                  $3,495<span className="text-base text-black-100 font-normal capitalize">/month</span>
                </p>
                <p className="save-percent text-lg leading-7 mb-5 mt-1">
                  Ideal for businesses that need ongoing graphic design support.
                </p>
              </div>
              <div className="pricing-details p-5">
                <ul className="flex flex-col gap-2.5 mb-[22px]">
                  {[
                    "Unlimited graphic design requests",
                    "Unlimited revisions",
                    "Two active design tasks at a time",
                    "Fast turnaround",
                    "Dedicated design team",
                    "Dedicated project manager",
                    "Unlimited brands",
                    "Unlimited team members",
                    "Source files included",
                  ].map((feature, index) => (
                    <li key={index} className="text-[rgb(119,119,125)] text-base">
                      <i className="ri-check-line mr-2.5 text-primary"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="btn bg-primary text-secondary border-primary hover:bg-black-200 hover:text-white w-full text-center block"
                >
                  Start Graphics Plan
                </Link>
              </div>
            </div>

            {/* Video Plan */}
            <div className="pricing-item p-2.5 rounded-xl border border-primary">
              <div className="pricing-header p-5 border-b border-b-primary">
                <h4
                  className="title px-5 py-2.5 rounded-[20px] font-medium leading-[19px] inline-block bg-secondary text-white"
                  style={{ color: "#ffffff" }}
                >
                  Video
                </h4>
                <p className="price text-[38px] font-medium font-bricolage text-primary mt-5">
                  $4,495<span className="text-base text-black-100 font-normal capitalize">/month</span>
                </p>
                <p className="save-percent text-lg leading-7 mb-5 mt-1">
                  Best for businesses producing regular video content.
                </p>
              </div>
              <div className="pricing-details p-5">
                <ul className="flex flex-col gap-2.5 mb-[22px]">
                  {[
                    "Unlimited video design requests",
                    "Unlimited revisions",
                    "Two active video tasks at a time",
                    "Motion graphics included",
                    "Typical turnaround of 2-4 days",
                    "Stock assets included",
                    "Source files provided",
                    "Dedicated video team",
                    "Unlimited brands",
                  ].map((feature, index) => (
                    <li key={index} className="text-[rgb(119,119,125)] text-base">
                      <i className="ri-check-line mr-2.5 text-primary"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="btn bg-primary text-secondary border-primary hover:bg-black-200 hover:text-white w-full text-center block"
                >
                  Start Video Plan
                </Link>
              </div>
            </div>

            {/* Graphics + Video Plan */}
            <div className="pricing-item p-2.5 rounded-xl border-2 border-primary bg-[rgba(255,79,1,0.05)] relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">Most Popular</span>
              </div>
              <div className="pricing-header p-5 border-b border-b-primary">
                <h4 className="title px-5 py-2.5 rounded-[20px] font-medium leading-[19px] inline-block bg-primary text-white">
                  Graphics + Video
                </h4>
                <p className="price text-[38px] font-medium font-bricolage text-primary mt-5">
                  $6,995<span className="text-base text-black-100 font-normal capitalize">/month</span>
                </p>
                <p className="save-percent text-lg leading-7 mb-5 mt-1">
                  The most complete creative solution for growing businesses.
                </p>
              </div>
              <div className="pricing-details p-5">
                <ul className="flex flex-col gap-2.5 mb-[22px]">
                  {[
                    "Unlimited graphic and video design requests",
                    "Unlimited revisions",
                    "Two graphic tasks plus two video tasks simultaneously",
                    "Dedicated teams for both design types",
                    "Priority turnaround",
                    "Unlimited brands",
                    "All source files included",
                    "Dedicated project manager",
                    "Private Slack channel",
                  ].map((feature, index) => (
                    <li key={index} className="text-[rgb(119,119,125)] text-base">
                      <i className="ri-check-line mr-2.5 text-primary"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="btn bg-primary text-secondary border-primary hover:bg-black-200 hover:text-white w-full text-center block"
                >
                  Start Combo Plan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Summary */}
      <section className="py-25 bg-[rgba(0,0,0,0.02)]">
        <div className="container">
          <div className="text-center pb-15">
            <h2 className="xl:text-[60px] md:text-[50px] text-[40px] font-medium text-black-100">
              Common Questions
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                question: "What does unlimited mean?",
                answer:
                  "You can submit as many design requests as you want. We work through your queue one at a time based on your priorities.",
              },
              {
                question: "How fast will I receive designs?",
                answer:
                  "Most graphic designs are delivered within 1-2 business days. Video projects typically take 2-4 business days depending on complexity.",
              },
              {
                question: "Can I pause my subscription?",
                answer:
                  "Yes! You can pause your subscription at any time. Your remaining days will be saved for when you reactivate.",
              },
              {
                question: "Is there a minimum commitment?",
                answer:
                  "No minimum commitment. You can cancel anytime. We believe in earning your business through quality work.",
              },
            ].map((faq, index) => (
              <div key={index} className="p-6 bg-background rounded-[15px] border border-[#bebebe]">
                <h4 className="text-xl font-medium mb-3 text-black-100">{faq.question}</h4>
                <p className="text-[rgb(119,119,125)]">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/#faqs" className="text-primary hover:underline font-medium">
              View all FAQs <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-25">
        <div className="container">
          <div className="lg:w-[75%] mx-auto text-center lg:px-12.5 py-7.5 px-8 border border-[rgba(0,0,0,0.05)] rounded-[20px]">
            <h2 className="xl:text-[60px] md:text-[50px] text-[40px] text-black-100 font-normal">
              Ready to get started?
            </h2>
            <p className="md:text-xl md:leading-7 text-base mt-2">
              Book a call to learn how NoLimit Designs can help scale your creative output.
            </p>
            <div className="mt-7.5">
              <Link
                href="/contact"
                className="btn bg-primary text-secondary border-primary hover:bg-black-200 hover:text-white"
              >
                Book a Free Call <i className="ri-video-chat-line"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
