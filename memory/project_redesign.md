---
name: portfolio-redesign-2025
description: Complete ground-up redesign of Anil Unni's portfolio to premium dark-first cinematic aesthetic inspired by Apple, Linear, Stripe
metadata:
  type: project
---

Portfolio was fully redesigned from scratch in May 2026. New design is production-ready (pnpm build passes).

**Design System:**
- Dark-first: `bg-void` (#070709) for dark sections, `bg-chalk` (#F8F8F5) for light sections
- Alternating dark/light sections: Hero(dark) → About(light) → Skills(dark) → Work(light) → Contact(dark) → Footer(dark)
- Typography: Cormorant Garamond (display, font-display, font-light) for big moments; Inter for body
- `.text-label` CSS class = monospace 11px 0.12em tracking uppercase (used for eyebrows, nav, tags)
- Colors defined in `@theme` in globals.css: `--color-void`, `--color-chalk`, `--color-chalk-2`
- Animations: `animate-float`, `animate-float-b`, `animate-glow-pulse`, `animate-scroll-bounce` all defined in globals.css @theme

**Motion System:**
- EASE_EXPO = [0.16, 1, 0.3, 1] constant used across all components
- Hero text: overflow-hidden + y:"108%" → y:0 reveal
- Sections: whileInView with once:true and margin offsets
- Hero has scroll-driven parallax (useScroll + useTransform on contentY, contentOpacity)
- Footer: sophisticated velocity marquee with useAnimationFrame + useVelocity + useSpring (kept from original)
- Lenis: lerp=0.075, duration=1.8

**Architecture:**
- No theme toggle (dark-only, removed isDark/toggleTheme state from page.tsx)
- CustomCursor still included in page.tsx
- Lanyard (3D physics ID card) removed from display
- Header has no props (self-contained with useScroll)
- pnpm overrides added to package.json to resolve React 18/19 @types conflict

**Why:** User wanted Apple/Linear/Stripe premium aesthetic — minimal copy, cinematic scroll, visual storytelling over long paragraphs.
**How to apply:** When adding new sections, follow the alternating dark/light pattern. Use EASE_EXPO, text-label for eyebrows, Cormorant Garamond (font-display) for impact headlines.
