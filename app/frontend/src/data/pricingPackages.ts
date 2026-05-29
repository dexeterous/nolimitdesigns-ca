export type PricingPackage = {
  id: string;
  label: string;
  icon: string;
  eyebrow: string;
  title: string;
  description: string;
  investment: string;
  details: [string, string][];
  features: string[];
  cta: string;
  service: string;
  highlighted?: boolean;
};

export const pricingPackages: PricingPackage[] = [
  {
    id: "starter",
    label: "Starter",
    icon: "ri-computer-line",
    eyebrow: "Starter Package",
    title: "Starter Website",
    description:
      "A polished, fast website for businesses that need to look credible online and start collecting leads.",
    investment: "$1,600",
    details: [
      ["Pages", "5-6 Custom"],
      ["Timeline", "3-4 Weeks"],
      ["Best For", "New Businesses"],
    ],
    features: ["Mobile responsive", "Contact forms", "Basic on-page SEO", "Launch support"],
    cta: "Get Started",
    service: "Web Development",
  },
  {
    id: "professional",
    label: "Professional",
    icon: "ri-layout-4-line",
    eyebrow: "Most Popular",
    title: "Professional Website",
    description:
      "A conversion-focused website with stronger content structure, local SEO, and pages built around your services.",
    investment: "$1,800 - $5,000",
    details: [
      ["Pages", "7-15+ Custom"],
      ["SEO", "Full Local SEO"],
      ["Best For", "Growing Teams"],
    ],
    features: ["Service pages", "Local search setup", "Analytics ready", "Conversion strategy"],
    cta: "Get Started",
    service: "Web Development",
    highlighted: true,
  },
  {
    id: "ecommerce",
    label: "E-Commerce",
    icon: "ri-shopping-cart-line",
    eyebrow: "Online Store",
    title: "E-Commerce Store",
    description:
      "A complete online store with product structure, cart flows, secure payment setup, and inventory foundations.",
    investment: "$4,500 - $7,000",
    details: [
      ["Store", "Full Setup"],
      ["Payments", "Secure Processing"],
      ["Best For", "Online Sales"],
    ],
    features: ["Product catalog", "Cart and checkout", "Payment setup", "Inventory basics"],
    cta: "Get a Quote",
    service: "E-Commerce",
  },
  {
    id: "seo",
    label: "SEO Services",
    icon: "ri-line-chart-line",
    eyebrow: "Monthly Service",
    title: "SEO Services",
    description:
      "Ongoing local SEO for Edmonton businesses that want stronger rankings, better content, and monthly reporting.",
    investment: "$1,500+/mo",
    details: [
      ["Contract", "Month-to-Month"],
      ["Reporting", "Monthly Reports"],
      ["Best For", "Ranking Growth"],
    ],
    features: ["Keyword research", "On-page optimization", "Competitor analysis", "Backlink building"],
    cta: "Learn More",
    service: "SEO Services",
  },
];

export function getPricingPackage(packageId: string | null) {
  return pricingPackages.find((pkg) => pkg.id === packageId) ?? null;
}

export function getPackageContactPath(packageId: string) {
  return `/contact?package=${encodeURIComponent(packageId)}`;
}
