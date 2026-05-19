import fs from "node:fs";
import path from "node:path";

const SITE_URL = "https://www.nolimitdesigns.ca";
const SITE_NAME = "Nolimit Designs";
const DEFAULT_IMAGE = `${SITE_URL}/nolimit-logo.png`;
const LASTMOD = "2026-05-19";

const distDir = path.resolve("dist");
const sourceHtmlPath = path.join(distDir, "index.html");

const services = [
  ["web-development", "Web Development", "Custom Web Development in Edmonton", "We build fast, responsive, and SEO-optimized websites using modern technologies for Edmonton businesses."],
  ["ecommerce", "E-Commerce Development", "E-Commerce Solutions That Drive Sales", "Launch your online store with Shopify, WooCommerce, or custom e-commerce development that converts visitors into customers."],
  ["seo-services", "SEO Services", "Dominate Edmonton Search Results", "Local SEO, technical SEO, content strategy, link building, and monthly reporting for Edmonton businesses."],
  ["ui-ux-design", "UI/UX Design", "User-Centered Design That Converts", "Beautiful, intuitive website design that improves user engagement and conversion rates."],
  ["digital-marketing", "Digital Marketing", "Data-Driven Digital Marketing", "Google Ads, social media, email marketing, analytics, and conversion optimization for local growth."],
  ["website-maintenance", "Website Maintenance", "Keep Your Website Running Perfectly", "Security updates, performance monitoring, content updates, backups, and priority website support."],
];

const industries = [
  ["healthcare", "Healthcare", "HIPAA-Compliant Healthcare Websites", "Secure, patient-friendly websites for clinics, hospitals, and healthcare providers in Edmonton."],
  ["real-estate", "Real Estate", "MLS-Integrated Real Estate Websites", "Custom real estate websites with IDX, property search, virtual tours, and lead capture."],
  ["restaurant", "Restaurant", "Mouth-Watering Restaurant Websites", "Mobile-first restaurant websites with online ordering, reservations, and menu management."],
  ["legal", "Legal", "Professional Law Firm Websites", "Authoritative law firm websites that showcase expertise, generate qualified leads, and streamline client intake in Edmonton."],
  ["construction", "Construction", "Powerful Construction Company Websites", "Construction websites with project portfolios, quote request systems, and trust-building service pages."],
  ["automotive", "Automotive", "High-Performance Automotive Websites", "Automotive websites with inventory management, service booking, and financing tools."],
  ["fitness", "Fitness", "Energizing Fitness & Gym Websites", "Fitness websites with class schedules, membership flows, trainer profiles, and booking tools."],
  ["education", "Education", "Engaging Education Websites", "Education websites with course catalogs, student portals, event calendars, and application forms."],
  ["finance", "Finance", "Secure Financial Services Websites", "Financial services websites with calculators, client portals, appointment booking, and compliance-ready content."],
  ["retail", "Retail", "Revenue-Driving Retail Websites", "Retail and e-commerce websites with inventory, payments, product reviews, and loyalty features."],
  ["beauty-salon", "Beauty & Salon", "Stunning Beauty & Salon Websites", "Salon websites with online booking, service menus, stylist portfolios, and gift card sales."],
  ["photography", "Photography", "Visual Photography Portfolio Websites", "Photography websites with galleries, client proofing, booking, and package pricing."],
  ["non-profit", "Non-Profit", "Impactful Non-Profit Websites", "Non-profit websites with donation systems, volunteer sign-ups, event management, and impact storytelling."],
  ["tech-startup", "Tech Startup", "Launch-Ready Startup Websites", "Startup websites with product landing pages, demos, onboarding flows, and investor-ready content."],
  ["manufacturing", "Manufacturing", "Industrial Manufacturing Websites", "Manufacturing websites with product catalogs, RFQ systems, technical specs, and distributor portals."],
  ["plumbing-hvac", "Plumbing & HVAC", "Service-Focused Plumbing & HVAC Websites", "Plumbing and HVAC websites built to generate emergency calls and scheduled appointments."],
  ["dental", "Dental", "Patient-Friendly Dental Websites", "Dental websites with appointment booking, treatment pages, patient education, and emergency contact paths."],
  ["veterinary", "Veterinary", "Caring Veterinary Clinic Websites", "Veterinary websites with pet portals, appointment booking, emergency info, and pet health resources."],
  ["landscaping", "Landscaping", "Beautiful Landscaping Company Websites", "Landscaping websites with before-and-after galleries, quote calculators, and seasonal service pages."],
  ["wedding-events", "Wedding & Events", "Elegant Wedding & Event Websites", "Event websites with galleries, booking systems, package pricing, and RSVP management."],
];

