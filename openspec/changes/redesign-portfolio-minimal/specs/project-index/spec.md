## ADDED Requirements

### Requirement: Work section renders as a numbered vertical index list
The ERP/work section SHALL render projects as a vertical list of rows separated by 1px horizontal rules. No card, tile, bento, or grid layout SHALL be used.

#### Scenario: Projects displayed as list rows
- **WHEN** the work section is visible
- **THEN** each project appears as a full-width row with a `1px` rule above it, containing: a zero-padded index number, project title, tag chips, and an optional metric

#### Scenario: No card or box layout
- **WHEN** the work section renders
- **THEN** no element has a visible `border`, `border-radius`, `box-shadow`, or background fill that creates a card appearance

---

### Requirement: Each index row contains a structured layout
Each project row SHALL contain (left to right): a monospace index number (01, 02, …), the project title in medium weight sans-serif, a flex row of tag chips, and an optional metric value right-aligned.

#### Scenario: Index number is zero-padded
- **WHEN** a project row renders
- **THEN** the index displays as two digits (01, 02, 03, …) in a monospace or tabular-figures font

#### Scenario: Metric aligned to right
- **WHEN** a project row has a `metric` field in data
- **THEN** the metric value is right-aligned in the row, set in a small muted style

#### Scenario: No metric field
- **WHEN** a project row has no `metric` field
- **THEN** the right column is empty and no placeholder text is shown

---

### Requirement: Row hover reveals project descriptor inline
On pointer hover, each project row SHALL expand or reveal the `descriptor` text inline (below the title row, within the same list item), without navigating away.

#### Scenario: Descriptor hidden by default
- **WHEN** the work section renders without any hover
- **THEN** no project descriptor text is visible

#### Scenario: Descriptor reveals on hover
- **WHEN** the user hovers a project row on a pointer device
- **THEN** the descriptor text animates in (clip-path or max-height reveal) below the project title within that row

#### Scenario: Touch device fallback
- **WHEN** the device is touch-only (`pointer: coarse`)
- **THEN** all descriptors are visible statically without requiring hover interaction

---

### Requirement: Section header uses the same editorial typographic style
The work section heading SHALL use a large display size for the section title and a small tracked label above it, consistent with the hero typographic hierarchy.

#### Scenario: Section label and title visible
- **WHEN** the work section scrolls into view
- **THEN** a small uppercase tracked label (e.g., "Selected Work") appears above a larger section title
- **THEN** both animate in via clip-path reveal
