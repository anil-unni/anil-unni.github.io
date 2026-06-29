## ADDED Requirements

### Requirement: Blog index renders editorial-style post list
The `/blog` route SHALL render a `<main>` with `aria-label="Technical Blog"` listing all published posts in reverse-chronological order. Each post entry SHALL display: title, date, tag list, estimated reading time (computed from word count at 200 WPM), and a one-sentence excerpt.

#### Scenario: Post list renders all published posts
- **WHEN** a user navigates to `/blog`
- **THEN** all MDX files in `/content/blog/` with `published: true` in frontmatter are listed

#### Scenario: Reading time is displayed per post
- **WHEN** a post card renders
- **THEN** estimated reading time (e.g., "5 min read") is visible, computed from the post's word count at 200 WPM, rounded up to the nearest minute

### Requirement: Blog post page delivers an editorial reading experience
The `/blog/[slug]` route SHALL render a `<article>` with `aria-label` set to the post title. It SHALL include: a sticky Table of Contents (`<nav aria-label="Table of contents">`) derived from the post's `<h2>` and `<h3>` headings, author metadata, publish date, tag list, reading time, and the MDX body content.

#### Scenario: Sticky ToC tracks scroll position
- **WHEN** a user scrolls through a blog post
- **THEN** the Table of Contents highlights the heading corresponding to the current viewport position
- **THEN** the ToC remains fixed/sticky in the right sidebar on viewports ≥1024px

#### Scenario: ToC links scroll to headings
- **WHEN** a user clicks a ToC link
- **THEN** the page smooth-scrolls to the corresponding heading
- **THEN** focus moves to the target heading element

#### Scenario: Author metadata is present
- **WHEN** a blog post page renders
- **THEN** author name ("Anil Unni"), publish date, and reading time are visible above the post body

### Requirement: Blog post injects Article JSON-LD
Each `/blog/[slug]` page SHALL inject an `Article` JSON-LD script containing: `headline`, `author` (Person), `datePublished`, `dateModified`, `description`, and `url` fields derived from post frontmatter.

#### Scenario: JSON-LD script is present in the HTML
- **WHEN** a blog post page is rendered server-side
- **THEN** a `<script type="application/ld+json">` tag with valid Article schema is present in the `<head>`
