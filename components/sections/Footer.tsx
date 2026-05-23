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

function wrap(min: number, max: number, v: number): number {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

const BASE_VELOCITY = -1.2;

const FOOTER_LINKS = [
  { href: "https://github.com/anil-unni", label: "GitHub", external: true },
  { href: "https://linkedin.com/in/anilunni", label: "LinkedIn", external: true },
  { href: "mailto:anilunni@outlook.com", label: "Email", external: false },
] as const;

function VelocityMarquee() {
  const baseX = useMotionValue(-0.001);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
    restDelta: 0.001,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });
  const rawSkew = useTransform(smoothVelocity, [-3000, 0, 3000], [10, 0, -10], {
    clamp: true,
  });
  const skewX = useSpring(rawSkew, { damping: 30, stiffness: 100 });
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((_, delta) => {
    const vf = velocityFactor.get();
    if (vf < 0) directionFactor.current = -1;
    else if (vf > 0) directionFactor.current = 1;
    baseX.set(
      baseX.get() +
        directionFactor.current * BASE_VELOCITY * (delta / 1000) * (1 + Math.abs(vf))
    );
  });

  return (
    <div
      className="overflow-hidden select-none border-t"
      style={{ borderColor: "rgba(255,255,255,0.05)" }}
    >
      <motion.div
        className="flex whitespace-nowrap items-center"
        style={{ x, skewX }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            className="inline-flex items-center shrink-0 py-14"
          >
            <span
              className="font-display font-light italic text-white leading-none tracking-tight"
              style={{
                fontSize: "clamp(52px, 10vw, 110px)",
                opacity: 0.06,
              }}
            >
              ANIL UNNI
            </span>
            <span
              className="mx-12 shrink-0 leading-none"
              style={{
                fontSize: "clamp(1rem, 2vw, 1.75rem)",
                color: "rgba(255,255,255,0.04)",
              }}
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
  return (
    <footer className="bg-void">
      <VelocityMarquee />
      <div
        className="px-6 md:px-12 lg:px-20 py-7 border-t"
        style={{ borderColor: "rgba(255,255,255,0.05)" }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <span className="text-label text-white/20">
            © {new Date().getFullYear()} Anil Unni
          </span>

          <LocalTimeTicker />

          <div className="flex items-center gap-7">
            {FOOTER_LINKS.map(({ href, label, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="text-label text-white/22 hover:text-white/60 transition-colors duration-300"
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