const locations = [
  ["edmonton", "Edmonton", "Alberta's Capital City", "Custom web design and development for Edmonton businesses across healthcare, real estate, retail, professional services, and more."],
  ["st-albert", "St. Albert", "Edmonton Metropolitan Region", "Professional web design and development for St. Albert businesses ready to grow online."],
  ["sherwood-park", "Sherwood Park", "Strathcona County", "Modern websites and local SEO for Sherwood Park businesses and Strathcona County companies."],
  ["spruce-grove", "Spruce Grove", "Parkland County", "Custom web solutions for Spruce Grove businesses that need more leads, calls, bookings, and sales."],
  ["leduc", "Leduc", "Leduc County", "Website design and development for Leduc businesses near Edmonton International Airport and the Nisku corridor."],
  ["fort-saskatchewan", "Fort Saskatchewan", "Edmonton Metropolitan Region", "Professional websites for Fort Saskatchewan industrial, commercial, and local service businesses."],
];

const staticRoutes = [
  ["/", "Edmonton Web Design Agency | Nolimit Designs", "Nolimit Designs is an Edmonton web design agency building custom websites, e-commerce stores, and SEO strategies for growing local businesses.", 1],
  ["/services", "Web Design & Development Services Edmonton | Nolimit Designs", "Explore Edmonton web design, web development, e-commerce, SEO, UI/UX, digital marketing, and maintenance services from Nolimit Designs.", 0.9],
  ["/portfolio", "Web Design Portfolio by Industry | Nolimit Designs Edmonton", "Browse industry-specific website portfolio pages for healthcare, real estate, restaurant, legal, construction, retail, and more Edmonton businesses.", 0.9],
  ["/pricing", "Website Pricing Edmonton | Nolimit Designs", "View website pricing options for starter websites, professional websites, e-commerce stores, and SEO services from Nolimit Designs.", 0.8],
  ["/about", "About Nolimit Designs | Edmonton Web Design Agency", "Learn about Nolimit Designs, an Edmonton web design agency helping local businesses launch faster websites, SEO strategies, and digital growth systems.", 0.8],
  ["/contact", "Contact Nolimit Designs | Edmonton Web Design Quote", "Contact Nolimit Designs for a free Edmonton web design quote, website consultation, SEO strategy, or e-commerce project estimate.", 0.9],
  ["/blog-posts", "Web Design & SEO Blog Edmonton | Nolimit Designs", "Read Edmonton web design, SEO, e-commerce, and digital marketing insights from the Nolimit Designs team.", 0.8],
  ["/sitemap", "Sitemap | Nolimit Designs", "Find every Nolimit Designs service, industry, location, blog, and company page.", 0.5],
  ["/privacy-policy", "Privacy Policy | Nolimit Designs", "Privacy policy for Nolimit Designs website visitors, clients, and project inquiries.", 0.3],
  ["/terms-of-service", "Terms of Service | Nolimit Designs", "Terms of service for Nolimit Designs website visitors and clients.", 0.3],
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function canonicalFor(route) {
  return `${SITE_URL}${route === "/" ? "" : route}`;
}

function titleCaseSlug(slug) {
  return slug.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

function breadcrumbSchema(route) {
  const parts = route.split("/").filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      ...parts.map((part, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: titleCaseSlug(part),
        item: `${SITE_URL}/${parts.slice(0, index + 1).join("/")}`,
      })),
    ],
  };
}

function organizationSchema() {
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
    areaServed: locations.map(([, name]) => name),
    priceRange: "$$",
  };
}

function serviceSchema(route, name, description) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: { "@type": "LocalBusiness", name: SITE_NAME, url: SITE_URL },
    areaServed: "Edmonton, Alberta",
    url: canonicalFor(route),
  };
}

