## 1. Foundation & Design System

- [x] 1.1 Install and configure dependencies: `framer-motion`, `next-mdx-remote`, `resend`, `reading-time`
- [x] 1.2 Update `tailwind.config.ts` with full design token set (color palette, typography scale, spacing, radius, dark-mode class strategy)
- [x] 1.3 Configure `next/font` in `app/layout.tsx` for the primary sans-serif font and apply CSS variable to `<html>`
- [x] 1.4 Create `lib/motionVariants.ts` exporting `fadeUp`, `fadeIn`, `slideInLeft`, `staggerContainer`, and `staggerItem` variant presets
- [x] 1.5 Create `components/ui/FloatingLabelInput.tsx` with `label`, `name`, `type`, `value`, `onChange`, and `error` props using Tailwind `peer` classes for float animation
- [x] 1.6 Apply `dark` class globally to `<html>` in `app/layout.tsx` and remove any existing light-mode logic

## 2. SEO & Metadata Layer

- [x] 2.1 Create `components/JsonLd.tsx` server component that renders a `<script type="application/ld+json">` tag from a `data` prop
- [x] 2.2 Inject Person JSON-LD in `app/layout.tsx` via `JsonLd` component with `name`, `url`, `jobTitle`, `sameAs`, and `knowsAbout` fields
- [x] 2.3 Define root `metadata` export in `app/layout.tsx` with site-wide `title` template, `description`, `openGraph`, `twitter`, and `alternates.canonical`
- [x] 2.4 Create `app/robots.ts` exporting a `robots` function that allows all public routes, disallows `/api/` and `/admin/`, and sets the `sitemap` URL
- [x] 2.5 Create `app/sitemap.ts` that reads `/content/blog/` at build time and returns entries for all static routes plus all published blog slugs

## 3. App Router Structure

- [x] 3.1 Set up route group `(portfolio)` with `app/(portfolio)/page.tsx` as the root portfolio page
- [x] 3.2 Set up route group `(blog)` with `app/(blog)/layout.tsx`, `app/(blog)/blog/page.tsx`, and `app/(blog)/blog/[slug]/page.tsx`
- [x] 3.3 Set up `app/(photography)/photography/page.tsx` route
- [x] 3.4 Set up `app/(consulting)/consulting/page.tsx` route placeholder
- [x] 3.5 Create `/content/blog/` directory and add one sample MDX post with full frontmatter (`title`, `date`, `description`, `tags`, `published`)
- [x] 3.6 Create `lib/blog.ts` with `getAllPosts()` and `getPostBySlug(slug)` helper functions that read MDX frontmatter and compute reading time

## 4. Hero — Solutions Architect

- [x] 4.1 Create `components/sections/HeroSolutionsArchitect.tsx` as a `<motion.section>` with `aria-label="Solutions Architect"`
- [x] 4.2 Add name ("Anil Unni") and tagline typography with `fadeUp` animation on mount
- [x] 4.3 Build abstract SVG system-architecture geometry (node-edge graph) with idle loop animation using Framer Motion keyframes
- [x] 4.4 Add project callout cards component (`components/ui/ProjectCallout.tsx`) for UAE-Mumbai server recovery and SOP implementation entries
- [x] 4.5 Implement staggered entrance animation (120ms delay) for callout cards using `staggerContainer` and `staggerItem` variants

## 5. ERP Systems Grid

- [x] 5.1 Create `components/sections/ERPSystemsGrid.tsx` as a `<section>` with `aria-label="Systems & ERP Engineering"`
- [x] 5.2 Define grid data in `lib/data.ts` — minimum 6 ERP domain tiles (title, icon name, descriptor, optional metric)
- [x] 5.3 Build CSS Grid layout with asymmetric tile areas using Tailwind `grid-cols` and `col-span` — responsive collapse to single column on `sm`
- [x] 5.4 Create `components/ui/ERPTile.tsx` with icon, title, descriptor, and hover overlay using Framer Motion `AnimatePresence`
- [x] 5.5 Wire `whileInView` scroll-reveal animation with 80ms stagger per tile

