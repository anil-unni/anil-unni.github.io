"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { clipReveal, clipRevealContainer } from "@/lib/motionVariants";

export default function HeroSolutionsArchitect() {
  const shouldReduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const revealVariant = shouldReduce
    ? { hidden: {}, visible: {} }
    : clipReveal;

  const containerVariant = shouldReduce
    ? { hidden: {}, visible: {} }
    : clipRevealContainer;

  return (
    <section
      id="hero"
      aria-label="Anil Unni — Solutions Consultant"
      className="relative flex min-h-svh flex-col justify-center px-6 py-24 lg:px-16"
    >
      <motion.div
        variants={containerVariant}
        initial="hidden"
        animate="visible"
        className="max-w-5xl"
      >
        {/* Role descriptor */}
        <motion.p
          variants={{ ...revealVariant, visible: { ...revealVariant.visible, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 } } }}
          className="mb-6 overflow-hidden text-[11px] tracking-[0.25em] uppercase text-muted"
        >
          Solutions Consultant · ERP Engineer
        </motion.p>

        {/* Name — serif display */}
        <div className="overflow-hidden">
          <motion.h1
            variants={{ ...revealVariant, visible: { ...revealVariant.visible, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 } } }}
            className="font-display leading-none tracking-tight text-foreground"
            style={{ fontSize: "clamp(4.5rem, 13vw, 10rem)" }}
          >
            Anil Unni
          </motion.h1>
        </div>

        {/* Tagline */}
        <motion.p
          variants={{ ...revealVariant, visible: { ...revealVariant.visible, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.45 } } }}
          className="mt-8 max-w-md overflow-hidden text-sm text-muted leading-relaxed"
        >
          Architecting digital solutions. Capturing visual stories.
          <br />
          Exploring the mechanics of technology and life.
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-500"
        style={{ opacity: scrolled ? 0 : 1 }}
        aria-hidden="true"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted">Scroll</span>
        <div className="w-px h-8 bg-foreground/20" />
      </div>
    </section>
  );
}
