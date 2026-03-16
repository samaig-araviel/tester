# Home Page (Dashboard) Implementation Plan

## Summary
Rebuild the dashboard page into a full, premium home page with 8 sections: Global Header, Hero Banner, Recommended for You, New & Featured, Favourites, Explore Online Services, Explore In-Person Services, and Global Footer.

## Approach
- **Data**: Mock data for vendors/offers/saved (no DB tables yet). Structured so it can be swapped for Supabase queries later.
- **Images**: Source free placeholder illustrations/photos from Unsplash/undraw for hero, vendor cards, and explore sections.
- **Header**: Full rebuild of Navbar with centre nav, Explore dropdown, heart icon, profile dropdown (with logout).
- **Components**: Build reusable carousel, offer card, favourite tile, and section components.

---

## Step-by-Step Implementation

### Step 1: Add new design tokens to globals.css
- Add missing color tokens from spec: `--warm-teal: #117A65`, `--soft-navy: #0A2342`, `--charcoal: #1C1C1C`, `--muted-grey: #6F6F6F`, `--warm-sand: #F7F4EF`
- Add Inter font import (spec says Inter but existing uses Plus Jakarta Sans + DM Sans — will keep existing fonts for consistency since they're premium)
- Add carousel and hover animation utilities

### Step 2: Create mock data layer
**New file: `src/data/mock-vendors.ts`**
- Mock vendors array (12-15 items) with: id, name, logo_url, banner_url, category, delivery_type, offer_headline, created_at, featured, service_radius_km, location_name, age_relevance, support_categories
- Mock saved_offers array
- Helper functions: getRecommendedOffers(userData), getNewFeatured(), getSavedVendors(userId)
- Personalisation ranking logic using onboarding data (support_needs match, life stage, child age)

### Step 3: Rebuild Global Header (Navbar.tsx)
**Modify: `src/components/Navbar.tsx`**
- Height: 72px
- Left: Parentfits logo (Leaf icon + text, links to /dashboard)
- Centre: Navigation links — "Explore Services" (with hover dropdown: Shop online, Shop in-person), "Parents Hub", "Resources"
- Right: Heart icon (links to saved perks), Profile avatar (36x36) with dropdown containing user info + Log Out
- Border-bottom appears only on scroll (scroll listener)
- Keep existing UserMenu logic but restyle the avatar and dropdown

### Step 4: Build reusable components

**New: `src/components/home/Carousel.tsx`**
- Horizontal scroll container with overflow hidden
- Left/right chevron buttons (bottom-left positioned)
- Progress indicator bar (thin horizontal, active segment in Warm Teal)
- Props: children, itemWidth, gap
- Handles scroll state for chevron enable/disable

**New: `src/components/home/OfferCard.tsx`**
- Vendor image (160px height, object-fit cover, 16px top radius)
- Save heart icon (top-right overlay, 32x32, toggleable)
- Vendor logo (48x48, centred white badge)
- Vendor name (14px Medium)
- Offer headline (14px Semibold, Warm Teal)
- Optional "New" pill tag (top-left)
- Width ~264px, 16px border radius, 1px border
- Hover: scale 1.02, soft shadow, 150ms ease
- Click: navigates to vendor detail (placeholder route)

**New: `src/components/home/FavouriteTile.tsx`**
- Square logo container (~140x100px, 12px radius, border)
- Vendor logo centred, vendor name below (13px, truncate)
- Hover: border colour to Warm Teal
- "See all" variant with ellipsis icon

**New: `src/components/home/SectionHeader.tsx`**
- Reusable H2 title + helper text + optional right-aligned CTA
- Consistent spacing and typography

**New: `src/components/home/HeroBanner.tsx`**
- Two-column layout within full content width
- Left: Greeting (H1 32px), subheading (18px)
- Right: Illustrated placeholder (CSS gradient + SVG illustration or sourced image)
- Background: soft gradient wash (peach/sand/blue tones)
- First visit vs returning logic (based on last_login)

**New: `src/components/home/ExploreBlock.tsx`**
- Reusable two-column promotional block
- Props: direction (image-left or image-right), pill text, heading, body, CTA text, CTA link, image
- Container: white, 16px radius, 1px border, 48-64px padding
- CTA: pill-shaped button, Soft Navy fill, white text

**New: `src/components/Footer.tsx`**
- 3 rows: logo, links, copyright
- Background: #F7F4EF (Warm Sand)
- Links: FAQs, About, How it works, Data protection, Safeguarding
- Copyright: © {year} Parentfits. All rights reserved.

### Step 5: Build the home page sections

**Rewrite: `src/app/dashboard/page.tsx`**
- Server component that fetches user data from Supabase
- Passes user data to client components
- Page structure (top to bottom):
  1. `<GlobalHeader />` (Navbar — already sticky, rendered in layout or page)
  2. `<HeroBanner firstName={} isReturning={} />`
  3. `<RecommendedSection offers={} onboardingCompleted={} />`
  4. `<NewFeaturedSection offers={} />`
  5. `<FavouritesSection savedVendors={} />`
  6. `<ExploreBlock />` (Online)
  7. `<ExploreBlock />` (In-Person, reversed)
  8. `<Footer />`

- Max width 1200px, content column 1040-1120px centred
- 48px vertical spacing between sections
- White page background

### Step 6: Empty states and edge cases
- Recommended: empty state card if onboarding_completed = false ("Tell us what you need" + CTA to onboarding)
- Favourites: empty state text + ghost tiles if no saves
- New & Featured: "No new offers this week" fallback
- Low content states with subtle inline prompts

### Step 7: Save/unsave interaction (client-side)
- Heart toggle with optimistic UI update
- Toast notification: "Saved to favourites" with "Undo" action
- Simple toast component or inline notification

### Step 8: Source and add placeholder images
- Hero illustration: warm parent+baby illustration (Unsplash or CSS-generated)
- Vendor card images: generic lifestyle/product images
- Explore sections: parent browsing laptop (online), parent at shop (in-person)
- All images in `public/images/` directory

---

## Files Changed
| File | Action |
|------|--------|
| `src/app/globals.css` | Modify — add tokens |
| `src/data/mock-vendors.ts` | New — mock data |
| `src/components/Navbar.tsx` | Rewrite — full header |
| `src/components/Footer.tsx` | New |
| `src/components/home/Carousel.tsx` | New |
| `src/components/home/OfferCard.tsx` | New |
| `src/components/home/FavouriteTile.tsx` | New |
| `src/components/home/SectionHeader.tsx` | New |
| `src/components/home/HeroBanner.tsx` | New |
| `src/components/home/ExploreBlock.tsx` | New |
| `src/components/home/RecommendedSection.tsx` | New |
| `src/components/home/NewFeaturedSection.tsx` | New |
| `src/components/home/FavouritesSection.tsx` | New |
| `src/components/home/Toast.tsx` | New |
| `src/app/dashboard/page.tsx` | Rewrite |

## Design Decisions
1. **Keep existing fonts** (Plus Jakarta Sans + DM Sans) rather than switching to Inter — they're premium and already established across the app
2. **Mock data layer** — structured as typed arrays with helper functions, easy to swap for Supabase queries
3. **Client/server split** — page.tsx is server component (fetches user), sections are client components (interactivity)
4. **Reusable Carousel** — one component used by both Recommended and New & Featured
5. **Reusable ExploreBlock** — one component with direction prop for both Online and In-Person
