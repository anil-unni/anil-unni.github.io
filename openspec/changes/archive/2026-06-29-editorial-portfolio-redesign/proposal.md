## Why

The current portfolio lacks a coherent identity architecture that communicates the full depth of Anil Unni's multidisciplinary profile — Solutions Consultant, ERP Engineer, Photographer, and Enthusiast. A bespoke "Editorial Grid / Modern Bento Box" digital space is needed to unify these dimensions into a high-end, production-ready site that performs at the intersection of premium UX, semantic LLM-readiness, and SEO completeness.

## What Changes

- Replace the existing layout with an Editorial Grid / Bento Box system built on Next.js App Router, Tailwind CSS, and Framer Motion
- Introduce a global design system: deep dark mode, sharp sans-serif typography, high-contrast accents, floating-label form inputs
- Add JSON-LD structured data (Person + Article schemas) and Next.js Metadata API for OG/Twitter cards
- Add programmatic `sitemap.ts` merging static and dynamic blog slugs, and `robots.ts`
- Introduce six architectural dimensions as distinct page sections/routes: Solutions Architect hero, ERP/Systems grid, Photography & Audio gallery, Enthusiast bento module, Technical Blog, and Contact form
- Build a custom cinematic audio player for Bansuri flute scores
- Build a blog reading experience with sticky ToC, estimated reading time, and author metadata
- Implement floating-label inquiry form for the Contact section

## Capabilities

### New Capabilities

- `hero-solutions-architect`: Full-bleed hero section highlighting high-stakes consulting projects with abstract system-architecture geometry and motion
- `erp-systems-grid`: High-density, ERP-style bento grid showcasing scalable abstractions and business management modules
- `photography-audio-gallery`: Responsive gallery that breaks the rigid grid with expansive photography and an integrated cinematic Bansuri audio player
- `enthusiast-bento`: Compact bento module for automotive detailing, hardware modding, and tactile hobby pursuits
- `technical-blog`: Editorial-style blog with dynamic reading time estimation, sticky Table of Contents, and structured Article JSON-LD
- `contact-form`: Polished floating-label inquiry form with accessible, animated inputs
- `seo-metadata-layer`: Global JSON-LD (Person schema), Next.js Metadata API integration (OG, Twitter cards, canonical URLs), `robots.ts`, and dynamic `sitemap.ts`
- `design-system`: Global Tailwind design tokens, dark-mode theming, typography scale, and shared motion primitives

### Modified Capabilities

<!-- No existing specs — this is a greenfield redesign -->

## Impact

- **App Router structure**: New `/app` directory with route groups for blog (`/blog/[slug]`), photography (`/photography`), consulting (`/consulting`), and root portfolio page
- **Components**: New component tree under `/components` organized by dimension (hero, erp, gallery, audio, blog, contact) and shared UI (`/components/ui`)
- **SEO/Metadata**: New `/app/sitemap.ts`, `/app/robots.ts`, and JSON-LD injected via `layout.tsx` and blog page templates
- **Dependencies**: Framer Motion (animation), next/font (typography), any audio library (Howler.js or Web Audio API)
- **Existing files**: `app/layout.tsx`, `app/page.tsx`, and all current section components will be replaced or significantly refactored
