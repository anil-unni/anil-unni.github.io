## ADDED Requirements

### Requirement: Hero renders the Solutions Architect identity
The hero section SHALL render as a full-viewport `<section>` with `aria-label="Solutions Architect"`, displaying Anil Unni's name, tagline, and a brief narrative of high-stakes consulting projects. It SHALL include an abstract, animated SVG or canvas geometry representing system architecture (node-edge graph or grid topology).

#### Scenario: Hero is visible on initial page load
- **WHEN** a user navigates to the root URL
- **THEN** the hero section occupies at minimum 100vh, renders the name "Anil Unni", the tagline, and at least two project callouts (UAE-to-Mumbai server recovery, SOP implementation)

#### Scenario: Abstract geometry animates on load
- **WHEN** the page finishes loading
- **THEN** the architecture geometry animates in via Framer Motion (fade + scale) within 800ms, and continues with a subtle idle loop animation

#### Scenario: Hero is keyboard-navigable
- **WHEN** a keyboard-only user tabs through the hero
- **THEN** all interactive elements (CTA buttons, project links) receive visible focus rings and are reachable in logical DOM order

### Requirement: Project callouts display high-stakes work
The hero SHALL include at minimum two "callout cards" within the section, each describing a high-stakes project with a title, one-line outcome statement, and an optional metric (e.g., "0 data loss", "72-hour recovery").

#### Scenario: Callout cards render with correct content
- **WHEN** the hero section mounts
- **THEN** at least two project callout cards are visible, each with a non-empty title and outcome statement

#### Scenario: Callouts animate in with stagger
- **WHEN** the hero section enters the viewport
- **THEN** callout cards animate in sequentially with a 120ms stagger delay between each card
