import { useParams, Link } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { blogPosts } from "@/data/blogPosts";

function renderMarkdown(content: string) {
  const lines = content.trim().split("\n");
  const elements: JSX.Element[] = [];
  let inList = false;
  let listItems: string[] = [];
  let inTable = false;
  let tableRows: string[][] = [];
  let tableHeaders: string[] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="space-y-2 my-4 ml-4">
          {listItems.map((item, idx) => (
            <li key={idx} className="text-[rgb(119,119,125)] text-base leading-7 flex items-start gap-2">
              <i className="ri-check-line text-[#ff4f01] mt-1 shrink-0" />
              <span dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            </li>
          ))}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  };

  const flushTable = () => {
    if (tableRows.length > 0) {
      elements.push(
        <div key={`table-${elements.length}`} className="overflow-x-auto my-6">
          <table className="w-full border-collapse border border-[#ddd] text-sm">
            {tableHeaders.length > 0 && (
              <thead>
                <tr className="bg-[#f5f0e8]">
                  {tableHeaders.map((h, idx) => (
                    <th key={idx} className="border border-[#ddd] px-4 py-2 text-left font-semibold text-[#101010]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {tableRows.map((row, rIdx) => (
                <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-white" : "bg-[#faf6f0]"}>
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="border border-[#ddd] px-4 py-2 text-[rgb(119,119,125)]">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
      tableHeaders = [];
      inTable = false;
    }
  };

  const formatInline = (text: string): string => {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-[#101010] font-semibold">$1</strong>')
      .replace(/\*(.+?)\*/g, "<em>$1</em>");
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Table row
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      flushList();
      const cells = trimmed
        .split("|")
        .filter((c) => c.trim() !== "")
        .map((c) => c.trim());

      // Check if separator row
      if (cells.every((c) => /^[-:]+$/.test(c))) {
        continue;
      }

      if (!inTable) {
        inTable = true;
        tableHeaders = cells;
      } else {
        tableRows.push(cells);
      }
      continue;
    } else if (inTable) {
      flushTable();
    }

    if (trimmed === "") {
      flushList();
      continue;
    }

    if (trimmed.startsWith("### ")) {
      flushList();
      elements.push(
        <h3
          key={`h3-${i}`}
          className="text-xl font-bold font-bricolage text-[#101010] mt-8 mb-3"
        >
          {trimmed.slice(4)}
        </h3>
      );
    } else if (trimmed.startsWith("## ")) {
      flushList();
      elements.push(
        <h2
          key={`h2-${i}`}
          className="text-2xl lg:text-3xl font-bold font-bricolage text-[#101010] mt-10 mb-4"
        >
          {trimmed.slice(3)}
        </h2>
      );
    } else if (trimmed.startsWith("- ")) {
      inList = true;
      listItems.push(trimmed.slice(2));
    } else {
      flushList();
      elements.push(
        <p
          key={`p-${i}`}
          className="text-[rgb(119,119,125)] text-base leading-7 my-3"
          dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }}
        />
      );
    }
  }

  flushList();
  flushTable();

  return elements;
}

function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const url = typeof window !== "undefined" ? window.location.origin + `/blog-posts/${slug}` : "";
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    const btn = document.getElementById("copy-btn");
    if (btn) {
      btn.textContent = "Copied!";
      setTimeout(() => {
        btn.textContent = "Copy Link";
      }, 2000);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-medium text-[#101010]">Share:</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-full bg-[#070707] flex items-center justify-center text-white hover:bg-[#ff4f01] transition-all duration-300"
        title="Share on X"
      >
        <i className="ri-twitter-x-line text-sm" />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-full bg-[#070707] flex items-center justify-center text-white hover:bg-[#ff4f01] transition-all duration-300"
        title="Share on LinkedIn"
      >
        <i className="ri-linkedin-fill text-sm" />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-full bg-[#070707] flex items-center justify-center text-white hover:bg-[#ff4f01] transition-all duration-300"
        title="Share on Facebook"
      >
        <i className="ri-facebook-fill text-sm" />
      </a>
      <a
        href={`mailto:?subject=${encodedTitle}&body=Check out this article: ${encodedUrl}`}
        className="w-9 h-9 rounded-full bg-[#070707] flex items-center justify-center text-white hover:bg-[#ff4f01] transition-all duration-300"
        title="Share via Email"
      >
        <i className="ri-mail-line text-sm" />
      </a>
      <button
        id="copy-btn"
        onClick={copyLink}
        className="px-4 py-1.5 rounded-full bg-[#070707] text-white text-sm hover:bg-[#ff4f01] transition-all duration-300 cursor-pointer"
        title="Copy link"
      >
        Copy Link
      </button>
    </div>
  );
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#fff6ec]">
        <SiteHeader />
        <section className="lg:pt-[180px] pt-[120px] pb-16">
          <div className="container-custom text-center">
            <h1 className="font-bricolage font-semibold text-4xl text-[#101010] mb-4">
              Article Not Found
            </h1>
            <p className="text-lg text-[rgb(119,119,125)] mb-8">
              The article you're looking for doesn't exist or has been moved.
            </p>
            <Link to="/blog-posts" className="btn btn-primary">
              Back to Blog
            </Link>
          </div>
        </section>
        <SiteFooter />
      </div>
    );
  }

  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#fff6ec]">
      <SiteHeader />

      {/* Hero */}
      <section className="lg:pt-[180px] pt-[120px] pb-8">
        <div className="container-custom max-w-4xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-[rgb(119,119,125)] mb-6">
            <Link to="/" className="hover:text-[#ff4f01] transition-colors">
              Home
            </Link>
            <i className="ri-arrow-right-s-line" />
            <Link to="/blog-posts" className="hover:text-[#ff4f01] transition-colors">
              Blog
            </Link>
            <i className="ri-arrow-right-s-line" />
            <span className="text-[#101010]">{post.title}</span>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-[#ff4f01]/10 text-[#ff4f01] text-xs font-medium">
              {post.category}
            </span>
            <span className="text-sm text-[rgb(119,119,125)]">{post.date}</span>
            <span className="text-sm text-[rgb(119,119,125)]">•</span>
            <span className="text-sm text-[rgb(119,119,125)]">{post.readTime}</span>
          </div>

          {/* Title */}
          <h1 className="font-bricolage font-semibold xl:text-[48px] xl:leading-[56px] lg:text-[40px] lg:leading-[48px] md:text-[36px] md:leading-[44px] text-[28px] leading-[36px] text-[#101010] mb-6">
            {post.title}
          </h1>

          {/* Author & Share */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#ff4f01] flex items-center justify-center text-white font-bold text-lg">
                {post.author[0]}
              </div>
              <div>
                <p className="font-medium text-[#101010] text-sm">{post.author}</p>
                <p className="text-xs text-[rgb(119,119,125)]">{post.authorRole}</p>
              </div>
            </div>
            <ShareButtons title={post.title} slug={post.slug} />
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-8">
        <div className="container-custom max-w-4xl">
          <img
            src={post.image}
            alt={post.title}
            className="w-full rounded-2xl object-cover max-h-[480px]"
          />
        </div>
      </section>

      {/* Content */}
      <section className="pb-12">
        <div className="container-custom max-w-4xl">
          <div className="bg-white/60 rounded-2xl p-8 lg:p-12 border border-[#e8e4de]">
            {renderMarkdown(post.content)}
          </div>
        </div>
      </section>

      {/* Bottom Share */}
      <section className="pb-12">
        <div className="container-custom max-w-4xl">
          <div className="border-t border-b border-[#ddd] py-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-[#101010] font-medium font-bricolage">
              Enjoyed this article? Share it with your network.
            </p>
            <ShareButtons title={post.title} slug={post.slug} />
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="lg:pb-24 pb-16">
        <div className="container-custom">
          <h2 className="font-bricolage font-semibold text-3xl lg:text-4xl text-[#101010] text-center mb-10">
            More Articles
          </h2>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {relatedPosts.map((rp) => (
              <Link
                key={rp.slug}
                to={`/blog-posts/${rp.slug}`}
                className="rounded-2xl overflow-hidden border border-[#bebebe] hover:border-[#ff4f01] transition-all duration-500 bg-white/50 group flex flex-col"
              >
                <div className="overflow-hidden">
                  <img
                    src={rp.image}
                    alt={rp.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full bg-[#ff4f01]/10 text-[#ff4f01] text-xs font-medium">
                      {rp.category}
                    </span>
                    <span className="text-xs text-[rgb(119,119,125)]">{rp.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold font-bricolage text-[#101010] mb-2 group-hover:text-[#ff4f01] transition-colors">
                    {rp.title}
                  </h3>
                  <p className="text-[rgb(119,119,125)] text-sm leading-6 flex-1 line-clamp-2">
                    {rp.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#eee]">
                    <span className="text-xs text-[rgb(119,119,125)]">{rp.date}</span>
                    <span className="inline-flex items-center gap-1 text-[#ff4f01] text-sm font-medium">
                      Read <i className="ri-arrow-right-line" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}