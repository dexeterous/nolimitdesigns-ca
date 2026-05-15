// ============================================================
// NOLIMIT DESIGNS - SITE DATA
// All industries, locations, services, and content data
// ============================================================

export interface Industry {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  description: string;
  features: string[];
  stats: { label: string; value: string }[];
}

export interface Service {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  description: string;
  features: string[];
  benefits: string[];
}

export interface Location {
  slug: string;
  name: string;
  region: string;
  description: string;
  population: string;
  keyIndustries: string[];
}

// ============================================================
// 20 INDUSTRIES
// ============================================================
export const industries: Industry[] = [
  {
    slug: "healthcare",
    name: "Healthcare",
    icon: "ri-heart-pulse-line",
    tagline: "HIPAA-Compliant Healthcare Websites",
    description: "We build secure, patient-friendly websites for clinics, hospitals, and healthcare providers in Edmonton. Our healthcare websites include online booking, patient portals, and telemedicine integration.",
    features: ["Patient Portal Integration", "Online Appointment Booking", "HIPAA-Compliant Design", "Telemedicine Ready", "Medical Blog & Resources", "Insurance Verification"],
    stats: [{ label: "Healthcare Sites Built", value: "45+" }, { label: "Patient Bookings/Month", value: "2,500+" }, { label: "Uptime Guarantee", value: "99.9%" }],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    icon: "ri-building-2-line",
    tagline: "MLS-Integrated Real Estate Websites",
    description: "Custom real estate websites with IDX/MLS integration, property search, virtual tours, and lead capture. Help Edmonton buyers and sellers find their perfect match.",
    features: ["IDX/MLS Integration", "Property Search & Filters", "Virtual Tour Support", "Lead Capture Forms", "Mortgage Calculator", "Neighborhood Guides"],
    stats: [{ label: "Real Estate Sites", value: "38+" }, { label: "Leads Generated", value: "5,000+" }, { label: "Properties Listed", value: "10,000+" }],
  },
  {
    slug: "restaurant",
    name: "Restaurant",
    icon: "ri-restaurant-line",
    tagline: "Mouth-Watering Restaurant Websites",
    description: "Beautiful, mobile-first restaurant websites with online ordering, reservation systems, and menu management. Get more diners through your doors in Edmonton.",
    features: ["Online Ordering System", "Table Reservations", "Digital Menu Management", "Google Maps Integration", "Review Integration", "Loyalty Program Support"],
    stats: [{ label: "Restaurant Sites", value: "52+" }, { label: "Online Orders/Month", value: "8,000+" }, { label: "Avg Revenue Increase", value: "35%" }],
  },
  {
    slug: "legal",
    name: "Legal",
    icon: "ri-scales-3-line",
    tagline: "Professional Law Firm Websites",
    description: "Authoritative, trust-building websites for law firms and legal practices. Showcase expertise, generate qualified leads, and streamline client intake in Edmonton.",
    features: ["Practice Area Pages", "Attorney Profiles", "Client Intake Forms", "Case Results Showcase", "Blog & Legal Resources", "Live Chat Integration"],
    stats: [{ label: "Law Firm Sites", value: "28+" }, { label: "Client Inquiries/Month", value: "1,200+" }, { label: "Conversion Rate", value: "12%" }],
  },
  {
    slug: "construction",
    name: "Construction",
    icon: "ri-building-4-line",
    tagline: "Powerful Construction Company Websites",
    description: "Showcase your construction projects with stunning portfolios, project timelines, and quote request systems. Build trust with Edmonton homeowners and businesses.",
    features: ["Project Portfolio Gallery", "Before/After Showcases", "Quote Request System", "Project Timeline Display", "Safety Certifications", "Subcontractor Portal"],
    stats: [{ label: "Construction Sites", value: "33+" }, { label: "Quote Requests/Month", value: "800+" }, { label: "Project Showcases", value: "500+" }],
  },
  {
    slug: "automotive",
    name: "Automotive",
    icon: "ri-car-line",
    tagline: "High-Performance Automotive Websites",
    description: "Drive more customers with automotive websites featuring inventory management, service booking, and financing calculators for Edmonton dealerships and shops.",
    features: ["Vehicle Inventory System", "Service Appointment Booking", "Financing Calculator", "Trade-In Valuation", "Parts Catalog", "Customer Reviews"],
    stats: [{ label: "Auto Sites Built", value: "25+" }, { label: "Service Bookings/Month", value: "1,500+" }, { label: "Inventory Items", value: "3,000+" }],
  },
  {
    slug: "fitness",
    name: "Fitness",
    icon: "ri-run-line",
    tagline: "Energizing Fitness & Gym Websites",
    description: "Motivate members with dynamic fitness websites featuring class schedules, membership management, and online booking for Edmonton gyms and studios.",
    features: ["Class Schedule & Booking", "Membership Management", "Trainer Profiles", "Workout Programs", "Progress Tracking", "Virtual Classes Support"],
    stats: [{ label: "Fitness Sites", value: "30+" }, { label: "Members Managed", value: "15,000+" }, { label: "Classes Booked/Month", value: "4,000+" }],
  },
  {
    slug: "education",
    name: "Education",
    icon: "ri-graduation-cap-line",
    tagline: "Engaging Education Websites",
    description: "Create impactful education websites with course catalogs, student portals, and learning management integration for Edmonton schools and training centers.",
    features: ["Course Catalog", "Student Portal", "LMS Integration", "Event Calendar", "Application Forms", "Alumni Network"],
    stats: [{ label: "Education Sites", value: "22+" }, { label: "Students Enrolled", value: "8,000+" }, { label: "Courses Listed", value: "500+" }],
  },
  {
    slug: "finance",
    name: "Finance",
    icon: "ri-bank-line",
    tagline: "Secure Financial Services Websites",
    description: "Build trust with secure, compliant financial websites featuring calculators, client portals, and appointment booking for Edmonton financial advisors and firms.",
    features: ["Financial Calculators", "Client Portal", "Appointment Booking", "Compliance Ready", "Document Upload", "Market Data Integration"],
    stats: [{ label: "Finance Sites", value: "20+" }, { label: "Client Portals Active", value: "2,000+" }, { label: "Security Compliance", value: "100%" }],
  },
  {
    slug: "retail",
    name: "Retail",
    icon: "ri-store-2-line",
    tagline: "Revenue-Driving Retail Websites",
    description: "E-commerce and retail websites with inventory management, payment processing, and customer loyalty programs for Edmonton retailers.",
    features: ["E-commerce Integration", "Inventory Management", "Payment Processing", "Loyalty Programs", "Product Reviews", "Shipping Calculator"],
    stats: [{ label: "Retail Sites", value: "40+" }, { label: "Products Sold/Month", value: "12,000+" }, { label: "Avg Sales Increase", value: "45%" }],
  },
  {
    slug: "beauty-salon",
    name: "Beauty & Salon",
    icon: "ri-scissors-cut-line",
    tagline: "Stunning Beauty & Salon Websites",
    description: "Gorgeous salon websites with online booking, service menus, and stylist portfolios. Help Edmonton clients discover and book your beauty services.",
    features: ["Online Booking System", "Service Menu & Pricing", "Stylist Portfolios", "Before/After Gallery", "Gift Card Sales", "Loyalty Rewards"],
    stats: [{ label: "Salon Sites", value: "35+" }, { label: "Bookings/Month", value: "3,000+" }, { label: "Client Retention", value: "78%" }],
  },
  {
    slug: "photography",
    name: "Photography",
    icon: "ri-camera-line",
    tagline: "Visual Photography Portfolio Websites",
    description: "Showcase your photography with stunning gallery websites, client proofing, and booking systems for Edmonton photographers.",
    features: ["Portfolio Galleries", "Client Proofing", "Booking Calendar", "Package Pricing", "Print Shop Integration", "Blog & Stories"],
    stats: [{ label: "Photography Sites", value: "28+" }, { label: "Photos Showcased", value: "50,000+" }, { label: "Bookings/Month", value: "200+" }],
  },
  {
    slug: "non-profit",
    name: "Non-Profit",
    icon: "ri-hand-heart-line",
    tagline: "Impactful Non-Profit Websites",
    description: "Inspire donors and volunteers with compelling non-profit websites featuring donation systems, event management, and impact storytelling for Edmonton organizations.",
    features: ["Donation Processing", "Event Management", "Volunteer Sign-Up", "Impact Stories", "Newsletter Integration", "Grant Applications"],
    stats: [{ label: "Non-Profit Sites", value: "18+" }, { label: "Donations Processed", value: "$2M+" }, { label: "Volunteers Recruited", value: "5,000+" }],
  },
  {
    slug: "tech-startup",
    name: "Tech Startup",
    icon: "ri-rocket-line",
    tagline: "Launch-Ready Startup Websites",
    description: "Fast, modern websites for Edmonton tech startups with landing pages, product demos, and investor-ready presentations.",
    features: ["Product Landing Pages", "Demo & Onboarding", "Investor Portal", "API Documentation", "Blog & Updates", "Analytics Dashboard"],
    stats: [{ label: "Startup Sites", value: "42+" }, { label: "Funding Raised", value: "$15M+" }, { label: "User Sign-Ups", value: "100,000+" }],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    icon: "ri-settings-3-line",
    tagline: "Industrial Manufacturing Websites",
    description: "Professional manufacturing websites with product catalogs, RFQ systems, and distributor portals for Edmonton industrial companies.",
    features: ["Product Catalog", "RFQ System", "Distributor Portal", "Technical Specs", "Safety Documentation", "Career Pages"],
    stats: [{ label: "Manufacturing Sites", value: "15+" }, { label: "RFQs Generated/Month", value: "400+" }, { label: "Products Cataloged", value: "2,000+" }],
  },
  {
    slug: "plumbing-hvac",
    name: "Plumbing & HVAC",
    icon: "ri-drop-line",
    tagline: "Service-Focused Plumbing & HVAC Websites",
    description: "Generate emergency calls and scheduled appointments with service-focused websites for Edmonton plumbing and HVAC companies.",
    features: ["Emergency Service CTA", "Service Area Maps", "Online Booking", "Maintenance Plans", "Customer Reviews", "Seasonal Promotions"],
    stats: [{ label: "HVAC/Plumbing Sites", value: "22+" }, { label: "Service Calls/Month", value: "1,800+" }, { label: "Avg Response Time", value: "< 2hrs" }],
  },
  {
    slug: "dental",
    name: "Dental",
    icon: "ri-tooth-line",
    tagline: "Patient-Friendly Dental Websites",
    description: "Modern dental websites with online booking, treatment information, and patient education for Edmonton dental practices.",
    features: ["Online Appointment Booking", "Treatment Information", "Patient Education", "Insurance Verification", "Before/After Gallery", "Emergency Contact"],
    stats: [{ label: "Dental Sites", value: "30+" }, { label: "Appointments/Month", value: "2,200+" }, { label: "New Patients/Month", value: "150+" }],
  },
  {
    slug: "veterinary",
    name: "Veterinary",
    icon: "ri-stethoscope-line",
    tagline: "Caring Veterinary Clinic Websites",
    description: "Pet-friendly veterinary websites with appointment booking, pet portals, and emergency information for Edmonton animal clinics.",
    features: ["Pet Portal", "Appointment Booking", "Emergency Info", "Pet Health Resources", "Vaccination Reminders", "Online Pharmacy"],
    stats: [{ label: "Vet Clinic Sites", value: "18+" }, { label: "Pets Registered", value: "8,000+" }, { label: "Appointments/Month", value: "1,500+" }],
  },
  {
    slug: "landscaping",
    name: "Landscaping",
    icon: "ri-plant-line",
    tagline: "Beautiful Landscaping Company Websites",
    description: "Showcase your landscaping work with stunning before/after galleries, quote calculators, and seasonal service pages for Edmonton landscapers.",
    features: ["Project Gallery", "Quote Calculator", "Seasonal Services", "Before/After Photos", "Maintenance Plans", "Design Consultation Booking"],
    stats: [{ label: "Landscaping Sites", value: "20+" }, { label: "Quotes Generated/Month", value: "600+" }, { label: "Projects Showcased", value: "300+" }],
  },
  {
    slug: "wedding-events",
    name: "Wedding & Events",
    icon: "ri-cake-2-line",
    tagline: "Elegant Wedding & Event Websites",
    description: "Create magical event websites with galleries, booking systems, and vendor coordination for Edmonton wedding planners and event companies.",
    features: ["Event Gallery", "Booking Calendar", "Package Pricing", "Vendor Directory", "Client Testimonials", "RSVP Management"],
    stats: [{ label: "Event Sites", value: "25+" }, { label: "Events Booked/Year", value: "500+" }, { label: "Vendor Connections", value: "200+" }],
  },
];

