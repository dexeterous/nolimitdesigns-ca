"use client"

import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero Section */}
      <section className="lg:pt-[200px] pt-[120px]">
        <div className="container">
          <div className="md:w-[80%] mx-auto text-center">
            <h3 className="border border-[#bebebe] py-2.5 px-5 rounded-3xl md:text-base md:leading-5 text-sm inline-block font-normal mb-[5px]">
              <i className="ri-information-line"></i> About Us
            </h3>
            <h1 className="lg:py-2.5 py-5 font-semibold xl:leading-[90px] xl:text-[80px] md:leading-[60px] md:text-[50px] leading-[50px] text-[40px]">
              Design Without Limits
            </h1>
            <p className="text-xl leading-7 mb-[5px] text-black-100">
              We're on a mission to make world-class design accessible to every business, regardless of size or budget.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="lg:pt-25 pt-15">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="xl:text-[60px] xl:leading-[70px] md:text-[50px] md:leading-[60px] text-[40px] leading-[50px] text-black-100 font-medium mb-6">
                Our Story
              </h2>
              <div className="space-y-5 text-lg leading-7">
                <p>
                  DesignPro was born from a simple frustration: great design shouldn't be a luxury reserved for
                  companies with massive budgets. Traditional design agencies charge premium rates, freelancers are
                  inconsistent, and hiring full-time designers is expensive.
                </p>
                <p>
                  We knew there had to be a better way. So we created a subscription model that gives businesses
                  unlimited access to professional design services for a flat monthly fee. No contracts, no surprises,
                  just great design whenever you need it.
                </p>
                <p>
                  Today, we work with startups, scale-ups, agencies, and enterprises around the world, helping them
                  create beautiful designs that drive results. Our team of talented designers is passionate about
                  bringing your vision to life.
                </p>
              </div>
            </div>
            <div>
              <Image
                src="/design-team-collaboration.jpg"
                alt="Our team"
                width={600}
                height={500}
                className="rounded-[15px] w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="lg:pt-25 pt-15">
        <div className="container">
          <div className="lg:w-[80%] mx-auto text-center bg-black-200 lg:py-[70px] lg:px-20 py-10 px-10 lg:rounded-[40px] rounded-[30px]">
            <h2 className="md:text-[50px] md:leading-[60px] text-[40px] leading-[50px] text-white font-medium mb-6">
             <span className="text-white"> Our Mission </span>
            </h2>
            <p className="md:text-2xl md:leading-9 text-xl leading-8 text-white">
              To democratize access to world-class design by providing unlimited, high-quality design services at a
              price every business can afford. We believe great design should be accessible to everyone, not just those
              with big budgets.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="lg:pt-25 pt-15">
        <div className="container">
          <div className="text-center pb-15">
            <h2 className="xl:leading-[90px] xl:text-[80px] md:leading-[60px] md:text-[50px] leading-[50px] text-[40px] text-black-100 font-medium">
              Our Values
            </h2>
            <p className="md:text-xl md:leading-7 text-base mt-2">The principles that guide everything we do</p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {[
              {
                icon: "ri-heart-line",
                title: "Quality First",
                description:
                  "We never compromise on quality. Every design goes through our rigorous review process to ensure it meets our high standards.",
              },
              {
                icon: "ri-timer-flash-line",
                title: "Speed Matters",
                description:
                  "We know you need designs fast. That's why we deliver most requests in 1-2 business days without sacrificing quality.",
              },
              {
                icon: "ri-customer-service-2-line",
                title: "Customer Obsessed",
                description:
                  "Your success is our success. We go above and beyond to ensure you're thrilled with every design we deliver.",
              },
              {
                icon: "ri-lightbulb-line",
                title: "Creative Excellence",
                description:
                  "We push creative boundaries while staying true to your brand. Every design is unique, thoughtful, and purposeful.",
              },
              {
                icon: "ri-shield-check-line",
                title: "Transparency",
                description:
                  "No hidden fees, no surprises. What you see is what you get. We believe in honest, straightforward communication.",
              },
              {
                icon: "ri-team-line",
                title: "Collaboration",
                description:
                  "We're not just vendors, we're partners. We work closely with you to understand your vision and bring it to life.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="text-center py-15 px-7.5 rounded-[15px] border border-[#bebebe] hover:border-primary transition-all duration-500"
              >
                <i className={`${value.icon} text-[50px] text-primary`}></i>
                <h4 className="lg:text-3xl lg:leading-[49px] text-[26px] font-medium my-3">{value.title}</h4>
                <p className="lg:text-lg text-base font-medium">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By The Numbers */}
      <section className="lg:pt-25 pt-15">
        <div className="container">
          <div className="text-center pb-15">
            <h2 className="xl:leading-[90px] xl:text-[80px] md:leading-[60px] md:text-[50px] leading-[50px] text-[40px] text-black-100 font-medium">
              By The Numbers
            </h2>
            <p className="md:text-xl md:leading-7 text-base mt-2">Our impact in numbers</p>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
            {[
              {
                number: "500+",
                label: "Happy Clients",
                description: "Businesses trust us with their design needs",
              },
              {
                number: "10,000+",
                label: "Designs Delivered",
                description: "Projects completed and counting",
              },
              {
                number: "98%",
                label: "Satisfaction Rate",
                description: "Clients love working with us",
              },
              {
                number: "1-2 Days",
                label: "Average Turnaround",
                description: "Fast delivery without compromising quality",
              },
            ].map((stat, index) => (
              <div key={index} className="text-center p-7.5 border border-[#bebebe] rounded-[15px]">
                <div className="text-[50px] font-bold text-primary font-bricolage">{stat.number}</div>
                <h4 className="text-2xl font-medium my-3">{stat.label}</h4>
                <p className="text-base">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="lg:pt-25 pt-15">
        <div className="container">
          <div className="text-center pb-15">
            <h2 className="xl:leading-[90px] xl:text-[80px] md:leading-[60px] md:text-[50px] leading-[50px] text-[40px] text-black-100 font-medium">
              Why Choose DesignPro
            </h2>
            <p className="md:text-xl md:leading-7 text-base mt-2">What makes us different</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {[
              {
                title: "Predictable Pricing",
                description:
                  "No hourly rates, no project quotes, no surprise invoices. Just one flat monthly fee for unlimited design work.",
                icon: "ri-money-dollar-circle-line",
              },
              {
                title: "Dedicated Team",
                description:
                  "Work with the same designers who learn your brand inside and out, ensuring consistency across all your designs.",
                icon: "ri-team-line",
              },
              {
                title: "No Contracts",
                description:
                  "Cancel or pause anytime. We earn your business every month by delivering exceptional work, not by locking you in.",
                icon: "ri-file-forbid-line",
              },
              {
                title: "Unlimited Revisions",
                description:
                  "Request as many revisions as you need until you're 100% satisfied. We're not done until you're thrilled.",
                icon: "ri-refresh-line",
              },
              {
                title: "Fast Turnaround",
                description:
                  "Most designs delivered in 1-2 business days. Need something urgent? We can often deliver even faster.",
                icon: "ri-rocket-line",
              },
              {
                title: "All Source Files",
                description:
                  "You own everything we create. Get all source files and export-ready formats with every delivery.",
                icon: "ri-file-download-line",
              },
            ].map((reason, index) => (
              <div key={index} className="flex gap-5 p-7.5 border border-[#bebebe] rounded-[15px]">
                <div className="shrink-0">
                  <div className="w-15 h-15 rounded-full bg-primary flex items-center justify-center">
                    <i className={`${reason.icon} text-2xl text-white`}></i>
                  </div>
                </div>
                <div>
                  <h3 className="lg:text-3xl text-[26px] font-medium mb-3">{reason.title}</h3>
                  <p className="lg:text-lg text-base">{reason.description}</p>
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
              Ready to work with us?
            </h2>
            <p className="md:text-xl md:leading-7 text-base mt-2">
              Join hundreds of businesses who trust DesignPro with their design needs.
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
