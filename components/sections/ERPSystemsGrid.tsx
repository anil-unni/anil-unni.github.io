"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { clipReveal, clipRevealContainer } from "@/lib/motionVariants";
import { erpTiles } from "@/lib/data";

export default function ERPSystemsGrid() {
  const shouldReduce = useReducedMotion();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const revealVariant = shouldReduce ? { hidden: {}, visible: {} } : clipReveal;
  const containerVariant = shouldReduce ? { hidden: {}, visible: {} } : clipRevealContainer;

  return (
    <section
      id="work"
      aria-label="Systems & ERP Engineering"
      className="px-6 py-24 lg:px-16"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16 overflow-hidden"
        >
          <motion.p
            variants={revealVariant}
            className="text-[10px] tracking-[0.2em] uppercase text-muted mb-3"
          >
            Selected Work
          </motion.p>
          <motion.h2
            variants={{ ...revealVariant, visible: { ...revealVariant.visible, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 } } }}
            className="text-foreground font-semibold"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
          >
            Enterprise-grade abstractions,
            <br />
            built for scale.
          </motion.h2>
        </motion.div>

        {/* Index list */}
        <motion.ul
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          aria-label="ERP projects"
        >
          {erpTiles.map((tile, i) => (
            <motion.li
              key={tile.id}
              variants={{ ...revealVariant, visible: { ...revealVariant.visible, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 } } }}
              onMouseEnter={() => !isTouch && setHoveredId(tile.id)}
              onMouseLeave={() => !isTouch && setHoveredId(null)}
              className="border-t border-border"
            >
              <div className="flex items-baseline gap-6 py-5">
                {/* Index */}
                <span className="font-mono text-[11px] text-muted w-6 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Title + descriptor */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span className="text-base font-medium text-foreground">{tile.title}</span>
                    <div className="flex flex-wrap gap-1.5">
                      {tile.icon && (
                        <span className="border border-border px-1.5 py-0.5 text-[10px] text-muted font-mono">
                          {tile.icon}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Touch: always visible. Desktop: reveal on hover. */}
                  {isTouch ? (
                    <p className="mt-2 text-xs text-muted leading-relaxed">{tile.descriptor}</p>
                  ) : (
                    <AnimatePresence>
                      {hoveredId === tile.id && (
                        <motion.p
                          key="desc"
                          initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
                          animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
                          exit={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="mt-2 text-xs text-muted leading-relaxed"
                        >
                          {tile.descriptor}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  )}
                </div>

                {/* Metric */}
                {tile.metric && (
                  <span className="shrink-0 font-mono text-[11px] text-muted text-right hidden sm:block">
                    {tile.metric}
                  </span>
                )}
              </div>
            </motion.li>
          ))}
          {/* Closing rule */}
          <li className="border-t border-border" aria-hidden="true" />
        </motion.ul>
      </div>
    </section>
  );
}
