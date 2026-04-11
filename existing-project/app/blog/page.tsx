import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Blog | NoLimit Designs",
  description: "Design and marketing insights to help you grow your brand. Tips, trends, and best practices.",
}

const blogPosts = [
  {
    title: "How Consistent Branding Builds Trust",
    description:
      "Learn why brand consistency across all touchpoints is crucial for building customer trust and loyalty.",
    category: "Branding",
    image: "/brand-identity-design.jpg",
    date: "March 15, 2024",
    slug: "consistent-branding-builds-trust",
  },
  {
    title: "Why Subscription Design Services Are Growing",
    description:
      "The rise of design subscriptions and why more businesses are choosing unlimited design over traditional agencies.",
    category: "Industry",
    image: "/design-team-collaboration.jpg",
    date: "March 10, 2024",
    slug: "subscription-design-services-growing",
  },
  {
    title: "Design Tips for Social Media Marketing",
    description:
      "Best practices for creating scroll-stopping social media graphics that drive engagement and conversions.",
    category: "Social Media",
    image: "/social-media-design-mockup.jpg",
    date: "March 5, 2024",
    slug: "design-tips-social-media",
  },
  {
    title: "How Video Content Improves Engagement",
    description:
      "Statistics and strategies for using video content to boost engagement across your marketing channels.",
    category: "Video",
    image: "/promotional-video-editing.jpg",
    date: "February 28, 2024",
    slug: "video-content-improves-engagement",
  },
  {
    title: "The Power of Visual Storytelling in Marketing",
    description:
      "How to use visual storytelling to connect with your audience and make your brand memorable.",
    category: "Marketing",
    image: "/marketing-landing-page.png",
    date: "February 20, 2024",
    slug: "visual-storytelling-marketing",
  },
  {
    title: "Creating Effective Display Ads That Convert",
    description: "Tips for designing display ads that capture attention and drive clicks without being annoying.",
    category: "Advertising",
    image: "/display-ads-mockup.jpg",
    date: "February 15, 2024",
    slug: "effective-display-ads",
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="lg:pt-[180px] pt-[120px] pb-15">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <h3 className="border border-[#bebebe] py-2.5 px-5 rounded-3xl md:text-base md:leading-5 text-sm inline-block font-normal mb-[5px]">
              <i className="ri-article-line text-primary"></i>
              Blog
            </h3>
            <h1 className="lg:py-2.5 py-5 font-semibold xl:leading-[90px] xl:text-[70px] md:leading-[60px] md:text-[50px] leading-[50px] text-[40px]">
              Design and Marketing Insights
            </h1>
            <p className="text-xl leading-7 text-black-100">
              Stay updated with practical insights on design, branding, and marketing creativity.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="pb-25">
        <div className="container">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {blogPosts.map((post, index) => (
              <Link key={index} href={`/blog/${post.slug}`}>
                <article className="border border-[#bebebe] rounded-[15px] overflow-hidden hover:border-primary transition-all duration-500 h-full flex flex-col">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-sm text-[rgb(119,119,125)] mb-2">{post.date}</p>
                    <h3 className="text-xl font-medium mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-[rgb(119,119,125)] mb-4 flex-grow line-clamp-3">{post.description}</p>
                    <span className="text-primary font-medium inline-flex items-center gap-2 hover:gap-3 transition-all">
                      Read More <i className="ri-arrow-right-line"></i>
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-25 bg-black-200">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-[40px] md:text-[50px] font-medium text-white mb-4">
              <span className="text-white">Subscribe to Our Newsletter</span>
            </h2>
            <p className="text-lg text-[#dedede] mb-7.5">
              Get weekly design tips, industry insights, and exclusive content delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-5 py-4 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="btn bg-primary text-secondary border-primary hover:bg-white hover:text-black-200 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
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
              Get unlimited design for one flat monthly fee.
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

      <SiteFooter />
    </div>
  )
}
