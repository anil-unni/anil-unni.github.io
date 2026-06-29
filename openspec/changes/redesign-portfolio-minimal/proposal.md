## Why

The current portfolio reads as a competent but generic dark-tech template — cyan accent on near-black, SVG node graphs, bento grids, and staggered fade-ups that any AI scaffold produces. For someone pitching high-value consulting engagements, the site needs to communicate taste and judgment, not just technical capability. Award-winning portfolios (Awwwards, Siteinspire) achieve this through editorial typography, restraint, and strong spatial logic — not more UI components.

## What Changes

- **Remove** the node-graph SVG decoration from the hero — it signals "developer template"
- **Remove** bento/card-grid layouts (EnthusiastBento, ERPSystemsGrid card pattern) in favor of indexed list and editorial row patterns
- **Replace** the cyan `hsl(195 100% 60%)` accent with a warm off-white/bone tone on near-black, using a single red or amber mark sparingly
- **Introduce** a mixed typographic system: large display serif for the hero name, tight geometric sans for labels and body
- **Introduce** a grain/noise texture overlay for tactile depth (removes the flat "digital render" feel)
- **Introduce** a custom minimal cursor (dot + ring) that tracks pointer state
- **Revamp** the hero layout to be text-only, editorial — full-width name split across two lines with a role descriptor set inline at a contrasting size
- **Revamp** work section from icon-card grid to a numbered project index list (à la Cargo, Resn, Reas)
- **Revamp** navigation from pill/frosted header to a lean fixed sidebar or minimal top bar with large index markers
- **Add** a single horizontal marquee ticker (place, time, availability) as a subtle footer element
- **Preserve** all existing content: ERP work, photography gallery, blog preview, contact form — only the visual treatment changes

## Capabilities

### New Capabilities

- `editorial-hero`: Full-viewport hero section built around typographic hierarchy — oversized name, inline role descriptor, no decorative geometry. Scroll-triggered text mask reveal replaces fade-up.
- `project-index`: Numbered, line-separated project list replacing the card grid. Hover reveals a thumbnail or metric inline. Used for both ERP work and general projects.
- `visual-language`: Global design tokens — grain texture, mixed type scale (serif display + geometric sans), warm-neutral palette, custom cursor, and motion principles (clip-path reveals, no scale/fade).

### Modified Capabilities

- None — existing specs remain unchanged; only visual implementation of the above sections is replaced.

## Impact

- `components/sections/HeroSolutionsArchitect.tsx` — full rewrite
- `components/sections/ERPSystemsGrid.tsx` — rewrite to indexed list layout
- `components/sections/EnthusiastBento.tsx` — rewrite to editorial row/split layout
- `components/sections/Header.tsx` — minimal top bar redesign
- `components/sections/Footer.tsx` — marquee ticker addition or simplification
- `app/globals.css` — palette swap, grain layer, font imports, cursor styles
- `tailwind.config.ts` — new design tokens, font family registration
- `lib/motionVariants.ts` — replace fade/scale variants with clip-path and mask reveals
- New component: `components/ui/CustomCursor.tsx`
- New component: `components/ui/GrainOverlay.tsx`
- No API, routing, or data changes — purely visual
