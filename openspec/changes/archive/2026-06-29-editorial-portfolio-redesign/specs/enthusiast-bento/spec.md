## ADDED Requirements

### Requirement: Enthusiast section renders as a compact bento module
The enthusiast section SHALL render as a `<section>` with `aria-label="Enthusiast Pursuits"` containing a compact bento-style grid of hobby modules. Each module SHALL represent a distinct pursuit (automotive detailing, hardware modding, mechanical keyboards, or similar). The section SHALL fit within a constrained height (max 600px on desktop) to read as a "compact aside" within the editorial flow.

#### Scenario: Bento modules render all pursuits
- **WHEN** the enthusiast section mounts
- **THEN** at minimum 3 hobby modules are visible, each with an icon, title, and one-line descriptor

#### Scenario: Section fits within compact height constraint
- **WHEN** the enthusiast section renders on a desktop viewport (1024px+)
- **THEN** the section's rendered height does not exceed 600px without scrolling

### Requirement: Each hobby module displays meticulous detail
Every module SHALL include a descriptive icon (SVG or emoji-free icon system), a hobby title, and a short descriptor (≤15 words) conveying depth and specificity (e.g., "Paint correction & ceramic coating on daily drivers").

#### Scenario: Descriptor conveys specificity
- **WHEN** any hobby module renders
- **THEN** the descriptor text is non-generic and reflects Anil's actual pursuit depth

### Requirement: Hobby modules animate on viewport entry
The bento modules SHALL animate in using Framer Motion `whileInView` with a stagger pattern when the section scrolls into view.

#### Scenario: Modules stagger-animate on scroll
- **WHEN** the enthusiast section enters the viewport
- **THEN** each module animates in with a `fadeUp` variant with a 100ms stagger between modules
