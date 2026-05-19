import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";
import { industries, locations, services } from "@/data/siteData";

const SITE_URL = "https://nolimitdesigns.com";
const SITE_NAME = "Nolimit Designs";
const DEFAULT_TITLE = "Edmonton Web Design Agency | Nolimit Designs";
const DEFAULT_DESCRIPTION =
  "Nolimit Designs is an Edmonton web design agency building custom websites, e-commerce stores, and SEO strategies for growing local businesses.";
const DEFAULT_IMAGE = `${SITE_URL}/nolimit-logo.png`;

type SeoData = {
  title: string;
  description: string;
  canonical: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  schema?: Record<string, unknown>[];
};

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector(selector) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
}

function upsertLink(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector(selector) as HTMLLinkElement | null;

  if (!element) {
    element = document.createElement("link");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
}

function titleCaseSlug(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getBreadcrumbSchema(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    ...parts.map((part, index) => ({
      "@type": "ListItem",
      position: index + 2,
      name: titleCaseSlug(part),
      item: `${SITE_URL}/${parts.slice(0, index + 1).join("/")}`,
    })),
  ];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    url: SITE_URL,
    logo: DEFAULT_IMAGE,
    image: DEFAULT_IMAGE,
    telephone: "+1-587-882-6700",
    email: "hello@nolimitdesigns.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Edmonton",
      addressRegion: "AB",
      addressCountry: "CA",
    },
    areaServed: ["Edmonton", "St. Albert", "Sherwood Park", "Spruce Grove", "Leduc", "Fort Saskatchewan"],
    priceRange: "$$",
    sameAs: [
      "https://www.linkedin.com",
      "https://www.instagram.com",
      "https://www.facebook.com",
    ],
  };
}

function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/blog-posts?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

