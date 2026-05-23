"use client";

import React from "react";
import { motion } from "framer-motion";
import { EASE_CUBIC } from "@/components/ui/reveal-text";

const PILLARS = [
  {
    id: "01",
    label: "Team Leadership",
    desc: "Directing high-performance engineering groups, facilitating mentorship, and optimizing technical execution pipelines.",
  },
  {
    id: "02",
    label: "Enterprise Architecture",
    desc: "Designing highly resilient backend networks, database modeling, and scalable modern web applications.",
  },
  {
    id: "03",
    label: "Product Strategy",
    desc: "Bridging the gap between software specifications and strategic commercial value to deliver memorable products.",
  },
] as const;

export default function About() {
  return (
    <section id="philosophy" className="py-24 md:py-32 border-b border-border/40">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground/60 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
              01 — Philosophy
            </span>
            <h2
              className="font-display font-light text-foreground leading-[1] text-balance"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 4rem)" }}
            >
              Beyond just{" "}
              <span className="italic font-normal">code.</span>
            </h2>
          </div>

          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: EASE_CUBIC }}
              className="text-base md:text-lg text-foreground/80 leading-relaxed font-light max-w-2xl"
            >
              As a tech lead, my focus extends past writing clean code. I bridge the gap between complex engineering and business value — specializing in directing development teams, establishing high-productivity workflows, and architecting scalable enterprise systems.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/40 border-t border-border/40 mt-20">
          {PILLARS.map(({ id, label, desc }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.6, ease: EASE_CUBIC }}
              className="py-10 md:px-10 first:md:pl-0 last:md:pr-0"
            >
              <div className="font-mono text-[10px] text-muted-foreground/40 tracking-wider mb-4">
                {id}
              </div>
              <h3 className="font-display text-xl font-light text-foreground mb-3">
                {label}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
