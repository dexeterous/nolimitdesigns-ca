import { useState } from "react";
import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { blogPosts } from "@/data/blogPosts";

const categories = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#fff6ec]">
      <SiteHeader />

      {/* Hero */}
      <section className="lg:pt-[180px] pt-[120px] pb-16">
        <div className="container-custom text-center">
          <span className="inline-flex items-center gap-2 border border-[#bebebe] py-2 px-5 rounded-full text-sm font-medium mb-4">
            <i className="ri-article-line text-[#ff4f01]" />
            Blog
          </span>
          <h1 className="font-bricolage font-semibold xl:text-[64px] xl:leading-[72px] lg:text-[52px] lg:leading-[60px] md:text-[42px] md:leading-[50px] text-[34px] leading-[42px] text-[#101010] mb-4">
            Design Tips &amp; Marketing Insights
          </h1>
          <p className="text-lg text-[rgb(119,119,125)] max-w-2xl mx-auto">
            Practical advice on graphic design, video marketing, branding, and scaling your creative production.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="pb-8">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#ff4f01] text-white"
                    : "bg-white border border-[#bebebe] text-[#101010] hover:border-[#ff4f01]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {filtered.length > 0 && (
        <section className="pb-12">
          <div className="container-custom">
            <Link
              to={`/blog-posts/${filtered[0].slug}`}
              className="grid lg:grid-cols-2 gap-8 rounded-2xl overflow-hidden border border-[#bebebe] hover:border-[#ff4f01] transition-all duration-500 bg-white/50 group"
            >
              <div className="overflow-hidden">
                <img
                  src={filtered[0].image}
                  alt={filtered[0].title}
                  className="w-full h-full min-h-[280px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#ff4f01]/10 text-[#ff4f01] text-xs font-medium">
                    {filtered[0].category}
                  </span>
                  <span className="text-sm text-[rgb(119,119,125)]">{filtered[0].date}</span>
                  <span className="text-sm text-[rgb(119,119,125)]">•</span>
                  <span className="text-sm text-[rgb(119,119,125)]">{filtered[0].readTime}</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold font-bricolage text-[#101010] mb-4 group-hover:text-[#ff4f01] transition-colors">
                  {filtered[0].title}
                </h2>
                <p className="text-[rgb(119,119,125)] text-base leading-7 mb-6">
                  {filtered[0].excerpt}
                </p>
                <span className="inline-flex items-center gap-1 text-[#ff4f01] font-medium hover:gap-2 transition-all">
                  Read Article <i className="ri-arrow-right-line" />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Post Grid */}
      <section className="lg:pb-24 pb-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {filtered.slice(1).map((post) => (
              <Link
                key={post.slug}
                to={`/blog-posts/${post.slug}`}
                className="rounded-2xl overflow-hidden border border-[#bebebe] hover:border-[#ff4f01] transition-all duration-500 bg-white/50 group flex flex-col"
              >
                <div className="overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full bg-[#ff4f01]/10 text-[#ff4f01] text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="text-xs text-[rgb(119,119,125)]">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold font-bricolage text-[#101010] mb-2 group-hover:text-[#ff4f01] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[rgb(119,119,125)] text-sm leading-6 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#eee]">
                    <span className="text-xs text-[rgb(119,119,125)]">{post.date}</span>
                    <span className="inline-flex items-center gap-1 text-[#ff4f01] text-sm font-medium">
                      Read More <i className="ri-arrow-right-line" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="lg:pb-24 pb-16">
        <div className="container-custom">
          <div className="relative bg-gradient-to-br from-[#070707] to-[#1f1f1f] rounded-3xl p-12 lg:p-16 text-center overflow-hidden">
            <div className="relative z-10">
              <h2 className="font-bricolage font-semibold xl:text-[48px] xl:leading-[56px] md:text-[36px] md:leading-[44px] text-[28px] leading-[36px] text-white mb-4">
                Get Design Tips in Your Inbox
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
                Join thousands of marketers and business owners who receive our weekly design and marketing insights.
              </p>
              <a href="/#pricing" className="btn btn-primary">
                Start Your Subscription
              </a>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff4f01]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#ff4f01]/5 rounded-full blur-3xl" />
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}