---
last_updated: 2026-05-15T03:01:30Z
---

# Architecture Design

## System Overview
Nolimit Designs - A multi-page web development agency website with dynamic routing for 20 industries, 6 services, and 6 locations. Uses React + React Router with data-driven pages to maximize SEO coverage while minimizing file count.

## Tech Stack
React 18, TypeScript, Vite, Tailwind CSS, React Router DOM, Shadcn/UI components

## Module Design
| Module | Responsibility | Key Files |
|--------|---------------|-----------|
| Data Layer | All site content (industries, services, locations, FAQ, testimonials) | src/data/siteData.ts |
| Homepage | Agency landing page with all sections | src/pages/Index.tsx |
| Industry Portfolio | Dynamic pages for 20 industries | src/pages/IndustryPortfolio.tsx |
| Service Pages | Dynamic pages for 6 services | src/pages/ServicePage.tsx |
| Location Pages | Dynamic pages for 6 locations | src/pages/LocationPage.tsx |
| Contact/Lead Gen | Multi-channel lead generation | src/pages/Contact.tsx |
| About | Company info, process, tech stack | src/pages/About.tsx |
| Demo Sites | 3 static HTML mini-websites | public/demos/*.html |

## Tech Decisions
| Decision | Choice | Rationale |
|----------|--------|-----------|
| Dynamic Routing | React Router :slug params | One component serves 20+ pages |
| Data Architecture | Single siteData.ts file | Centralized content management |
| Demo Websites | Static HTML in public/ | Can be hosted independently |
| Styling | Tailwind + custom CSS classes | Consistent with existing brand |

## File Tree Plan
```
src/
├── data/siteData.ts (industries, services, locations data)
├── pages/
│   ├── Index.tsx (homepage - transformed)
│   ├── IndustryPortfolio.tsx (dynamic /portfolio/:slug)
│   ├── ServicePage.tsx (dynamic /services/:slug)
│   ├── LocationPage.tsx (dynamic /web-design/:slug)
│   ├── Contact.tsx (lead generation)
│   └── About.tsx (about, process, tech)
├── components/
│   ├── SiteHeader.tsx (updated navigation)
│   └── SiteFooter.tsx (updated links)
public/demos/
├── healthcare.html
├── realestate.html
└── restaurant.html
```

## Implementation Guide
- Routes: /portfolio/:slug (20 industries), /services/:slug (6 services), /web-design/:slug (6 locations)
- Total SEO pages: 1 home + 20 industries + 6 services + 6 locations + 1 contact + 1 about = 35 unique pages
- Demo sites accessible at /demos/healthcare.html, /demos/realestate.html, /demos/restaurant.html