function extractBlogPosts() {
  const sourcePath = path.resolve("src/data/blogPosts.ts");
  if (!fs.existsSync(sourcePath)) {
    return [];
  }

  const source = fs.readFileSync(sourcePath, "utf8");
  const blocks = source.match(/\{\s*slug:\s*"[^"]+"[\s\S]*?\n\s*\},/g) ?? [];

  return blocks.map((block) => {
    const get = (field) => block.match(new RegExp(`${field}:\\s*"([^"]+)"`))?.[1] ?? "";
    return {
      slug: get("slug"),
      title: get("title"),
      excerpt: block.match(/excerpt:\s*[\r\n\s]*"([\s\S]*?)",/)?.[1]?.replace(/\s+/g, " ").trim() ?? "",
      image: get("image"),
      author: get("author"),
      date: get("date"),
    };
  }).filter((post) => post.slug && post.title);
}

function metaBlock(page) {
  const image = page.image || DEFAULT_IMAGE;
  const type = page.type || "website";
  const robots = page.noindex ? "noindex, nofollow" : "index, follow";

  return `    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}" />
    <meta name="robots" content="${robots}" />
    <link rel="canonical" href="${escapeHtml(page.canonical)}" />
    <meta property="og:title" content="${escapeHtml(page.title)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    <meta property="og:type" content="${type}" />
    <meta property="og:url" content="${escapeHtml(page.canonical)}" />
    <meta property="og:image" content="${escapeHtml(image)}" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:locale" content="en_CA" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(page.title)}" />
    <meta name="twitter:description" content="${escapeHtml(page.description)}" />
    <meta name="twitter:image" content="${escapeHtml(image)}" />
    <script type="application/ld+json">${JSON.stringify(page.schema)}</script>
`;
}

function injectMeta(html, page) {
  const nextBlock = metaBlock(page);
  return html.replace(
    /    <title>[\s\S]*?    <link rel="icon"/,
    () => `${nextBlock}    <link rel="icon"`
  );
}

function writeRouteHtml(route, html) {
  if (route === "/") {
    fs.writeFileSync(sourceHtmlPath, html);
    return;
  }

  const outputDir = path.join(distDir, route.slice(1));
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, "index.html"), html);
}

function buildPages() {
  const pages = staticRoutes.map(([route, title, description, priority]) => ({
    route,
    title,
    description,
    priority,
    canonical: canonicalFor(route),
    schema: [organizationSchema(), breadcrumbSchema(route)],
  }));

  services.forEach(([slug, name, tagline, description]) => {
    const route = `/services/${slug}`;
    pages.push({
      route,
      title: `${name} Edmonton | Nolimit Designs`,
      description: `${tagline}. ${description}`,
      priority: 0.8,
      canonical: canonicalFor(route),
      schema: [organizationSchema(), breadcrumbSchema(route), serviceSchema(route, name, description)],
    });
  });

  industries.forEach(([slug, name, tagline, description]) => {
    const route = `/portfolio/${slug}`;
    pages.push({
      route,
      title: `${name} Website Design Edmonton | Nolimit Designs`,
      description: `${tagline}. ${description}`,
      priority: slug === "legal" ? 0.85 : 0.7,
      canonical: canonicalFor(route),
      schema: [organizationSchema(), breadcrumbSchema(route), serviceSchema(route, `${name} Website Design`, description)],
    });
  });

  locations.forEach(([slug, name, region, description]) => {
    const route = `/web-design/${slug}`;
    pages.push({
      route,
      title: `Web Design ${name} | Nolimit Designs`,
      description: `${description} Serving ${region} with web design, development, SEO, and e-commerce services.`,
      priority: slug === "edmonton" ? 0.85 : 0.7,
      canonical: canonicalFor(route),
      schema: [organizationSchema(), breadcrumbSchema(route)],
    });
  });

  extractBlogPosts().forEach((post) => {
    const route = `/blog-posts/${post.slug}`;
    pages.push({
      route,
      title: `${post.title} | Nolimit Designs`,
      description: post.excerpt,
      image: post.image,
      type: "article",
      priority: 0.6,
      canonical: canonicalFor(route),
      schema: [
        organizationSchema(),
        breadcrumbSchema(route),
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          image: post.image,
          author: { "@type": "Person", name: post.author },
          publisher: { "@type": "Organization", name: SITE_NAME, logo: { "@type": "ImageObject", url: DEFAULT_IMAGE } },
          datePublished: post.date,
          mainEntityOfPage: canonicalFor(route),
        },
      ],
    });
  });

  return pages;
}

function writeSitemap(pages) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((page) => `  <url><loc>${page.canonical}</loc><lastmod>${LASTMOD}</lastmod><changefreq>monthly</changefreq><priority>${page.priority}</priority></url>`).join("\n")}
</urlset>
`;
  fs.writeFileSync(path.join(distDir, "sitemap.xml"), xml);
}

if (!fs.existsSync(sourceHtmlPath)) {
  throw new Error("dist/index.html does not exist. Run vite build before prerendering SEO routes.");
}

const sourceHtml = fs.readFileSync(sourceHtmlPath, "utf8");
const pages = buildPages();

pages.forEach((page) => {
  writeRouteHtml(page.route, injectMeta(sourceHtml, page));
});
writeSitemap(pages);

console.log(`SEO prerendered ${pages.length} route(s).`);
