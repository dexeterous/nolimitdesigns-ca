# Nolimit360 Design Management Platform - Enhancement Plan

## Design Guidelines
- **Primary**: #ff4f01 (Orange), **Dark**: #0a0a0a, #101010
- **Background**: #f5f5f5 (dashboard), #fff6ec (marketing)
- **Border**: #e5e5e5, **Text Secondary**: rgb(119,119,125)
- **Font**: Bricolage Grotesque (headings), system sans-serif (body)
- **Style**: Clean, modern SaaS dashboard matching Kimp360

## Files to Create/Modify

### New Pages (6 files)
1. `src/pages/ClientBrands.tsx` - Brand management with CRUD, logo upload, color palette, guidelines
2. `src/pages/ClientRequestDetail.tsx` - Request detail with status timeline, comments, file attachments
3. `src/pages/ClientFiles.tsx` - File management library with search, filter, download
4. `src/pages/ClientTeam.tsx` - Team members management with invite, roles
5. `src/pages/AdminBrands.tsx` - Admin view of all brands across users
6. `src/pages/NotFound.tsx` - 404 page

### Modified Files (5 files)
7. `src/App.tsx` - Add new routes
8. `src/components/DashboardLayout.tsx` - Add new nav items (Brands, Files, Team), notifications bell
9. `src/pages/ClientSubmitRequest.tsx` - Add AI assistance, brand selector, file upload
10. `src/pages/AdminDashboard.tsx` - Add analytics charts, activity feed
11. `src/pages/ClientDashboard.tsx` - Add quick stats, brand count, recent activity

## Implementation Order
1. Update App.tsx with new routes
2. Update DashboardLayout with new nav items + notifications
3. Create ClientBrands.tsx
4. Create ClientRequestDetail.tsx
5. Create ClientFiles.tsx
6. Create ClientTeam.tsx
7. Enhance ClientSubmitRequest.tsx with AI + brand selector
8. Enhance AdminDashboard.tsx with charts