// ============================================================
// SERVICES
// ============================================================
export const services: Service[] = [
  {
    slug: "web-development",
    name: "Web Development",
    icon: "ri-code-s-slash-line",
    tagline: "Custom Web Development in Edmonton",
    description: "We build fast, responsive, and SEO-optimized websites using modern technologies. From simple landing pages to complex web applications, our Edmonton team delivers pixel-perfect results.",
    features: ["Custom React/Next.js Development", "Responsive Mobile-First Design", "Performance Optimization", "SEO-Friendly Architecture", "CMS Integration", "API Development"],
    benefits: ["Faster load times than competitors", "Mobile-first approach for 60%+ mobile traffic", "Built for growth and scalability", "Clean, maintainable code"],
  },
  {
    slug: "ecommerce",
    name: "E-Commerce Development",
    icon: "ri-shopping-cart-line",
    tagline: "E-Commerce Solutions That Drive Sales",
    description: "Launch your online store with our custom e-commerce development. We build Shopify, WooCommerce, and custom solutions that convert visitors into customers.",
    features: ["Shopify & WooCommerce", "Custom Cart & Checkout", "Payment Gateway Integration", "Inventory Management", "Product Search & Filters", "Order Tracking"],
    benefits: ["Increase online sales by 40%+", "Reduce cart abandonment", "Seamless payment processing", "Automated inventory management"],
  },
  {
    slug: "seo-services",
    name: "SEO Services",
    icon: "ri-search-line",
    tagline: "Dominate Edmonton Search Results",
    description: "Get found by your ideal customers with our comprehensive SEO services. We specialize in local SEO for Edmonton businesses, helping you rank #1 for your target keywords.",
    features: ["Local SEO Optimization", "Technical SEO Audits", "Content Strategy", "Link Building", "Google Business Profile", "Monthly Reporting"],
    benefits: ["Rank #1 for local keywords", "3x more organic traffic", "Higher quality leads", "Long-term sustainable growth"],
  },
  {
    slug: "ui-ux-design",
    name: "UI/UX Design",
    icon: "ri-palette-line",
    tagline: "User-Centered Design That Converts",
    description: "Beautiful, intuitive designs that keep users engaged and drive conversions. Our UI/UX process ensures every pixel serves a purpose.",
    features: ["User Research & Personas", "Wireframing & Prototyping", "Visual Design Systems", "Usability Testing", "Interaction Design", "Design Handoff"],
    benefits: ["Increase user engagement 50%+", "Reduce bounce rates", "Improve conversion rates", "Consistent brand experience"],
  },
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    icon: "ri-megaphone-line",
    tagline: "Data-Driven Digital Marketing",
    description: "Grow your Edmonton business with targeted digital marketing campaigns. From Google Ads to social media, we drive qualified traffic and measurable ROI.",
    features: ["Google Ads Management", "Social Media Marketing", "Email Marketing", "Content Marketing", "Analytics & Reporting", "Conversion Optimization"],
    benefits: ["Measurable ROI on every dollar", "Targeted local audience reach", "Multi-channel presence", "Data-driven decisions"],
  },
  {
    slug: "website-maintenance",
    name: "Website Maintenance",
    icon: "ri-shield-check-line",
    tagline: "Keep Your Website Running Perfectly",
    description: "Don't let your website fall behind. Our maintenance plans include security updates, performance monitoring, content updates, and 24/7 support.",
    features: ["Security Updates & Patches", "Performance Monitoring", "Content Updates", "Backup & Recovery", "Uptime Monitoring", "Priority Support"],
    benefits: ["99.9% uptime guarantee", "Protection from security threats", "Always up-to-date content", "Peace of mind"],
  },
];

