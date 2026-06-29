## ADDED Requirements

### Requirement: Root layout injects Person JSON-LD
`app/layout.tsx` SHALL include a `<script type="application/ld+json">` tag (rendered by a server component) containing a valid `Person` schema with: `name`, `url`, `jobTitle` (array: ["Solutions Consultant", "ERP Engineer", "Photographer"]), `sameAs` (social profile URLs), and `knowsAbout` fields.

#### Scenario: JSON-LD script is present on every page
- **WHEN** any page of the site is rendered server-side
- **THEN** the `<head>` contains a `<script type="application/ld+json">` with `@type: "Person"` and non-empty `name` and `url` fields

### Requirement: Next.js Metadata API provides OG and Twitter cards
Each route SHALL export a `metadata` object or `generateMetadata` function that sets: `title` (with site name template), `description`, `openGraph.images` (at minimum one 1200×630 image), `twitter.card` ("summary_large_image"), and `alternates.canonical`.

#### Scenario: OG metadata is set on the root page
- **WHEN** the root `/` page is rendered
- **THEN** `<meta property="og:title">`, `<meta property="og:image">`, and `<meta property="og:url">` are present in the `<head>` with non-empty values

#### Scenario: Blog post pages have unique OG metadata
- **WHEN** a `/blog/[slug]` page is rendered
- **THEN** `<meta property="og:title">` contains the post's title
- **THEN** `<meta name="twitter:card">` is set to "summary_large_image"

### Requirement: robots.ts disallows crawling of private routes
`app/robots.ts` SHALL export a `robots` function returning a `Robots` object that: allows all crawlers on public routes, disallows `/api/` and any future `/admin/` routes, and sets the `sitemap` URL to the canonical site URL + `/sitemap.xml`.

#### Scenario: robots.txt is served at /robots.txt
- **WHEN** a crawler requests `/robots.txt`
- **THEN** the response contains `User-agent: *`, `Allow: /`, `Disallow: /api/`, and `Sitemap: <canonical-url>/sitemap.xml`

### Requirement: sitemap.ts merges static and dynamic routes
`app/sitemap.ts` SHALL export an async `sitemap` function that returns an array of `MetadataRoute.Sitemap` entries including: static routes (`/`, `/blog`, `/photography`, `/consulting`) and all dynamic blog post routes (`/blog/<slug>`) derived by reading the `/content/blog/` directory at build time.

#### Scenario: Sitemap includes all published blog slugs
- **WHEN** the sitemap is generated at build time
- **THEN** `/sitemap.xml` contains an entry for every MDX file in `/content/blog/` that has `published: true` in frontmatter

#### Scenario: Sitemap includes all static routes
- **WHEN** the sitemap is generated
- **THEN** entries for `/`, `/blog`, `/photography`, and `/consulting` are present with valid `lastModified` timestamps
