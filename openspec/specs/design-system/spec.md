## ADDED Requirements

### Requirement: Tailwind config defines the complete design token set
`tailwind.config.ts` SHALL extend the default theme with: a custom color palette (background, surface, accent, muted, foreground tokens in dark-mode values), a typography scale (using a sharp sans-serif font loaded via `next/font`), and spacing/radius tokens consistent with a premium enterprise aesthetic.

#### Scenario: Design tokens are available as Tailwind utilities
- **WHEN** any component uses `bg-surface`, `text-foreground`, or `accent-*` Tailwind classes
- **THEN** these utilities resolve to the correct CSS custom property values defined in the config

#### Scenario: Font loads without layout shift
- **WHEN** the site renders for the first time
- **THEN** the primary sans-serif font is loaded via `next/font/google` with `display: swap`, and the CSS variable is applied to the `<html>` element to prevent FOUT

### Requirement: Dark mode is enforced globally as the default
The `<html>` element SHALL always have the `dark` class applied. There is no light mode or theme toggle in v1. All Tailwind dark-mode utilities SHALL use the `class` strategy.

#### Scenario: Dark mode class is always present
- **WHEN** any page renders
- **THEN** `<html class="dark ...">` is present in the DOM

### Requirement: Shared motion variants are exported from a central module
`lib/motionVariants.ts` SHALL export named Framer Motion variant objects: `fadeUp`, `fadeIn`, `slideInLeft`, `staggerContainer`, and `staggerItem`. These SHALL be the only animation presets used across dimension sections.

#### Scenario: All section animations use shared variants
- **WHEN** any dimension section component applies a Framer Motion animation
- **THEN** the animation uses a variant imported from `lib/motionVariants.ts` rather than an inline object

### Requirement: Floating label inputs are a shared UI primitive
`components/ui/FloatingLabelInput.tsx` SHALL export a reusable input component that accepts `label`, `name`, `type`, `value`, `onChange`, and `error` props. The floating animation SHALL be implemented via Tailwind `peer` classes or Framer Motion.

#### Scenario: FloatingLabelInput renders label in float position when value is non-empty
- **WHEN** `FloatingLabelInput` mounts with a non-empty `value` prop
- **THEN** the label is rendered in the floated (above-input) position without animation

#### Scenario: FloatingLabelInput displays error state
- **WHEN** the `error` prop is a non-empty string
- **THEN** the input border changes to an error accent color and the error string is rendered below the input
