## Context

Anil Unni's current portfolio is a single-page Next.js app with basic sections and no coherent design system. It lacks semantic HTML depth, structured data, dynamic SEO infrastructure, and the architectural clarity needed to represent a multidisciplinary professional identity. The redesign creates an "Editorial Grid / Modern Bento Box" site — a bespoke digital magazine that spans Solutions Consulting, ERP Engineering, Photography/Audio, hobby pursuits, and technical writing.

The stack is Next.js 14+ (App Router), Tailwind CSS v3, and Framer Motion v11. Deployment target is Vercel. No CMS is assumed for the initial build; blog content will be sourced from local MDX files in `/content/blog/`.

## Goals / Non-Goals

**Goals:**
- Establish a global design system (dark theme, typography scale, motion tokens) via Tailwind config and CSS custom properties
- Implement semantically rich, accessible HTML using `<article>`, `<section>`, `<aside>`, `<nav>` with `aria-label` on every landmark
- Deliver JSON-LD structured data (Person, Article, BreadcrumbList schemas) injected via Next.js layout and page-level metadata
- Produce a programmatic `sitemap.ts` and `robots.ts` at the App Router level
- Build six distinct site dimensions as isolated component domains: Hero, ERP Grid, Gallery+Audio, Enthusiast, Blog, Contact
- Ship a custom cinematic audio player for Bansuri flute (no external audio-player library dependency)
- Ship the technical blog with MDX, estimated reading time, and sticky ToC

**Non-Goals:**
- CMS integration (Contentful, Sanity, etc.) — MDX files are the source of truth for v1
- User authentication or any backend beyond Next.js API routes for the contact form
- E-commerce or client portal features
- Mobile-first breakpoints beyond Tailwind's standard `sm/md/lg/xl` scale
- Accessibility WCAG AA audit (structural semantics only in this pass)

## Decisions

### D1: App Router with Route Groups

Use Next.js App Router with route groups for organizational clarity:
- `(portfolio)` — root page with all six dimensions stacked
- `(blog)` — `/blog` index and `/blog/[slug]` dynamic routes
- `(photography)` — `/photography` gallery full-page view

**Rationale**: Route groups allow shared layouts per dimension without polluting the URL. The blog and photography sections need their own `layout.tsx` (different nav, no bento constraints). Alternative (Pages Router) rejected because Metadata API requires App Router.

### D2: MDX for Blog Content

Blog posts are MDX files in `/content/blog/<slug>/index.mdx` with frontmatter (title, date, tags, description, readingTime auto-computed).

**Rationale**: Zero CMS dependency for v1. `next-mdx-remote` or native `@next/mdx` can compile at build time. Reading time is computed from word count at build time, not client-side. Alternative (database-backed blog) deferred to v2.

### D3: Design System via Tailwind Config + CSS Custom Properties

All design tokens (colors, spacing, type scale, motion durations) live in `tailwind.config.ts`. Dark mode is `class`-based (defaulting to `dark` on `<html>`). No runtime theming — the site is dark-only for v1.

**Rationale**: Single source of truth. Component libraries (shadcn/ui primitives) can extend this config. Alternative (CSS-in-JS, styled-components) rejected — Tailwind is already in the stack and avoids runtime style overhead.

### D4: Framer Motion for Section Animations

Each dimension section uses `motion.section` with viewport-triggered `whileInView` animations. A shared `motionVariants.ts` exports named variant presets (fadeUp, slideIn, staggerChildren).

**Rationale**: Consistency across sections without duplicating animation configs. Framer Motion's `LazyMotion` with `domAnimation` feature set reduces bundle size. Alternative (CSS keyframes) lacks the scroll-triggered orchestration needed for the bento reveal patterns.

### D5: Custom Audio Player (Web Audio API + React State)

The Bansuri audio player is a self-contained React component using the HTML5 `<audio>` element with a custom UI. No Howler.js or external player library.

**Rationale**: Eliminates an extra dependency for a single-use feature. `useRef` on `<audio>` gives full control over play/pause, seek, and volume. Alternative (Howler.js) adds 24KB for no additional benefit in this use case.

### D6: JSON-LD Injection Pattern

Person schema JSON-LD is injected in `app/layout.tsx` via a `<script type="application/ld+json">` tag rendered by a `JsonLd` server component. Article schema is injected per blog post in `/app/(blog)/blog/[slug]/page.tsx`.

**Rationale**: Server component `JsonLd` avoids hydration overhead. `generateMetadata` at the page level handles dynamic OG/Twitter metadata. Alternative (next-seo library) rejected — the Next.js Metadata API covers all needed cases natively.

### D7: Sitemap Merges Static + Dynamic Routes

`app/sitemap.ts` exports an async function that returns static route entries plus dynamic blog slugs fetched from the filesystem (reading MDX frontmatter).

**Rationale**: No external sitemap library needed; Next.js App Router has native sitemap support. Blog slugs are derived from `fs.readdirSync('/content/blog')` at build time.

## Risks / Trade-offs

- **MDX build time at scale** → As blog grows beyond ~200 posts, build times will increase. Mitigation: use ISR (`revalidate`) on blog routes so only changed posts rebuild.
- **Audio autoplay restrictions** → Browsers block audio autoplay without user gesture. Mitigation: audio player starts paused; play only on explicit button press, no autoplay on page load.
- **Bento grid complexity on mobile** → The Editorial Grid is inherently desktop-centric. Mitigation: stacked single-column layout on `sm`, two-column on `md`, full grid on `lg+`. Grid areas collapse gracefully.
- **Framer Motion bundle size** → Full Framer Motion is ~60KB gzipped. Mitigation: use `LazyMotion` with `domAnimation` feature bundle (~18KB) for all animation-only components; defer `domMax` (drag, layout) to pages that need it.
- **JSON-LD schema correctness** → Invalid structured data is silently ignored by search engines. Mitigation: validate against Google Rich Results Test before launch.

## Open Questions

- Should the contact form submit to a Next.js API route (serverless function) or a third-party service (Resend, Formspree)? → Default to Next.js API route + Resend for v1.
- Should photography images be self-hosted in `/public/photography/` or pulled from a CDN (Cloudinary)? → Default to Cloudinary with next/image loader for optimized delivery.
- Is there a preferred audio file for the Bansuri player, or should the component accept a `src` prop for future flexibility? → Component accepts a `tracks` array prop for extensibility.