## 6. Photography & Audio Gallery

- [x] 6.1 Create `components/sections/PhotographyAudioGallery.tsx` as a `<section>` with `aria-label="Photography"`
- [x] 6.2 Configure Cloudinary as a `next/image` remote pattern in `next.config.mjs`
- [x] 6.3 Build asymmetric masonry layout using CSS Grid with at least one full-bleed image group (100vw span) outside the content column
- [x] 6.4 Create `components/ui/AudioPlayer.tsx` accepting a `tracks` array prop (`{ title, src, duration }[]`) using HTML5 `<audio>` ref
- [x] 6.5 Implement play/pause toggle, progress bar (real-time update via `timeupdate` event), seek by click on progress bar, and volume slider in `AudioPlayer`
- [x] 6.6 Ensure audio player mounts in paused state with no autoplay

## 7. Enthusiast Bento Module

- [x] 7.1 Create `components/sections/EnthusiastBento.tsx` as a `<section>` with `aria-label="Enthusiast Pursuits"`
- [x] 7.2 Define hobby module data in `lib/data.ts` — minimum 3 entries (automotive detailing, hardware modding, third pursuit)
- [x] 7.3 Build compact bento grid capped at 600px height on desktop using Tailwind `grid` with fixed `max-h`
- [x] 7.4 Implement `whileInView` stagger animation (100ms delay per module) using shared motion variants

## 8. Technical Blog

- [x] 8.1 Build `app/(blog)/blog/page.tsx` — list all published posts in reverse-chronological order with title, date, tags, reading time, and excerpt
- [x] 8.2 Build `app/(blog)/blog/[slug]/page.tsx` — render MDX content inside `<article>` with `aria-label` set to post title
- [x] 8.3 Create `components/blog/TableOfContents.tsx` — extract `h2`/`h3` headings from MDX, render as `<nav aria-label="Table of contents">`, sticky on desktop (`lg:sticky`)
- [x] 8.4 Implement active heading highlight in ToC using `IntersectionObserver` to track which heading is in the viewport
- [x] 8.5 Add author metadata block (name, date, reading time) above the MDX body
- [x] 8.6 Inject Article JSON-LD in `generateMetadata` of `/blog/[slug]/page.tsx` using the `JsonLd` server component
- [x] 8.7 Add `generateMetadata` to `/blog/[slug]/page.tsx` for per-post OG title, description, image, and canonical URL

## 9. Contact Form

- [x] 9.1 Create `components/sections/ContactForm.tsx` as a `<section>` with `aria-label="Contact"` containing a `<form>` using `FloatingLabelInput` for Name, Email, Subject, and Message
- [x] 9.2 Implement client-side validation: Name (non-empty), Email (RFC 5322 regex), Subject (non-empty), Message (min 10 chars) with inline error display
- [x] 9.3 Disable the submit button when any field is invalid
- [x] 9.4 Create `app/api/contact/route.ts` — POST handler that validates payload and sends email via Resend SDK
- [x] 9.5 Handle success response: display confirmation message, reset form fields
- [x] 9.6 Handle error response: display error below submit button while preserving all field values

## 10. Root Page Assembly & Navigation

- [x] 10.1 Assemble all six dimension sections in `app/(portfolio)/page.tsx` in order: Hero → ERP Grid → Photography & Audio → Enthusiast Bento → Technical Blog preview → Contact
- [x] 10.2 Build `components/sections/Header.tsx` with semantic `<nav aria-label="Primary navigation">` linking to each section via anchor IDs
- [x] 10.3 Build `components/sections/Footer.tsx` with social links (sameAs URLs) and copyright
- [x] 10.4 Verify all section `<section>` and landmark elements have unique, descriptive `aria-label` attributes
- [x] 10.5 Test sitemap output at `/sitemap.xml` and robots at `/robots.txt` — confirm all routes present
- [ ] 10.6 Validate Person and Article JSON-LD using Google Rich Results Test schema (manual — requires deployed URL)