// ============================================================
// LOCATIONS
// ============================================================
export const locations: Location[] = [
  {
    slug: "edmonton",
    name: "Edmonton",
    region: "Alberta's Capital City",
    description: "As Edmonton's premier web development agency, we serve businesses across the capital region. From downtown startups to established enterprises in the south side, we build websites that drive growth for Edmonton businesses.",
    population: "1,010,899",
    keyIndustries: ["Oil & Gas", "Technology", "Healthcare", "Education", "Government"],
  },
  {
    slug: "st-albert",
    name: "St. Albert",
    region: "Edmonton Metropolitan Region",
    description: "Serving St. Albert's thriving business community with professional web development services. From Grandin to Campbell Business Park, we help St. Albert businesses establish a powerful online presence.",
    population: "71,384",
    keyIndustries: ["Retail", "Healthcare", "Professional Services", "Education", "Hospitality"],
  },
  {
    slug: "sherwood-park",
    name: "Sherwood Park",
    region: "Strathcona County",
    description: "Professional web development for Sherwood Park businesses. We help companies in Strathcona County compete online with modern, high-performing websites that attract local customers.",
    population: "82,000",
    keyIndustries: ["Oil & Gas", "Manufacturing", "Retail", "Healthcare", "Construction"],
  },
  {
    slug: "spruce-grove",
    name: "Spruce Grove",
    region: "Parkland County",
    description: "Custom web solutions for Spruce Grove's growing business community. We build websites that help local businesses reach customers across Parkland County and beyond.",
    population: "38,000",
    keyIndustries: ["Agriculture", "Retail", "Construction", "Services", "Manufacturing"],
  },
  {
    slug: "leduc",
    name: "Leduc",
    region: "Leduc County",
    description: "Web development services for Leduc businesses near Edmonton International Airport. We help companies in the Leduc-Nisku area establish strong digital presences.",
    population: "34,000",
    keyIndustries: ["Aviation", "Logistics", "Oil & Gas", "Retail", "Agriculture"],
  },
  {
    slug: "fort-saskatchewan",
    name: "Fort Saskatchewan",
    region: "Edmonton Metropolitan Region",
    description: "Serving Fort Saskatchewan's industrial and commercial businesses with professional web development. From petrochemical companies to local retailers, we build websites that work.",
    population: "28,000",
    keyIndustries: ["Petrochemical", "Manufacturing", "Retail", "Services", "Construction"],
  },
];

