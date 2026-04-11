# Nolimit360 Design Management Platform - Development Plan

## Design Guidelines
- **Reuse existing Nolimit UI design system** (colors, typography, buttons, cards, badges)
- Primary: #ff4f01 (Orange)
- Secondary: #070707 (Black)
- Background: #fff6ec (Warm cream)
- Text: #101010
- Muted: rgb(119,119,125)
- Border: #bebebe
- Typography: Bricolage Grotesque (headings), Manrope (body)
- Buttons: .btn .btn-primary, .btn-dark, .btn-outline
- Dashboard style: Modern SaaS (Linear/ClickUp inspired), dark sidebar

## Files to Create/Modify (8 file limit)

1. **src/pages/Register.tsx** - Registration page with name, email, company, password, plan selection
2. **src/pages/Login.tsx** - Login page with email/password
3. **src/components/DashboardLayout.tsx** - Reusable sidebar layout for both client and admin dashboards
4. **src/pages/ClientDashboard.tsx** - Client dashboard with stat cards, recent requests, activity feed
5. **src/pages/ClientRequests.tsx** - Requests page with list view table + kanban view toggle
6. **src/pages/ClientSubmitRequest.tsx** - Submit request form
7. **src/pages/AdminDashboard.tsx** - Admin dashboard with metrics and charts
8. **src/pages/AdminRequests.tsx** - Admin request management table

## Files to Modify
- **src/App.tsx** - Add all new routes
- **src/pages/Index.tsx** - Update CTA buttons to link to /register
- **src/pages/Pricing.tsx** - Update CTA buttons to link to /register
- **src/pages/GraphicDesignServices.tsx** - Update CTA buttons to link to /register
- **src/pages/VideoDesignServices.tsx** - Update CTA buttons to link to /register
- **src/components/SiteHeader.tsx** - Update "Start Your Subscription" to link to /register

## Link Flow
- "Start Free Trial" / "Start Your Subscription" → /register
- After registration → /client/dashboard (Nolimit360 platform)
- Admin access → /admin/dashboard