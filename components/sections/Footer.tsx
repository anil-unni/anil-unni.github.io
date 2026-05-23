"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";
import LocalTimeTicker from "@/components/ui/LocalTimeTicker";

// Wraps v into [min, max) — creates a seamless loop
function wrap(min: number, max: number, v: number): number {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

const BASE_VELOCITY = -1.5; // units/sec at rest  (25 units = one full cycle ≈ 16s)

const FOOTER_LINKS = [
  { href: "https://github.com/anil-unni", label: "GitHub", isExternal: true },
  { href: "https://linkedin.com/in/anilunni", label: "LinkedIn", isExternal: true },
  { href: "mailto:anilunni@outlook.com", label: "Email", isExternal: false },
] as const;

function VelocityMarquee() {
  // Position state — start just past 0 to avoid wrap-boundary glitch at mount
  const baseX = useMotionValue(-0.001);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  // Heavy damping so the velocity feels weighted, not twitchy
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
    restDelta: 0.001,
  });

  // Scroll velocity → speed multiplier (unclamped so fast scrolling = warp mode)
  const velocityFactor = useTransform(
    smoothVelocity,
    [0, 1000],
    [0, 5],
    { clamp: false }
  );

  // Scroll velocity → skew degrees (the signature warp effect)
  const rawSkew = useTransform(
    smoothVelocity,
    [-3000, 0, 3000],
    [12, 0, -12],
    { clamp: true }
  );
  const skewX = useSpring(rawSkew, { damping: 30, stiffness: 100 });

  // Translate baseX (abstract units) → CSS percentage for seamless loop
  // 4 identical copies → -25% = 1 item width → loop is invisible
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  const directionFactor = useRef<number>(1);

  useAnimationFrame((_, delta) => {
    const vf = velocityFactor.get();

    // Flip direction when user scrolls up
    if (vf < 0) directionFactor.current = -1;
    else if (vf > 0) directionFactor.current = 1;

    // Base movement + velocity boost
    const moveBy =
      directionFactor.current * BASE_VELOCITY * (delta / 1000) * (1 + Math.abs(vf));

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden select-none border-t border-border/40">
      <motion.div
        className="flex whitespace-nowrap items-center"
        style={{ x, skewX }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="inline-flex items-center shrink-0 py-10 md:py-16">
            <span
              className="font-display font-light italic text-foreground leading-none tracking-tight"
              style={{ fontSize: "clamp(4.5rem, 11vw, 9.5rem)" }}
            >
              ANIL UNNI
            </span>
            <span
              className="mx-10 md:mx-20 text-muted-foreground/20 shrink-0 leading-none"
              style={{ fontSize: "clamp(1rem, 2vw, 1.75rem)" }}
            >
              ✦
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <VelocityMarquee />
      <div className="px-6 md:px-12 lg:px-20 py-6 border-t border-border/40">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] font-mono text-foreground font-semibold tracking-wider">
            © {currentYear} Anil Unni
          </p>
          <LocalTimeTicker />
          <div className="flex items-center gap-6 font-mono text-[10px] text-muted-foreground">
            {FOOTER_LINKS.map(({ href, label, isExternal }) => (
              <a
                key={label}
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="hover:text-foreground transition-colors duration-300 underline underline-offset-4"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
