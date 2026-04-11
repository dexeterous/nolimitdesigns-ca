import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Design Services | NoLimit Designs",
  description:
    "Comprehensive graphic and video design services. From social media graphics to brand identity, video editing to motion graphics.",
}

export default function ServicesPage() {
  const graphicServices = [
    {
      title: "Social Media Graphics",
      description: "Posts, stories, covers, and social media graphics for all platforms including Instagram, Facebook, LinkedIn, and more.",
      icon: "ri-instagram-line",
      link: "/services/social-media-design",
    },
    {
      title: "Logo Design",
      description: "Custom logo design, brand marks, and logo variations that capture your brand essence.",
      icon: "ri-contrast-drop-2-line",
      link: "/services/logos",
    },
    {
      title: "Brand Identity Systems",
      description: "Complete visual identity systems including color palettes, typography, and brand guidelines.",
      icon: "ri-palette-line",
      link: "/services/branding",
    },
    {
      title: "Presentation Design",
      description: "Professional pitch decks, slide decks, and presentation design for meetings and investors.",
      icon: "ri-slideshow-line",
      link: "/services/presentations",
    },
    {
      title: "Infographics",
      description: "Data visualization, charts, and informational graphics that make complex data understandable.",
      icon: "ri-bar-chart-box-line",
      link: "/services/infographics",
    },
    {
      title: "Website Graphics",
      description: "Hero images, icons, illustrations, and web assets optimized for digital use.",
      icon: "ri-layout-line",
      link: "/services/graphic-design",
    },
    {
      title: "Email Marketing Graphics",
      description: "Eye-catching email headers, banners, and marketing graphics for campaigns.",
      icon: "ri-mail-line",
      link: "/services/marketing-design",
    },
    {
      title: "Advertising Banners",
      description: "Display ads, Google ads, Facebook ads, and digital advertising creatives.",
      icon: "ri-advertisement-line",
      link: "/services/display-ads",
    },
    {
      title: "Print Materials",
      description: "Brochures, flyers, posters, business cards, and other print-ready materials.",
      icon: "ri-printer-line",
      link: "/services/print-design",
    },
  ]

  const videoServices = [
    {
      title: "Short-form Video Editing",
      description: "TikTok, Reels, YouTube Shorts, and social video content optimized for engagement.",
      icon: "ri-smartphone-line",
      link: "/services/video-editing",
    },
    {
      title: "Motion Graphics",
      description: "Animated logos, kinetic typography, and dynamic visual effects for your videos.",
      icon: "ri-movie-2-line",
      link: "/services/motion-graphics",
    },
    {
      title: "Animated Explainers",
      description: "Explainer videos that simplify complex concepts and engage your audience.",
      icon: "ri-video-line",
      link: "/services/video-editing",
    },
    {
      title: "Marketing Videos",
      description: "Promotional videos, product demos, and marketing content for campaigns.",
      icon: "ri-film-line",
      link: "/services/video-editing",
    },
    {
      title: "Social Media Reels",
      description: "Instagram Reels, TikTok videos, and short-form content for social platforms.",
      icon: "ri-play-circle-line",
      link: "/services/video-editing",
    },
    {
      title: "Product Videos",
      description: "Product showcases, demos, and promotional videos that drive conversions.",
      icon: "ri-shopping-bag-line",
      link: "/services/video-editing",
    },
    {
      title: "YouTube Assets",
      description: "Thumbnails, intros, outros, lower thirds, and channel branding elements.",
      icon: "ri-youtube-line",
      link: "/services/video-editing",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="lg:pt-[180px] pt-[120px] pb-15">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <h3 className="border border-[#bebebe] py-2.5 px-5 rounded-3xl md:text-base md:leading-5 text-sm inline-block font-normal mb-[5px]">
              <i className="ri-arrow-right-up-line text-primary"></i>
              Our Services
            </h3>
            <h1 className="lg:py-2.5 py-5 font-semibold xl:leading-[90px] xl:text-[70px] md:leading-[60px] md:text-[50px] leading-[50px] text-[40px]">
              Comprehensive Creative Services
            </h1>
            <p className="text-xl leading-7 text-black-100">
              NoLimit Designs supports a wide range of graphic and video design needs through one flexible subscription.
            </p>
          </div>
        </div>
      </section>

      {/* Graphic Design Services */}
      <section className="pb-25">
        <div className="container">
          <div className="text-center pb-15">
            <h2 className="xl:text-[60px] md:text-[50px] text-[40px] font-medium text-black-100">
              Graphic Design Services
            </h2>
            <p className="md:text-xl md:leading-7 text-base mt-2 max-w-3xl mx-auto">
              Our designers create high-quality graphics that help businesses communicate their message clearly and
              professionally.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {graphicServices.map((service, index) => (
              <Link key={index} href={service.link}>
                <div className="info-item border border-[#bebebe] p-7.5 rounded-[15px] hover:border-primary transition-all duration-500 cursor-pointer h-full flex flex-col">
                  <div className="mb-5">
                    <i className={`${service.icon} text-[40px] text-primary`}></i>
                  </div>
                  <h4 className="text-xl font-medium mb-2">{service.title}</h4>
                  <p className="text-base font-medium text-[rgb(119,119,125)]">{service.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Video Design Services */}
      <section className="pb-25 bg-[rgba(0,0,0,0.02)]">
        <div className="container py-25">
          <div className="text-center pb-15">
            <h2 className="xl:text-[60px] md:text-[50px] text-[40px] font-medium text-black-100">
              Video Design Services
            </h2>
            <p className="md:text-xl md:leading-7 text-base mt-2 max-w-3xl mx-auto">
              Video content plays a critical role in modern marketing. Our video team produces engaging content optimized
              for digital platforms.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {videoServices.map((service, index) => (
              <Link key={index} href={service.link}>
                <div className="info-item border border-[#bebebe] p-7.5 rounded-[15px] hover:border-primary transition-all duration-500 cursor-pointer h-full flex flex-col bg-background">
                  <div className="mb-5">
                    <i className={`${service.icon} text-[40px] text-primary`}></i>
                  </div>
                  <h4 className="text-xl font-medium mb-2">{service.title}</h4>
                  <p className="text-base font-medium text-[rgb(119,119,125)]">{service.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-25">
        <div className="container">
          <div className="lg:w-[75%] mx-auto text-center lg:px-12.5 py-7.5 px-8 border border-[rgba(0,0,0,0.05)] rounded-[20px]">
            <h2 className="xl:text-[60px] md:text-[50px] text-[40px] text-black-100 font-normal">
              Ready to scale your creative output?
            </h2>
            <p className="md:text-xl md:leading-7 text-base mt-2">
              Get unlimited design requests for one flat monthly fee. No contracts, no hidden fees.
            </p>
            <div className="mt-7.5">
              <Link
                href="/#pricing"
                className="btn bg-primary text-secondary border-primary hover:bg-black-200 hover:text-white"
              >
                See Pricing Plans
              </Link>
              <Link href="/contact" className="btn bg-black-200 text-white border-black-200 hover:text-primary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