function getSeoData(pathname: string): SeoData {
  const canonical = `${SITE_URL}${pathname === "/" ? "" : pathname}`;
  const baseSchema = [getOrganizationSchema(), getWebsiteSchema(), getBreadcrumbSchema(pathname)];

  if (pathname === "/") {
    return {
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      canonical,
      schema: baseSchema,
    };
  }

  if (pathname === "/services") {
    return {
      title: "Web Design & Development Services Edmonton | Nolimit Designs",
      description:
        "Explore Edmonton web design, web development, e-commerce, SEO, UI/UX, digital marketing, and maintenance services from Nolimit Designs.",
      canonical,
      schema: baseSchema,
    };
  }

  if (pathname === "/portfolio") {
    return {
      title: "Web Design Portfolio by Industry | Nolimit Designs Edmonton",
      description:
        "Browse industry-specific website portfolio pages for healthcare, real estate, restaurant, legal, construction, retail, and more Edmonton businesses.",
      canonical,
      schema: baseSchema,
    };
  }

  const serviceMatch = pathname.match(/^\/services\/([^/]+)$/);
  if (serviceMatch) {
    const service = services.find((item) => item.slug === serviceMatch[1]);
    if (service) {
      return {
        title: `${service.name} Edmonton | Nolimit Designs`,
        description: `${service.tagline}. ${service.description}`,
        canonical,
        schema: [
          ...baseSchema,
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.name,
            description: service.description,
            provider: { "@type": "LocalBusiness", name: SITE_NAME, url: SITE_URL },
            areaServed: "Edmonton, Alberta",
            url: canonical,
          },
        ],
      };
    }
  }

  const industryMatch = pathname.match(/^\/portfolio\/([^/]+)$/);
  if (industryMatch) {
    const industry = industries.find((item) => item.slug === industryMatch[1]);
    if (industry) {
      return {
        title: `${industry.name} Website Design Edmonton | Nolimit Designs`,
        description: `${industry.tagline}. ${industry.description}`,
        canonical,
        schema: [
          ...baseSchema,
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: `${industry.name} Website Design`,
            description: industry.description,
            provider: { "@type": "LocalBusiness", name: SITE_NAME, url: SITE_URL },
            areaServed: "Edmonton, Alberta",
            url: canonical,
          },
        ],
      };
    }
  }

  const locationMatch = pathname.match(/^\/web-design\/([^/]+)$/);
  if (locationMatch) {
    const location = locations.find((item) => item.slug === locationMatch[1]);
    if (location) {
      return {
        title: `Web Design ${location.name} | Nolimit Designs`,
        description: `Custom web design and development for ${location.name} businesses. ${location.description}`,
        canonical,
        schema: baseSchema,
      };
    }
  }

  const blogMatch = pathname.match(/^\/blog-posts\/([^/]+)$/);
  if (blogMatch) {
    const post = blogPosts.find((item) => item.slug === blogMatch[1]);
    if (post) {
      return {
        title: `${post.title} | Nolimit Designs`,
        description: post.excerpt,
        canonical,
        image: post.image,
        type: "article",
        schema: [
          ...baseSchema,
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            image: post.image,
            author: { "@type": "Person", name: post.author },
            publisher: { "@type": "Organization", name: SITE_NAME, logo: { "@type": "ImageObject", url: DEFAULT_IMAGE } },
            datePublished: post.date,
            mainEntityOfPage: canonical,
          },
        ],
      };
    }
  }

  const staticPages: Record<string, Omit<SeoData, "canonical" | "schema">> = {
    "/about": {
      title: "About Nolimit Designs | Edmonton Web Design Agency",
      description:
        "Learn about Nolimit Designs, an Edmonton web design agency helping local businesses launch faster websites, SEO strategies, and digital growth systems.",
    },
    "/contact": {
      title: "Contact Nolimit Designs | Edmonton Web Design Quote",
      description:
        "Contact Nolimit Designs for a free Edmonton web design quote, website consultation, SEO strategy, or e-commerce project estimate.",
    },
    "/pricing": {
      title: "Website Pricing Edmonton | Nolimit Designs",
      description:
        "View website pricing options for starter websites, professional websites, e-commerce stores, and SEO services from Nolimit Designs.",
    },
    "/blog-posts": {
      title: "Web Design & SEO Blog Edmonton | Nolimit Designs",
      description:
        "Read Edmonton web design, SEO, e-commerce, and digital marketing insights from the Nolimit Designs team.",
    },
    "/sitemap": {
      title: "Sitemap | Nolimit Designs",
      description: "Find every Nolimit Designs service, industry, location, blog, and company page.",
    },
    "/privacy-policy": {
      title: "Privacy Policy | Nolimit Designs",
      description: "Privacy policy for Nolimit Designs website visitors, clients, and project inquiries.",
    },
    "/terms-of-service": {
      title: "Terms of Service | Nolimit Designs",
      description: "Terms of service for Nolimit Designs website visitors and clients.",
    },
  };

  if (staticPages[pathname]) {
    return { ...staticPages[pathname], canonical, schema: baseSchema };
  }

  return {
    title: "Page Not Found | Nolimit Designs",
    description: "The page you requested could not be found on Nolimit Designs.",
    canonical,
    noindex: true,
    schema: baseSchema,
  };
}

export function SeoManager() {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname.replace(/\/$/, "") || "/";
    const seo = getSeoData(pathname);
    const image = seo.image ?? DEFAULT_IMAGE;
    const type = seo.type ?? "website";

    document.title = seo.title;

    upsertMeta('meta[name="description"]', { name: "description", content: seo.description });
    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: seo.noindex ? "noindex, nofollow" : "index, follow",
    });
    upsertLink('link[rel="canonical"]', { rel: "canonical", href: seo.canonical });

    upsertMeta('meta[property="og:title"]', { property: "og:title", content: seo.title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: seo.description });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: type });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: seo.canonical });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: image });
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: SITE_NAME });
    upsertMeta('meta[property="og:locale"]', { property: "og:locale", content: "en_CA" });

    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: seo.title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: seo.description });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: image });

    const existingJsonLd = document.head.querySelector("#nolimit-seo-jsonld");
    existingJsonLd?.remove();
    const jsonLd = document.createElement("script");
    jsonLd.id = "nolimit-seo-jsonld";
    jsonLd.type = "application/ld+json";
    jsonLd.textContent = JSON.stringify(seo.schema ?? []);
    document.head.appendChild(jsonLd);
  }, [location.pathname]);

  return null;
}
