"use client";

import { motion, useReducedMotion } from "framer-motion";
import { clipReveal, clipRevealContainer } from "@/lib/motionVariants";
import { hobbyModules } from "@/lib/data";

export default function EnthusiastBento() {
  const shouldReduce = useReducedMotion();
  const revealVariant = shouldReduce ? { hidden: {}, visible: {} } : clipReveal;
  const containerVariant = shouldReduce ? { hidden: {}, visible: {} } : clipRevealContainer;

  return (
    <section
      id="enthusiast"
      aria-label="Enthusiast Pursuits"
      className="px-6 py-24 lg:px-16"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16"
        >
          <motion.p variants={revealVariant} className="text-[10px] tracking-[0.2em] uppercase text-muted mb-3 overflow-hidden">
            The Enthusiast
          </motion.p>
          <motion.h2
            variants={{ ...revealVariant, visible: { ...revealVariant.visible, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 } } }}
            className="font-semibold text-foreground overflow-hidden"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
          >
            Tactile pursuits,
            <br />
            meticulous by nature.
          </motion.h2>
        </motion.div>

        {/* Hobby index — same pattern as work section */}
        <motion.ul
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-16"
        >
          {hobbyModules.map((hobby, i) => (
            <motion.li
              key={hobby.id}
              variants={{ ...revealVariant, visible: { ...revealVariant.visible, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 } } }}
              className="border-t border-border py-5"
            >
              <p className="text-sm font-medium text-foreground mb-1">{hobby.title}</p>
              <p className="text-xs text-muted leading-relaxed">{hobby.descriptor}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
