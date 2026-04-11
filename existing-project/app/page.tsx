"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [selectedProject, setSelectedProject] = useState<{
    title: string
    category: string
    image: string
  } | null>(null)

  const testimonials = [
    {
      text: "Financial planners help people to knowledge in about how to invest and in save their moneye the most efficient way eve plan ners help people tioniio know ledige in about how.",
      author: "Zonathon Doe",
      role: "CEO & Founder X",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/author1.jpg-zaVDi52IiHZ0QksaR7XJCDMigtTdz3.jpeg",
    },
    {
      text: "Financial planners help people to knowledge in about how to invest and in save their moneye the most efficient way eve plan ners help people tioniio know ledige in about how.",
      author: "Liana Marie",
      role: "Lead Designer Meta",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/author2.jpg-WE75ftb362gkegcVqI367nO9qm9vM7.jpeg",
    },
  ]

  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const faqs = [
    {
      question: "How secure is my financial data on your platform?",
      answer:
        "Our childcare center is open from 7:00 AM to 6:00 PM, Monday through Friday. We offer flexible scheduling options to accommodate working families.",
    },
    {
      question: "How does the subscription work?",
      answer:
        "Our childcare center is open from 7:00 AM to 6:00 PM, Monday through Friday. We offer flexible scheduling options to accommodate working families.",
    },
    {
      question: "How much do your plans cost?",
      answer:
        "Our childcare center is open from 7:00 AM to 6:00 PM, Monday through Friday. We offer flexible scheduling options to accommodate working families.",
    },
    {
      question: "How quickly can You deliver designs for our business?",
      answer:
        "Our childcare center is open from 7:00 AM to 6:00 PM, Monday through Friday. We offer flexible scheduling options to accommodate working families.",
    },
    {
      question: "Can I request revisions to the designs provided?",
      answer:
        "Our childcare center is open from 7:00 AM to 6:00 PM, Monday through Friday. We offer flexible scheduling options to accommodate working families.",
    },
    {
      question: "What types of designs does Designpro specialize in?",
      answer:
        "Our childcare center is open from 7:00 AM to 6:00 PM, Monday through Friday. We offer flexible scheduling options to accommodate working families.",
    },
  ]

  const featuredProjects = [
    {
      title: "Create Winning Proposals in Minutes",
      category: "Website",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/work7.jpg-Ruw4at8IbBgY8jR0St1wMrNfu4SP0M.jpeg",
    },
    {
      title: "Empowering The Decentralized Future",
      category: "Apps",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/work1.jpg-283NdiN68Nm6S1Czvl00DYGgbl3Isc.jpeg",
    },
    {
      title: "Turn Meetings Into Action",
      category: "Landing",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/work6.jpg-mKGi4gdhGoxHdvMs7CLKBpGai7DqWP.jpeg",
    },
    {
      title: "Unique Pages with AI",
      category: "Mockup",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/work5.jpg-EJXZAbGsHfT0iB2FUjAEkD6lFtWWaF.jpeg",
    },
  ]

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedProject) {
        setSelectedProject(null)
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [selectedProject])

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [selectedProject])

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero Section */}
      <section id="home" className="lg:pt-[200px] pt-[120px]">
        <div className="container">
          <div className="md:w-[70%] mx-auto text-center relative">
            <h3 className="border border-[#bebebe] py-2.5 px-5 rounded-3xl md:text-base md:leading-5 text-sm inline-block font-normal mb-[5px]">
              <i className="ri-refresh-line"></i>Subscription. Pause or cancel anytime
            </h3>
            <h2 className="lg:py-2.5 py-5 font-semibold xl:leading-[90px] xl:text-[80px] md:leading-[60px] md:text-[50px] leading-[50px] text-[40px]">
              {"Unlimited Graphic Design & Videos.\nFlat Monthly Fee."}
            </h2>
            <p className="text-xl leading-7 mb-[5px] px-15 text-black-100">
              Submit as many graphic or video design requests as you want, get unlimited revisions, and let a dedicated
              design team handle it all
            </p>
            <div className="mt-7.5">
              <Link
                href="#pricing"
                className="btn bg-primary text-secondary border-primary hover:bg-black-200 hover:text-white"
              >
                See Pricing Plans
              </Link>
              <Link href="#book" className="btn bg-black-200 text-white border-black-200 hover:text-primary">
                Book a free call
              </Link>
            </div>
            <div className="absolute lg:right-[-25%] top-1/2 right-0">
              <Image
                src="/images/design-mode/shape2(1).png"
                alt="Shape"
                width={300}
                height={300}
                className="lg:max-w-[300px] max-w-[70px]"
              />
            </div>
            <div className="absolute lg:-left-[30%] top-[10%] left-0">
              <Image
                src="/images/design-mode/shape1(1).png"
                alt="Shape"
                width={200}
                height={200}
                className="lg:max-w-[200px] max-w-15"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Recent Work */}
      <div className="pt-5" id="portfolio">
        <div className="container">
          <div>
            <Image
              src="/images/design-mode/work-scribble(1).svg"
              alt="custom"
              width={300}
              height={100}
              className="max-w-[300px]"
            />
          </div>
          <div
            className="grid gap-6 mt-6"
            style={{
              gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
            }}
          >
            <style jsx>{`
              @media (min-width: 640px) {
                div[data-portfolio-grid] {
                  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                }
              }
              @media (min-width: 1024px) {
                div[data-portfolio-grid] {
                  grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
                }
              }
            `}</style>
            <div
              data-portfolio-grid
              className="grid gap-6"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
              }}
            >
              {[
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/work.jpg-gjjY8seaPjhLEUs8IzFjhWu2HKCvcC.jpeg", // work.jpg
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/work1.jpg-283NdiN68Nm6S1Czvl00DYGgbl3Isc.jpeg", // work1.jpg
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/work2.jpg-aQtQNU4Uoq2lVmpWc2DMus2L01woLa.jpeg", // work2.jpg
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/work3.jpg-pa8TbG2nL9J92WCQ5eUr2cp69lQcF0.jpeg", // work3.jpg
              ].map((src, i) => (
                <div key={i} className="w-full">
                  <div className="single-header-work-img w-full">
                    <Image
                      src={src || "/placeholder.svg"}
                      alt="project"
                      width={400}
                      height={300}
                      className="border-8 border-[#ccc] rounded-[10px] w-full h-auto object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Partners */}
      <div className="lg:pt-25 pt-15">
        <div className="container">
          <h2 className="uppercase text-base text-center tracking-[5px] mb-7.5 font-medium">
            Top companies trust us with their design
          </h2>
          <div className="company-list">
            <div className="logo-slider overflow-hidden flex">
              <div className="logos-slide">
                {[
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/company1-DAcU80XmDqE7n4yHBPEPaJo2GqDasE.png", // company1.png - Swift
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/company2-8A2v3xWKAJxTVDgu2XhS84M1Jux4Bk.png", // company2.png - Lum Labs
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/company3-Rdc1oIOSvNO9bMzxHC7qZMnEFMg8w9.png", // company3.png - Craftgram
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/company4-maSfugMfllJUwqzgNTuW4Rs2EhmL2R.png", // company4.png - Sparkle
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/company5-EmHeKOlL0aPHdxYXlhmxVsnGIbgWtk.png", // company5.png - TrendLyft
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/company6-Psf7hxqmQZCFug3zEWEiF7bi1AQX47.png", // company6.png - ZenZap
                ].map((src, i) => (
                  <Image key={i} src={src || "/placeholder.svg"} alt="company logo" width={130} height={60} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About/Testimonial */}
      <section className="lg:pt-25 pt-15">
        <div className="container">
          <div className="lg:w-[80%] w-full text-center mx-auto bg-black-200 lg:py-[70px] lg:px-20 py-10 px-10 lg:rounded-[40px] rounded-[30px]">
            <h3 className="md:text-3xl md:leading-[48px] text-2xl leading-9">
              <span className="text-white">
                Designpro took my billion-dollar baby idea, slapped their design magic on it, and boom –
              </span>
              <span className="text-primary">
                {" "}
                branding so good it makes my other ventures look like lemonade stands.{" "}
              </span>
              <span className="text-white">
                Twist isn't just a design agency; they're your ticket to the big leagues.
              </span>
            </h3>
            <div className="pt-12.5 flex flex-col items-center">
              <Image
                src="/images/design-mode/founder(1).png"
                alt="founder"
                width={80}
                height={80}
                className="w-20 h-20 rounded-full"
              />
              <h2 className="pt-2.5 lg:text-3xl text-2xl text-[#ff4f01]">Tanvir Hossain</h2>
              <p className="text-white">Founder of Designpro</p>
            </div>
          </div>
        </div>
      </section>

      {/* Work Process */}
      <section id="how" className="lg:pt-25 pt-15">
        <div className="container">
          <div className="text-center pb-15">
            <h3 className="border border-[#bebebe] py-2.5 px-5 rounded-3xl md:text-base md:leading-5 text-sm inline-block font-normal mb-[5px]">
              <i className="ri-arrow-right-up-line text-primary"></i>
              Work Process
            </h3>
            <h2 className="xl:leading-[90px] xl:text-[80px] md:leading-[60px] md:text-[50px] leading-[50px] text-[40px] text-black-100 font-medium">
              We design. You grow
            </h2>
            <p className="md:text-xl md:leading-7 text-base mt-2">Our process is as simple as possible.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-x-6 gap-y-12.5 lg:pt-15 pt-0">
            {[
              {
                icon: "ri-shake-hands-line",
                title: "Subscribe",
                description:
                  "Select your plan that fits your needs, get access to Trello board within 24 hours, and start listing your requests.",
              },
              {
                icon: "ri-global-fill",
                title: "Receive",
                description:
                  "Start receiving your designs within 2-3 business days, or even sooner for smaller tasks. Yes, it can be that fast.",
              },
              {
                icon: "ri-stack-line",
                title: "Continue",
                description:
                  "Approve designs or request revisions; we're not done until you're thrilled. Your satisfaction is our commitment.",
              },
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center relative sm:px-[25px] px-0">
                <div className="lg:w-[65px] lg:h-[65px] w-12.5 h-12.5 rounded-full flex items-center justify-center border border-[rgba(0,0,0,.08)] relative">
                  <i className={`${step.icon} text-[25px]`}></i>
                  <div className="overlay-list absolute -right-2 -top-2 bg-primary flex justify-center items-center text-white lg:w-7.5 lg:h-7.5 w-6 h-6 rounded-full">
                    <span className="lg:font-medium text-sm">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                </div>
                <div className="lg:pt-6 pt-5">
                  <div className="title-box">
                    <h3 className="lg:text-[32px] text-[26px] lg:leading-[30px] font-bold">
                      <Link href="#">{step.title}</Link>
                    </h3>
                  </div>
                  <div className="text-box lg:mt-[22px] mt-4">
                    <p className="text-lg font-medium leading-7">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="lg:pt-25 pt-15">
        <div className="container">
          <div className="text-center pb-15">
            <h3 className="border border-[#bebebe] py-2.5 px-5 rounded-3xl md:text-base md:leading-5 text-sm inline-block font-normal mb-[5px]">
              <i className="ri-arrow-right-up-line text-primary"></i>
              Services
            </h3>
            <h2 className="xl:leading-[90px] xl:text-[80px] md:leading-[60px] md:text-[50px] leading-[50px] text-[40px] text-black-100 font-medium my-12">
              Unlimited graphic design services
            </h2>
            <p className="md:text-xl md:leading-7 text-base mt-2">Get expert solutions for every design need</p>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
            {[
              {
                title: "Social Media Design",
                description: "Posts, stories, covers, and social media graphics for all platforms.",
                icon: "ri-instagram-line",
                link: "/services/social-media-design",
              },
              {
                title: "Display Ads",
                description: "Banner ads, Google ads, Facebook ads, and digital advertising.",
                icon: "ri-advertisement-line",
                link: "/services/display-ads",
              },
              {
                title: "Logos",
                description: "Logo design, brand marks, and logo variations for your brand.",
                icon: "ri-contrast-drop-2-line",
                link: "/services/logos",
              },
              {
                title: "Illustrations",
                description: "Custom illustrations, character design, and visual storytelling.",
                icon: "ri-brush-line",
                link: "/services/illustrations",
              },
              {
                title: "Print Design",
                description: "Brochures, flyers, posters, and print materials.",
                icon: "ri-printer-line",
                link: "/services/print-design",
              },
              {
                title: "Infographics",
                description: "Data visualization, charts, and informational graphics.",
                icon: "ri-bar-chart-box-line",
                link: "/services/infographics",
              },
              {
                title: "Icons",
                description: "Icon sets, app icons, and custom iconography.",
                icon: "ri-apps-line",
                link: "/services/icons",
              },
              {
                title: "Video Editing",
                description: "Video editing, motion graphics, and animated content.",
                icon: "ri-video-line",
                link: "/services/video-editing",
              },
              {
                title: "Brand Guides",
                description: "Brand guidelines, style guides, and brand documentation.",
                icon: "ri-book-open-line",
                link: "/services/brand-guides",
              },
              {
                title: "Presentations",
                description: "Pitch decks, slide decks, and presentation design.",
                icon: "ri-slideshow-line",
                link: "/services/presentations",
              },
              {
                title: "Motion Graphics",
                description: "Animated videos, explainer videos, and GIFs.",
                icon: "ri-movie-2-line",
                link: "/services/motion-graphics",
              },
              {
                title: "Stationary Sets",
                description: "Business cards, letterheads, envelopes, and stationery.",
                icon: "ri-file-paper-line",
                link: "/services/stationary-sets",
              },
            ].map((service, index) => (
              <div key={index} className="col-span-1">
                <Link href={service.link}>
                  <div className="info-item border border-[#bebebe] p-7.5 rounded-[15px] hover:border-primary transition-all duration-500 cursor-pointer h-full flex flex-col">
                    <div className="mb-5">
                      <i className={`${service.icon} text-[40px] text-primary`}></i>
                    </div>
                    <h4 className="text-xl font-medium mb-2">{service.title}</h4>
                    <p className="text-base font-medium text-black-100">{service.description}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <div className="lg:pt-25 pt-15" id="projects">
        <div className="container">
          <div className="text-center pb-15">
            <h3 className="border border-[#bebebe] py-2.5 px-5 rounded-3xl md:text-base md:leading-5 text-sm inline-block font-normal mb-[5px]">
              <i className="ri-arrow-right-up-line text-primary"></i>
              Projects
            </h3>
            <h2 className="xl:leading-[90px] xl:text-[80px] md:leading-[60px] md:text-[50px] leading-[50px] text-[40px] text-black-100 font-medium">
              Featured Projects
            </h2>
            <p className="md:text-xl md:leading-7 text-base mt-2">Get a glimpse of our work</p>
          </div>
          <style jsx>{`
            @media (min-width: 768px) {
              div[data-featured-grid] {
                grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
              }
            }
          `}</style>
          <div
            data-featured-grid
            className="grid gap-6"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
            }}
          >
            {featuredProjects.map((project, index) => (
              <div key={index}>
                <button onClick={() => setSelectedProject(project)} className="work-popup w-full text-left">
                  <div className="rounded-lg overflow-hidden relative after:absolute after:left-0 after:top-0 after:w-full after:h-full after:bg-[linear-gradient(0deg,_rgba(0,0,0,.3),_transparent)] after:opacity-0 hover:after:opacity-100 after:transition-all after:duration-500 group">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={500}
                      height={300}
                      className="group-hover:blur-[1.5px] group-hover:scale-[1.04] transition-all duration-500 w-full"
                    />
                    <span className="absolute top-4 right-4 inline-block rounded-[32px] bg-[rgba(255,79,1,.5)] py-[7px] px-[14px] text-white text-sm uppercase tracking-wider leading-[30px] font-medium">
                      {project.category}
                    </span>
                    <div className="z-20 absolute left-7.5 -bottom-0 opacity-0 group-hover:opacity-100 group-hover:bottom-6 transition-all duration-500">
                      <h1 className="lg:text-3xl text-[26px] font-semibold text-white">
                        <span className="text-white">{project.title}</span>
                      </h1>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
          <div className="mt-7.5 text-center">
            <Link href="#" className="btn bg-primary text-secondary border-primary hover:bg-black-200 hover:text-white">
              View all works
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonials Carousel */}
      <section className="lg:pt-25 pt-15">
        <div className="container">
          <div className="testimonials-wrap">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`lg:px-10 lg:py-12.5 px-7.5 py-10 border border-primary rounded-2xl text-center mx-[15px] ${index === currentTestimonial ? "block" : "hidden"}`}
              >
                <div className="text mb-7.5 lg:text-3xl lg:leading-10 text-2xl italic font-bricolage">
                  "{testimonial.text}"
                </div>
                <div className="flex flex-col items-center">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt="Author"
                    width={60}
                    height={60}
                    className="rounded-full w-15 h-15 mb-[5px]"
                  />
                  <h5 className="lg:text-2xl text-xl font-medium">{testimonial.author}</h5>
                  <span className="lg:text-lg lg:leading-[22px] text-sm text-[rgb(119,119,125)]">
                    {testimonial.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-1.5 text-center pt-10">
            <button
              onClick={() =>
                setCurrentTestimonial(currentTestimonial === 0 ? testimonials.length - 1 : currentTestimonial - 1)
              }
              className="w-10 h-10 bg-primary inline-flex justify-center items-center rounded-full text-white border border-primary hover:bg-transparent hover:text-[#ff4f01] transition-all duration-500"
            >
              <i className="ri-arrow-left-s-line"></i>
            </button>
            <button
              onClick={() =>
                setCurrentTestimonial(currentTestimonial === testimonials.length - 1 ? 0 : currentTestimonial + 1)
              }
              className="w-10 h-10 bg-primary inline-flex justify-center items-center rounded-full text-white border border-primary hover:bg-transparent hover:text-[#ff4f01] transition-all duration-500"
            >
              <i className="ri-arrow-right-s-line"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Membership Benefits */}
      <section id="features" className="lg:pt-25 pt-15">
        <div className="container">
          <div className="text-center pb-15">
            <h3 className="border border-[#bebebe] py-2.5 px-5 rounded-3xl md:text-base md:leading-5 text-sm inline-block font-normal mb-[5px]">
              <i className="ri-arrow-right-up-line text-primary"></i>
              Features
            </h3>
            <h2 className="xl:leading-[90px] xl:text-[80px] md:leading-[60px] md:text-[50px] leading-[50px] text-[40px] text-black-100 font-medium">
              Membership benefits
            </h2>
            <p className="md:text-xl md:leading-7 text-base mt-2">
              Perks so good you'll never need to go anywhere else for your design. Seriously.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-x-6 gap-y-7.5">
            {[
              {
                icon: "ri-global-fill",
                title: "Unlimited requests",
                description: "Unlimited desgin requests, prioritized by your needs",
              },
              {
                icon: "ri-quill-pen-line",
                title: "Lightning fast",
                description: "Tasks delivered in just 1-2 working business days.",
              },
              {
                icon: "ri-pantone-fill",
                title: "No contracts",
                description: "No contracts. Cancel your subscription at any time.",
              },
              {
                icon: "ri-global-fill",
                title: "No extra Charges",
                description: "Just fixed monthly subscription; No extra charges or fees.",
              },
              {
                icon: "ri-quill-pen-line",
                title: "Top-notch quality",
                description: "Access incredible design quality whenever you need it.",
              },
              {
                icon: "ri-pantone-fill",
                title: "Risk-free Revisions",
                description: "Revise until 100% satisfied without any extra cost.",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="text-center py-15 px-7.5 rounded-[15px] border border-[#bebebe] hover:border-primary transition-all duration-500"
              >
                <div>
                  <i className={`${benefit.icon} text-[50px] text-primary`}></i>
                  <h4 className="lg:text-3xl lg:leading-[49px] text-[26px] font-medium my-3">{benefit.title}</h4>
                  <p className="lg:text-lg text-base font-medium">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="lg:pt-25 pt-15">
        <div className="container">
          <div className="lg:w-[75%] w-full mx-auto">
            <div className="text-center pb-15">
              <h3 className="border border-[#bebebe] py-2.5 px-5 rounded-3xl md:text-base md:leading-5 text-sm inline-block font-normal mb-[5px]">
                <i className="ri-arrow-right-up-line text-primary"></i>
                Pricing
              </h3>
              <h2 className="xl:leading-[90px] xl:text-[80px] md:leading-[60px] md:text-[50px] leading-[50px] text-[40px] text-black-100 font-medium">
                Membership
              </h2>
              <p className="md:text-xl md:leading-7 text-base mt-2">Pick the plan that suits your needs the most.</p>
            </div>

            <div className="grid md:grid-cols-2 justify-center gap-6">
              <div className="pricing-item p-2.5 rounded-xl border border-primary">
                <div className="pricing-header p-5 border-b border-b-primary">
                  <h4
                    className="title px-5 py-2.5 rounded-[20px] font-medium leading-[19px] inline-block bg-secondary text-white"
                    style={{ color: "#ffffff" }}
                  >
                    Standard
                  </h4>
                  <p className="price text-[38px] font-medium font-bricolage text-primary mt-5">
                    $3,999<span className="text-base text-black-100 font-normal capitalize">/month</span>
                  </p>
                  <p className="save-percent text-lg leading-7 mb-5 mt-1">
                    One request at a time. Pause or cancel anytime.
                  </p>
                </div>
                <div className="pricing-details p-5">
                  <ul className="flex flex-col gap-2.5 mb-[22px]">
                    {[
                      "One request at a time",
                      "Unlimited brands",
                      "1-2 day revisions",
                      "Weekly sync calls",
                      "Private Slack channel",
                      "Perfect for smaller teams & startups",
                    ].map((feature, index) => (
                      <li key={index} className="text-[rgb(119,119,125)] text-lg">
                        <i className="ri-arrow-right-line mr-2.5"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="#"
                    className="btn bg-primary text-secondary border-primary hover:bg-black-200 hover:text-white"
                  >
                    Book a 30-min call<i className="ri-video-chat-line"></i>
                  </Link>
                </div>
              </div>

              <div className="pricing-item p-2.5 rounded-xl border border-primary">
                <div className="pricing-header p-5 border-b border-b-primary">
                  <h4 className="title px-5 py-2.5 rounded-[20px] font-medium leading-[19px] inline-block bg-primary">
                    Premium
                  </h4>
                  <p className="price text-[38px] font-medium font-bricolage text-primary mt-5">
                    $5,999<span className="text-base text-black-100 font-normal capitalize">/month</span>
                  </p>
                  <p className="save-percent text-lg leading-7 mb-5 mt-1">
                    Double the requests. Pause or cancel anytime.
                  </p>
                </div>
                <div className="pricing-details p-5">
                  <ul className="flex flex-col gap-2.5 mb-[22px]">
                    {[
                      "Two requests at a time",
                      "Unlimited brands",
                      "Priority support & delivery",
                      "Weekly sync calls",
                      "Private Slack channel",
                      "Perfect for larger teams & enterprises",
                    ].map((feature, index) => (
                      <li key={index} className="text-[rgb(119,119,125)] text-lg">
                        <i className="ri-arrow-right-line mr-2.5"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="#"
                    className="btn bg-primary text-secondary border-primary hover:bg-black-200 hover:text-white"
                  >
                    Book a 30-min call<i className="ri-video-chat-line"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="lg:pt-25 pt-15">
        <div className="container">
          <div className="text-center pb-15">
            <h3 className="border border-[#bebebe] py-2.5 px-5 rounded-3xl md:text-base md:leading-5 text-sm inline-block font-normal mb-[5px]">
              <i className="ri-arrow-right-up-line text-primary"></i>
              FAQs
            </h3>
            <h2 className="xl:leading-[90px] xl:text-[80px] md:leading-[60px] md:text-[50px] leading-[50px] text-[40px] text-black-100 font-medium">
              Frequently Asked Questions
            </h2>
            <p className="md:text-xl md:leading-7 text-base mt-2">Unsure about subscription design?</p>
          </div>

          <div className="grid lg:grid-cols-[33.33%_auto] md:grid-cols-2 grid-cols-1 gap-6">
            <div className="p-12.5 rounded-[15px] bg-black-200 text-center">
              <Image
                src="/images/design-mode/founder(1).png"
                alt="founder"
                width={140}
                height={140}
                className="max-w-[140px] max-h-[140px] mx-auto"
              />
              <h2 className="text-white lg:text-[40px] text-3xl lg:leading-[1.2] py-3" style={{ color: "#ffffff" }}>
                Book a 15-minute intro call
              </h2>
              <Link
                href="#"
                className="btn bg-primary text-secondary border-primary hover:bg-black-200 hover:text-white"
              >
                Schedule now <i className="ri-video-chat-line"></i>
              </Link>
              <p className="text-white">
                Prefer to email?{" "}
                <Link href="mailto:hello@designpro.com" className="text-primary">
                  hello@designpro.com
                </Link>
              </p>
            </div>

            <div className="flex flex-col gap-[15px] lg:pl-7.5">
              {faqs.map((faq, index) => (
                <div key={index} className="accordion-item">
                  <h2
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="accordion-header flex justify-between items-center lg:text-[22px] text-lg rounded-[10px] border border-[#ccc] py-4 px-5 font-medium cursor-pointer"
                  >
                    {faq.question}
                    <span
                      className={`inline-block w-[11px] h-[11px] rounded-full shrink-0 ${openFAQ === index ? "bg-primary" : "bg-secondary"}`}
                    ></span>
                  </h2>
                  <div
                    className={`accordion-body px-5 transition-all duration-500 ${openFAQ === index ? "max-h-96 opacity-100 visible py-4" : "max-h-0 opacity-0 invisible py-0"} overflow-hidden`}
                  >
                    <p className="mb-4">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Book Now CTA */}
      <section id="book" className="lg:pt-25 pt-15">
        <div className="container">
          <div className="lg:w-[75%] mx-auto text-center lg:px-12.5 py-7.5 px-8 border border-[rgba(0,0,0,0.05)] rounded-[20px]">
            <h2 className="xl:leading-[90px] xl:text-[80px] md:leading-[60px] md:text-[50px] leading-[50px] text-[40px] text-black-100 font-normal">
              See if DesignPro is right for you. (It totally is.)
            </h2>
            <p className="md:text-xl md:leading-7 text-base mt-2">
              Get a guided tour through DesignPro, and find out how you and your team can change the way you source
              design, forever.
            </p>
            <div className="mt-7.5">
              <Link
                href="#"
                className="btn bg-primary text-secondary border-primary hover:bg-black-200 hover:text-white"
              >
                Book a free call
              </Link>
            </div>
            <Link href="/">
              <Image
                src="/images/design-mode/logo(1).png"
                alt="Logo"
                width={200}
                height={60}
                className="max-w-[200px] mx-auto"
              />
            </Link>
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
                  <Link href="#pricing">Pricing</Link>
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

      {/* Featured Projects Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative bg-background rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black-200 text-white hover:bg-primary transition-colors"
              aria-label="Close modal"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>

            <div className="relative w-full aspect-video">
              <Image
                src={selectedProject.image || "/placeholder.svg"}
                alt={selectedProject.title}
                fill
                className="object-cover rounded-t-2xl"
              />
              <span className="absolute top-6 left-6 inline-block rounded-[32px] bg-primary py-[7px] px-[14px] text-white text-sm uppercase tracking-wider leading-[30px] font-medium">
                {selectedProject.category}
              </span>
            </div>

            <div className="p-8">
              <h2 className="text-4xl font-semibold mb-4">{selectedProject.title}</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
