## 1. Foundation — Palette, Fonts & Global Tokens

- [x] 1.1 Update `app/globals.css`: replace `--accent` with `hsl(0 72% 55%)` (red), `--background` with `hsl(0 0% 5%)`, `--foreground` with `hsl(40 15% 93%)`, `--muted` with `hsl(0 0% 45%)`, and remove all `--accent-muted` / cyan references
- [x] 1.2 Add `Playfair Display` via `next/font/google` in `app/layout.tsx`, expose as `--font-display` CSS variable, and register `fontFamily.display` in `tailwind.config.ts`
- [x] 1.3 Update `lib/motionVariants.ts`: add a `clipReveal` variant (`clipPath` from `inset(0 0 100% 0)` → `inset(0 0 0% 0)`, duration 0.7s, ease `[0.22, 1, 0.36, 1]`) and a `clipRevealContainer` stagger parent; keep `fadeUp` as a deprecated alias pointing to the same values for now

## 2. Global UI — Grain Overlay & Custom Cursor

- [x] 2.1 Create `components/ui/GrainOverlay.tsx`: fixed full-viewport `<div>` with an inline SVG `feTurbulence` noise filter (`baseFrequency="0.65"`, `numOctaves="3"`), `opacity-[0.04]`, `mix-blend-mode: overlay`, `pointer-events-none`, `z-[9999]`
- [x] 2.2 Create `components/ui/CustomCursor.tsx`: 6px dot + 32px ring using `useMotionValue` + `useSpring` from Framer Motion; ring expands to 48px on `[data-cursor="hover"]` elements; hide OS cursor with `cursor: none` on `html` when `pointer: fine`; render nothing when `pointer: coarse`
- [x] 2.3 Mount `<GrainOverlay />` and `<CustomCursor />` in `app/layout.tsx` (inside `<body>`, outside route slot)
- [x] 2.4 Add `data-cursor="hover"` attribute to all `<a>` and `<button>` elements in `Header`, `Footer`, and `ContactForm` so the cursor ring responds

## 3. Header — Minimal Top Bar

- [x] 3.1 Rewrite `components/sections/Header.tsx`: remove `border-b border-border/50`, keep `fixed top-0` positioning; reduce nav link size to `text-[11px]` with `tracking-[0.15em]`; replace the active state color from cyan to the red accent dot beside the active item; ensure mobile menu uses the new palette

## 4. Hero — Editorial Typographic Layout

- [x] 4.1 Rewrite `components/sections/HeroSolutionsArchitect.tsx`: remove `<ArchitectureGeometry>`, the background grid div, and CTA buttons entirely; keep the `<section>` with `min-h-svh flex flex-col justify-center`
- [x] 4.2 Set the `<h1>` to use `font-display` (Playfair Display) with `text-[clamp(4.5rem,12vw,10rem)]` `leading-none` `tracking-tight`
- [x] 4.3 Add the role descriptor below the name using `text-[11px]` `tracking-[0.25em]` `uppercase` `text-muted` (sans-serif body font, not serif)
- [x] 4.4 Remove all `staggerContainerSlow` / `fadeUp` motion — replace with `clipReveal` variants on each text block (name line 1, name line 2, descriptor) with sequential `delay` offsets (0.1, 0.3, 0.5)
- [x] 4.5 Add a scroll indicator at `absolute bottom-8 left-1/2 -translate-x-1/2`: a thin vertical line (2px × 32px, bone color) with a "scroll" label in `text-[10px] tracking-widest` above it; hide when scrollY > 80px using a `useScroll` check

## 5. Work Section — Project Index List

- [x] 5.1 Rewrite `components/sections/ERPSystemsGrid.tsx`: replace the `<grid>` layout with a `<ul>` of `<li>` rows, each separated by a `<hr>` styled as `border-t border-border`
- [x] 5.2 Each `<li>` row: left-align a zero-padded index (`01`, `02`, …) in `font-mono text-[11px] text-muted w-8`; project title in `text-base font-medium text-foreground`; tag chips as small `rounded-none border border-border px-1.5 py-0.5 text-[10px]`; metric right-aligned in `text-[11px] text-muted font-mono`
- [x] 5.3 Add hover-reveal for the descriptor: wrap descriptor in a `<motion.div>` with `clipReveal` triggered by `whileHover` parent state; on `pointer: coarse`, render all descriptors statically visible
- [x] 5.4 Update the section header: small `tracking-[0.2em] text-[10px] uppercase text-muted` label above a large `text-[clamp(2rem,5vw,3.5rem)] font-semibold` title; both animate in via `clipReveal` on scroll into view; remove the existing `fadeUp` variants

## 6. Enthusiast Section — Editorial Two-Column Layout

- [x] 6.1 Rewrite `components/sections/EnthusiastBento.tsx`: replace the bento grid with a two-column split layout (`grid-cols-1 lg:grid-cols-2 gap-16`); left column: a stacked list of 3–4 interest facts (bold label + short descriptor per row, separated by thin rules); right column: a single large photography image (use an existing asset from `public/`) with `object-cover` and a caption
- [x] 6.2 Apply `clipReveal` scroll-triggered animations on the left fact rows (staggered) and the right image column

## 7. Photography & Audio Section — Minimal Pass

- [x] 7.1 In `components/sections/PhotographyAudioGallery.tsx`: remove any card borders or rounded containers from gallery items; ensure image grid uses `gap-1` tight spacing with no border-radius; update section header to match editorial label + title pattern from task 5.4

## 8. Blog Preview & Contact — Palette & Animation Pass

- [x] 8.1 In `components/sections/BlogPreview.tsx`: replace `fadeUp` with `clipReveal`; remove any cyan accent references; ensure post links use `text-foreground` with a red underline on hover
- [x] 8.2 In `components/sections/ContactForm.tsx`: replace `fadeUp` with `clipReveal`; ensure form inputs use `bg-transparent border-b border-border rounded-none` (underline style, no box); update submit button from rounded-full + cyan to a flat rectangular button with the bone foreground color and red hover state

## 9. Footer — Marquee Ticker & Cleanup

- [x] 9.1 In `components/sections/Footer.tsx`: add a horizontal marquee ticker above the footer with repeating items: current location, local time, availability status (with red dot); ensure marquee uses `overflow-hidden` + CSS `@keyframes scroll` (no JS library)
- [x] 9.2 Remove any leftover cyan color references from the footer

## 10. Verification

- [x] 10.1 Run `pnpm build` — confirm zero TypeScript errors and no broken imports
- [x] 10.2 Visual check: open `localhost:3000`, confirm no cyan color is visible anywhere on the page
- [x] 10.3 Visual check: confirm grain overlay is visible and does not block click/hover interactions
- [x] 10.4 Visual check: custom cursor dot + ring track correctly on desktop; touch device (or DevTools touch emulation) shows no custom cursor
- [x] 10.5 Visual check: hero has serif name, no node graph, no CTA buttons, clip-path reveal on load
- [x] 10.6 Visual check: work section renders as an indexed list with hover-reveal descriptors
- [x] 10.7 Accessibility check: run `axe` or Lighthouse accessibility audit — ensure focus rings still visible (red accent), no contrast failures on bone/near-black combination
