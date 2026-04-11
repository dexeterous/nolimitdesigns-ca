# NoLimit Designs Homepage - Development Plan

## Design Guidelines

### Design References
- **Kimp.io**: Colorful hero with gradient, trust badges, pricing cards, FAQ accordion
- **Existing Designpro template**: Reuse typography, colors, spacing, button styles, card styles

### Color Palette
- Primary: #ff4f01 (Orange - CTAs and highlights)
- Background: #fff6ec (Warm cream)
- Dark: #070707 (Near black - dark sections)
- Black-100: #101010 (Text)
- Black-300: #1f1f1f (Dark cards)
- Secondary: #000000 (Black)
- White: #ffffff
- Gray: rgb(119,119,125) (Muted text)
- Green accent: #22c55e (for trust/rating badges)

### Typography
- Headings: Bricolage Grotesque (variable weight 200-800)
- Body: Manrope (variable weight 200-800)
- Hero H1: 80px / 90px line-height (xl), 50px (md), 40px (sm)
- Section H2: 80px (xl), 50px (md), 40px (sm)
- Body: 16px base, 20px large

### Key Component Styles
- Buttons: rounded-full, px-8 py-4, box-shadow 0 4px 0 0 rgba(0,0,0,0.25)
- Cards: rounded-[15px], border border-[#bebebe], hover:border-primary
- Pricing cards: border border-primary, rounded-xl, p-2.5
- FAQ accordion: border border-[#ccc], rounded-[10px]
- Container: max-w-7xl mx-auto px-4

### Images to Generate
1. **hero-dashboard-design-workflow.jpg** - Modern design dashboard showing multiple design projects, creative workflow interface with colorful thumbnails (Style: 3d, vibrant)
2. **mascot-creative-character.png** - Friendly 3D cartoon mascot character holding design tools, orange/warm colors (Style: 3d, vibrant)
3. **design-services-collage.jpg** - Colorful collage of graphic design work including social media posts, logos, brand guides (Style: photorealistic)
4. **blog-design-trends.jpg** - Modern workspace with design tools and creative materials (Style: photorealistic)

---

## Development Tasks

### Files to Create/Modify (max 8 files)

1. **src/index.css** - Migrate existing CSS system (colors, utilities, animations, fonts)
2. **src/pages/Index.tsx** - Full homepage with all 12 sections
3. **src/components/SiteHeader.tsx** - Navigation header with NoLimit Designs branding
4. **src/components/SiteFooter.tsx** - Multi-column footer
5. **index.html** - Update title, add font links, remixicon
6. **src/App.tsx** - Update routes (single page app, homepage only)

### Section Order (in Index.tsx)
1. Hero (gradient, headline, CTAs, mascot)
2. Trusted by Businesses (logo strip)
3. Benefits Grid (6 cards)
4. Pricing (3 plans)
5. How Subscription Works (3 steps + stats)
6. Design Services Grid
7. Creative Management Features (6 cards)
8. Global Trust (dark section, 5000+ stat)
9. Testimonials
10. Blog Preview
11. FAQ Accordion
12. Final CTA