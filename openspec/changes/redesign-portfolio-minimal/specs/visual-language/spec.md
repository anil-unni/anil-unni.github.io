## ADDED Requirements

### Requirement: Palette uses warm near-black and bone white with a single red accent
The global CSS palette SHALL be updated to remove the cyan accent (`hsl(195 100% 60%)`) and adopt:
- `--background`: `hsl(0 0% 5%)`
- `--foreground`: `hsl(40 15% 93%)`
- `--accent`: `hsl(0 72% 55%)` (red, used only for status dots and active nav states)
- `--muted`: `hsl(0 0% 45%)`

#### Scenario: Cyan accent absent
- **WHEN** the site renders
- **THEN** no element uses `hsl(195 …)` or the previous cyan token as a visible color

#### Scenario: Red accent restricted to dot indicators
- **WHEN** any page renders
- **THEN** the red accent appears only on: the availability/status dot, the active nav item indicator, and focus rings — never on body text, headings, or backgrounds

---

### Requirement: Display serif font registered in Next.js
`Playfair Display` (or a comparable display serif) SHALL be imported via `next/font/google` in `app/layout.tsx` and exposed as a CSS variable `--font-display`.

#### Scenario: CSS variable available globally
- **WHEN** any page renders
- **THEN** `--font-display` resolves to the loaded serif font family

#### Scenario: Serif applied only to display elements
- **WHEN** the site renders
- **THEN** only elements with the `font-display` utility class (or inline `fontFamily` via Tailwind config) use the serif typeface

---

### Requirement: Grain texture overlay renders site-wide
A `GrainOverlay` component SHALL render a fixed, full-viewport `<div>` with an SVG `feTurbulence` noise filter at approximately 4% opacity and `mix-blend-mode: overlay`. It SHALL be `pointer-events: none` and `z-index: 9999`.

#### Scenario: Grain visible on all pages
- **WHEN** any page is viewed
- **THEN** a subtle noise grain is visible across the entire viewport surface

#### Scenario: Grain does not block interaction
- **WHEN** a user clicks, hovers, or scrolls on any interactive element
- **THEN** the grain overlay does not intercept pointer events

---

### Requirement: Custom cursor replaces the OS default on pointer devices
A `CustomCursor` component SHALL render a 6px filled dot and a 32px ring that tracks cursor position. The ring SHALL follow the dot with a spring lag. On link/button hover, the ring SHALL expand to 48px. The OS cursor SHALL be hidden on the `<html>` element via `cursor: none`.

#### Scenario: Custom cursor visible on desktop
- **WHEN** the user moves their pointer on a device with `pointer: fine`
- **THEN** a dot and ring follow the cursor position

#### Scenario: Custom cursor hidden on touch
- **WHEN** the device uses `pointer: coarse`
- **THEN** the custom cursor component is not rendered and the OS touch cursor behavior is unchanged

#### Scenario: Ring expands on interactive elements
- **WHEN** the user hovers over a link or button
- **THEN** the ring diameter increases from 32px to 48px with a smooth spring animation

---

### Requirement: All section reveal animations use clip-path, not fade/scale
The global motion variants in `lib/motionVariants.ts` SHALL include a `clipReveal` variant that animates `clipPath` from `inset(0 0 100% 0)` to `inset(0 0 0% 0)`. The existing `fadeUp` variant SHALL be replaced with `clipReveal` in all section components.

#### Scenario: Clip-path used for in-view reveals
- **WHEN** any section scrolls into view
- **THEN** the reveal animation clips content from bottom to top rather than translating or fading

#### Scenario: Reduced motion disables clip-path animation
- **WHEN** `prefers-reduced-motion: reduce` is active
- **THEN** all clip-path animations are skipped and content is immediately visible
