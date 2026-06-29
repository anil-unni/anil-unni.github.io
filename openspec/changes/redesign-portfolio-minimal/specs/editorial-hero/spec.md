## ADDED Requirements

### Requirement: Hero renders a full-viewport typographic layout
The hero section SHALL fill the viewport (`min-height: 100svh`) and use typographic hierarchy alone to establish visual weight. No decorative SVG, images, or animated geometry elements SHALL appear in the hero.

#### Scenario: Hero visible on load
- **WHEN** the page loads
- **THEN** the hero occupies the full viewport with the name "Anil Unni" at display scale (minimum 72px, maximum 160px, fluid via clamp)

#### Scenario: No decorative geometry
- **WHEN** the hero section is rendered
- **THEN** no SVG node-graph, gradient blob, or background pattern is present within the hero bounds

---

### Requirement: Hero name uses a serif display font
The hero name SHALL be set in a serif display typeface (`Playfair Display` or equivalent) at a fluid size that fills roughly 60–80% of the viewport width on desktop.

#### Scenario: Serif font applied to name only
- **WHEN** the hero renders
- **THEN** only the `<h1>` containing the full name uses the serif typeface; all other text in the section uses the sans-serif body font

#### Scenario: Font loads with swap
- **WHEN** the page loads with a slow connection
- **THEN** the name is visible in a fallback serif font immediately and swaps to `Playfair Display` without layout shift

---

### Requirement: Role descriptor sits inline at contrasting scale
The role descriptor ("Solutions Consultant · ERP · Photographer") SHALL appear immediately below or inline with the second line of the name, set in the body sans-serif at `text-sm` or smaller with `tracking-widest`.

#### Scenario: Descriptor visible alongside name
- **WHEN** the hero renders
- **THEN** the role descriptor is typographically subordinate to the name — visually smaller by at least 4× in size

---

### Requirement: Hero text reveals via clip-path animation
All hero text elements SHALL animate in using a `clipPath` reveal (content clips from bottom to top) rather than fade or scale transforms.

#### Scenario: Clip-path reveal on load
- **WHEN** the page loads
- **THEN** each hero text block reveals by its clip-path transitioning from `inset(0 0 100% 0)` to `inset(0 0 0% 0)` in sequence

#### Scenario: Reduced motion fallback
- **WHEN** the user has `prefers-reduced-motion: reduce` set in their OS
- **THEN** all hero text is visible immediately with no animation

---

### Requirement: Scroll indicator at bottom of hero
A minimal scroll indicator (text label "scroll" or a downward arrow, max 20px wide) SHALL appear at the bottom-center of the hero viewport.

#### Scenario: Scroll indicator present
- **WHEN** the hero is visible and the user has not yet scrolled
- **THEN** the scroll indicator is visible at the bottom of the hero

#### Scenario: Scroll indicator hides on scroll
- **WHEN** the user scrolls past the hero
- **THEN** the scroll indicator is no longer visible