// ============================================================
// TESTIMONIALS
// ============================================================
export const testimonials = [
  { text: "Nolimit Designs transformed our online presence completely. Our new website generates 3x more leads than before.", author: "Dr. Sarah Mitchell", role: "Owner, Edmonton Family Clinic", industry: "Healthcare" },
  { text: "The team understood our real estate market perfectly. Our IDX integration works flawlessly and agents love the new site.", author: "James Rodriguez", role: "Broker, Peak Realty Edmonton", industry: "Real Estate" },
  { text: "Our restaurant bookings increased by 45% within the first month of launching our new website.", author: "Chef Michael Tran", role: "Owner, Saigon Kitchen", industry: "Restaurant" },
  { text: "Professional, fast, and they truly understand what Edmonton businesses need to succeed online.", author: "Lisa Chen", role: "CEO, TechNorth Solutions", industry: "Tech Startup" },
  { text: "Best investment we made for our construction company. The portfolio showcase brings in quality leads every week.", author: "Mark Thompson", role: "President, Thompson Builders", industry: "Construction" },
];

// ============================================================
// FAQ DATA
// ============================================================
export const faqData = [
  { q: "How much does a website cost in Edmonton?", a: "Our websites start at $2,500 for a basic business site and go up to $15,000+ for complex e-commerce or custom web applications. We provide detailed quotes based on your specific needs and always offer flexible payment plans." },
  { q: "How long does it take to build a website?", a: "A typical business website takes 2-4 weeks from start to launch. E-commerce sites take 4-6 weeks, and complex web applications can take 6-12 weeks. We always provide a detailed timeline before starting." },
  { q: "Do you offer website maintenance?", a: "Yes! We offer monthly maintenance plans starting at $99/month that include security updates, content changes, performance monitoring, and priority support." },
  { q: "Will my website be mobile-friendly?", a: "Absolutely. Every website we build is fully responsive and mobile-first. With over 60% of web traffic coming from mobile devices, this is non-negotiable for us." },
  { q: "Do you help with SEO?", a: "Yes, every website we build includes on-page SEO optimization. We also offer comprehensive SEO services including local SEO, content strategy, and link building to help you rank higher in Edmonton search results." },
  { q: "Can I update the website myself?", a: "Yes! We build websites with user-friendly content management systems (CMS) so you can easily update text, images, and blog posts. We also provide training and documentation." },
  { q: "Do you work with businesses outside Edmonton?", a: "While we're based in Edmonton and specialize in local businesses, we work with clients across Alberta and Canada. Our process works great for remote collaboration." },
  { q: "What technologies do you use?", a: "We use modern technologies including React, Next.js, TypeScript, Tailwind CSS, and various CMS platforms. We choose the best tech stack based on your specific project requirements." },
];

