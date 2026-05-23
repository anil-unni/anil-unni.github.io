"use client";

import React from "react";

import { motion } from "framer-motion";
import { EASE_CUBIC } from "@/components/ui/reveal-text";

const PHILOSOPHY_METRICS = [
  { id: "01", label: "Team Leadership", desc: "Directing high-performance engineering groups, facilitating mentorship, and optimizing technical execution pipelines." },
  { id: "02", label: "Enterprise Architecture", desc: "Designing highly resilient backend networks, database modeling, and scalable modern web applications." },
  { id: "03", label: "Product Strategy", desc: "Bridging the gap between software specifications and strategic commercial value to deliver memorable products." },
] as const;

/**
 * @component About
 * @description Renders the Philosophy & Mindset section detailing the tech lead perspective and core pillars.
 */
export default function About() {
  return (
    <section id="philosophy" className="relative py-24 md:py-32 border-b border-border/60">
      {/* ── Editorial Blueprint Grids ── */}
      <div className="absolute left-6 md:left-12 lg:left-20 top-0 bottom-0 w-[1px] bg-border/40 pointer-events-none" />
      <div className="absolute right-6 md:right-12 lg:right-20 top-0 bottom-0 w-[1px] bg-border/40 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-10 md:px-20 lg:px-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Section Indicator */}
          <div className="lg:col-span-5 flex flex-col">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground/60 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
              [ 01 // PHILOSOPHY & MINDSET ]
            </span>
            <h2
              className="font-display font-light text-foreground leading-[1] text-balance"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 4rem)" }}
            >
              Beyond just <span className="italic font-normal">code.</span>
            </h2>
          </div>

          {/* About details */}
          <div className="lg:col-span-7 space-y-8">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: EASE_CUBIC }}
              className="text-base md:text-lg text-foreground/80 leading-relaxed font-sans font-light max-w-2xl"
            >
              As a tech lead, my focus extends past writing clean code. I bridge the gap between complex engineering and business value. I specialize in directing development teams, establishing high-productivity agentic workflows, and architecting scalable enterprise systems from the ground up.
            </motion.p>
          </div>
        </div>

        {/* Tabular Stats Grid (Editorial blueprint line boundaries) */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-border/60 mt-20 relative bg-transparent overflow-hidden">
          {/* Outer Border Lines */}
          <div className="absolute top-0 bottom-0 left-1/3 w-[1px] bg-border/60 hidden md:block" />
          <div className="absolute top-0 bottom-0 left-2/3 w-[1px] bg-border/60 hidden md:block" />

          {PHILOSOPHY_METRICS.map(({ id, label, desc }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.7, ease: EASE_CUBIC }}
              className={`py-8 md:py-12 flex flex-col justify-start relative border-b border-border/60 md:border-b-0 ${
                index > 0 ? "md:pl-10 lg:pl-12" : "md:pr-10 lg:pr-12"
              } ${index === 1 ? "md:px-10 lg:px-12" : ""}`}
            >
              <div className="font-mono text-[10px] text-muted-foreground/50 tracking-wider mb-4">
                // {id}
              </div>
              <h3 className="font-display text-xl md:text-2xl font-light text-foreground mb-4">
                {label}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed font-sans font-light">
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
