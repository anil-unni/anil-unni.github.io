## Context

The portfolio is a Next.js 14 App Router site with Framer Motion, Tailwind CSS, and Geist Sans as the sole font. The current visual language — cyan HSL accent, node-graph SVG, bento grids, staggered fade-ups — reads as a standard AI-scaffold dark portfolio. The redesign targets an editorial, typography-first aesthetic comparable to studios on Awwwards/Siteinspire (Cargo Collective, Resn, Reas): high typographic contrast, grain texture, restrained palette, clip-path motion. All existing content and routing is preserved; only visual components change.

## Goals / Non-Goals

**Goals:**
- Establish a distinctive visual language built on type hierarchy, not decorative UI
- Remove all elements that signal "template": node graphs, bento grids, gradient glows, cyan accent
- Introduce grain texture and a custom cursor to communicate craft
- Replace Framer fade/scale motion with clip-path mask reveals throughout
- Mixed font pairing: a display serif for the hero name + geometric sans for everything else
- A numbered project-index list (editorial) replacing the card grid for work
- All changes are CSS/component-level — no routing, data, or API changes

**Non-Goals:**
- Horizontal scroll or scroll-jacking (hurts accessibility and mobile)
- Changing content, copy, or data structures in `lib/data.ts`
- Changing any route structure under `app/`
- Adding any new npm dependencies beyond a font package (if needed)
- Animation that depends on JavaScript scroll libraries (Lenis, GSAP) — Framer Motion + CSS is sufficient

## Decisions

### D1 — Font pairing: Playfair Display + Inter (or system fallback)

**Chosen**: Import `Playfair Display` (serif) via `next/font/google` for the hero name only. Keep Geist Sans / Inter for all body, label, and UI text.

**Why**: A single serif headline creates the editorial contrast that separates award portfolios from templates. Using it only on the display name keeps it as a deliberate statement, not decorative noise.

**Alternative considered**: Custom variable font (`Neue Haas Grotesk`, `ABC Diatype`) — would require a font license or local file, adding friction. A Google font is zero-dependency.

---

### D2 — Palette: near-black + warm bone, single red mark

**Chosen**: 
- Background: `hsl(0 0% 5%)` — near-black with no blue cast
- Foreground: `hsl(40 15% 93%)` — warm bone, not pure white
- Accent: `hsl(0 72% 55%)` — red, used only for the availability/status dot and active states
- Remove: `hsl(195 100% 60%)` cyan entirely

**Why**: Cyan-on-dark-navy is the most common AI-generated tech portfolio pattern. A warm near-black with bone white reads as a deliberate editorial choice. Red as a single accent mark (not a theme color) creates a strong focal point without becoming a palette.

**Alternative considered**: Pure white on pure black (#fff / #000) — too harsh, loses the "crafted" quality. Olive or amber — both feel trendy and will date faster than red.

---

### D3 — Motion: clip-path reveals, no scale or opacity fade-up

**Chosen**: Replace all `fadeUp` (translateY + opacity) variants with `clipPath` reveal variants — content clips from `inset(0 0 100% 0)` to `inset(0 0 0% 0)`. Reserve opacity for very subtle transitions only.

**Why**: Clip-path reveals are the signature motion of editorial/award portfolios (Cargo, Linear). Scale and fade-up are ubiquitous in templates. The clip-path motion makes text feel carved into place, reinforcing the typographic intent.

**Alternative considered**: Keeping Framer stagger but changing easing — insufficient differentiation.

---

### D4 — Hero layout: full-width split-line name with inline descriptor

**Chosen**: Hero renders the name "Anil Unni" at a very large display size (clamp 72px–160px), split naturally across two lines by viewport. The role descriptor ("Solutions Consultant · ERP · Photographer") sits inline on the second line at a small, tracked-out label size — creating a strong size contrast within the same text block. No decorative SVG, no CTA buttons in the hero (scroll indicator only).

**Why**: Typographic contrast alone creates visual weight. Removing buttons from the hero forces the type to do the work, which is what award-winning personal sites do.

**Alternative considered**: Full-screen video/image — requires content upkeep and breaks the minimal intent.

---

### D5 — Work section: numbered index list

**Chosen**: ERP projects and featured work rendered as a vertical indexed list with a thin `1px` rule between items. Each row: index number (small mono), project title (medium sans), tag chips (minimal), metric (right-aligned). Hover reveals a brief descriptor inline or shows a small thumbnail if available.

**Why**: Card grids feel like dashboards. Index lists feel like editorial tables of contents — immediately more intentional.

**Alternative considered**: Masonry grid — still too "portfolio template." Horizontal row cards — still card-based.

---

### D6 — Grain texture: CSS `filter: url(#grain)` SVG turbulence overlay

**Chosen**: A single fixed `<div>` with a base64-encoded SVG `feTurbulence` noise overlay at `~4% opacity`, `mix-blend-mode: overlay`, `pointer-events: none`, `position: fixed`.

**Why**: Grain is the fastest way to remove the "flat digital render" quality without changing layout. It works at `pointer-events: none` so it never interrupts interaction. SVG filter grain has zero network cost and is composited by the GPU.

**Alternative considered**: Background-image PNG noise tile — adds a HTTP request, larger file, may tile visibly on retina.

---

### D7 — Custom cursor: dot + expanding ring

**Chosen**: A 6px filled dot that tracks immediately, plus a 32px ring that follows with a 0.1s lag (`useSpring` from Framer Motion). Ring expands to 48px on link hover, collapses on pointer down.

**Why**: Cursor replacement is a widely used signal of craft on award sites and costs near-zero in performance since it's GPU-composited `transform`.

**Alternative considered**: Text cursor replacement — too distracting on a text-heavy site.

## Risks / Trade-offs

**[Risk] Playfair Display adds a font network request** → Mitigation: use `display: swap` and `preload: true` in `next/font/google`. Add `<link rel="preconnect">` in `layout.tsx`.

**[Risk] Custom cursor breaks on touch devices** → Mitigation: detect `pointer: coarse` media query and disable the cursor component entirely on touch.

**[Risk] Clip-path reveals may flash on low-power devices** → Mitigation: wrap in `useReducedMotion()` — if true, skip clip-path and render content statically.

**[Risk] Removing CTA buttons from the hero reduces conversion** → Accepted trade-off. A scroll indicator leads to the work section naturally. The contact form is still one scroll away.

**[Risk] Red accent may feel alarming or "error state"** → Mitigation: keep red usage to a single dot indicator and active nav item only. Never use it on body text or backgrounds.

## Open Questions

- Should the hero scroll indicator be an animated arrow or a "scroll" label with a vertical line? Either works; pick whichever renders cleanest at implementation time.
- EnthusiastBento: replace with a split-column text/image editorial block, or a simple two-column fact grid? Both are valid. The task spec will leave this as an editorial two-column block.