// ============================================================
// PROCESS STEPS
// ============================================================
export const processSteps = [
  { num: "01", title: "Discovery & Strategy", desc: "We learn about your business, goals, target audience, and competitors to create a winning strategy.", icon: "ri-lightbulb-line" },
  { num: "02", title: "Design & Prototype", desc: "Our designers create stunning mockups and interactive prototypes for your approval before development.", icon: "ri-palette-line" },
  { num: "03", title: "Development & Testing", desc: "We build your website using modern technologies, with rigorous testing across all devices and browsers.", icon: "ri-code-s-slash-line" },
  { num: "04", title: "Launch & Support", desc: "We deploy your site, provide training, and offer ongoing support to ensure continued success.", icon: "ri-rocket-line" },
];

// ============================================================
// BLOG POSTS (Web Dev focused)
// ============================================================
export const blogPosts = [
  { slug: "best-web-design-company-edmonton", title: "How to Choose the Best Web Design Company in Edmonton", excerpt: "A comprehensive guide to selecting the right web development partner for your Edmonton business.", category: "Guide" },
  { slug: "how-much-website-cost-edmonton", title: "How Much Does a Website Cost in Edmonton in 2026?", excerpt: "Breakdown of website development costs for Edmonton businesses, from basic sites to complex applications.", category: "Pricing" },
  { slug: "edmonton-small-business-website-tips", title: "10 Must-Have Features for Edmonton Small Business Websites", excerpt: "Essential features every Edmonton small business website needs to compete and convert visitors.", category: "Tips" },
  { slug: "local-seo-edmonton-guide", title: "The Complete Local SEO Guide for Edmonton Businesses", excerpt: "Step-by-step guide to dominating local search results in Edmonton and surrounding areas.", category: "SEO" },
  { slug: "ecommerce-trends-alberta-2026", title: "E-Commerce Trends Alberta Businesses Need to Know in 2026", excerpt: "Stay ahead of the curve with the latest e-commerce trends shaping Alberta's online retail landscape.", category: "E-Commerce" },
  { slug: "website-speed-optimization", title: "Why Website Speed Matters for Edmonton Businesses", excerpt: "How page load speed affects your search rankings, conversions, and customer experience.", category: "Performance" },
  { slug: "responsive-design-mobile-first", title: "Mobile-First Design: Why Your Edmonton Business Needs It", excerpt: "With 65% of traffic from mobile, here's why mobile-first design is essential for local businesses.", category: "Design" },
  { slug: "wordpress-vs-custom-development", title: "WordPress vs Custom Development: Which is Right for You?", excerpt: "Comparing WordPress and custom web development to help Edmonton businesses make the right choice.", category: "Guide" },
  { slug: "healthcare-website-best-practices", title: "Healthcare Website Best Practices for Edmonton Clinics", excerpt: "Essential features and compliance requirements for healthcare websites in Alberta.", category: "Industry" },
  { slug: "real-estate-website-features", title: "Must-Have Features for Edmonton Real Estate Websites", excerpt: "IDX integration, property search, and lead capture features that top-performing real estate sites use.", category: "Industry" },
];