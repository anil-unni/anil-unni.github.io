## ADDED Requirements

### Requirement: ERP Systems section renders as a high-density bento grid
The ERP/Systems section SHALL render as a `<section>` with `aria-label="Systems & ERP Engineering"` containing a CSS Grid layout with asymmetric tile sizes. Each tile SHALL represent a distinct ERP/systems domain (e.g., inventory management, reporting suites, workflow automation, integrations). The grid SHALL use a minimum of 4 tiles and a maximum of 9 tiles on desktop.

#### Scenario: Grid renders correct tile count on desktop
- **WHEN** viewport width is 1024px or wider
- **THEN** the bento grid displays between 4 and 9 tiles, all visible without horizontal scrolling

#### Scenario: Grid collapses to single column on mobile
- **WHEN** viewport width is below 640px
- **THEN** all tiles stack vertically in a single column with full-width layout

#### Scenario: Tiles reveal on scroll
- **WHEN** the ERP section scrolls into the viewport
- **THEN** tiles animate in with a `fadeUp` variant and a staggered delay of 80ms per tile

### Requirement: Each ERP tile displays domain metadata
Every tile SHALL include a domain icon (SVG), a short title (≤4 words), and a one-line descriptor (≤12 words). Tiles MAY include a numeric metric (e.g., "40+ integrations", "3-second report generation").

#### Scenario: Tile content is fully visible without truncation
- **WHEN** a tile renders at its minimum grid area size
- **THEN** the icon, title, and descriptor are all fully visible without text overflow or ellipsis

### Requirement: ERP grid tile hover reveals detail
On pointer devices, hovering a tile SHALL reveal an expanded descriptor overlay using a Framer Motion `AnimatePresence` transition.

#### Scenario: Hover overlay appears on desktop
- **WHEN** a pointer user hovers over an ERP tile
- **THEN** a detail overlay fades in over the tile within 200ms, showing extended description text
- **THEN** the overlay disappears when the pointer leaves the tile
