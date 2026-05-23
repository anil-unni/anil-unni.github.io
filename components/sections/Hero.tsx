"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import RevealText from "@/components/ui/reveal-text";

/**
 * @component Hero
 * @description Renders the hero fold with high-impact typography, introduction details,
 * and a static minimal CSS blueprint ID badge graphic.
 */
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-20 border-b border-border/60"
    >
      {/* ── Editorial Blueprint Grids ── */}
      <div className="absolute left-6 md:left-12 lg:left-20 top-0 bottom-0 w-[1px] bg-border/40 pointer-events-none" />
      <div className="absolute right-6 md:right-12 lg:right-20 top-0 bottom-0 w-[1px] bg-border/40 pointer-events-none" />

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 relative min-h-[calc(100vh-5rem)]">
        {/* Typography Panel (Left side) */}
        <div className="lg:col-span-7 flex flex-col justify-center px-6 md:px-12 lg:px-20 py-16 lg:py-0 relative z-30">
          <div className="max-w-xl">
            {/* Top Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-foreground inline-block" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                LEAD FULL-STACK ENGINEER
              </span>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1
                className="font-display font-light tracking-tight text-foreground leading-[0.8] flex flex-col"
                style={{ fontSize: "clamp(4rem, 11vw, 8.5rem)" }}
              >
                <RevealText delay={0.15}>ANIL</RevealText>
                <RevealText delay={0.3}>UNNI.</RevealText>
              </h1>

              {/* Subheading */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.45 }}
                className="pt-2 flex items-center gap-3"
              >
                <span className="w-8 h-[1px] bg-foreground/60" />
                <span className="font-display text-lg md:text-2xl font-medium italic text-foreground/80">
                  Lead Engineer — Product Builder
                </span>
              </motion.div>
            </div>

            {/* Bio Blurb */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 text-sm md:text-base text-muted-foreground leading-relaxed font-sans font-light"
            >
              I build high-end digital experiences and direct technical teams. Combining an entrepreneurial mindset with strict engineering discipline to deliver robust architectures and highly productive workflows.
            </motion.p>

            {/* Call to Actions */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <a
                href="#works"
                className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-foreground text-background font-mono text-xs tracking-wider uppercase transition-transform hover:scale-[1.02] duration-300"
              >
                View Works
                <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-border hover:border-foreground/45 hover:bg-foreground/5 transition-all duration-300 font-mono text-xs tracking-wider uppercase text-foreground bg-transparent"
              >
                Get in Touch
              </a>
            </motion.div>

            {/* Mini socials / time links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-16 pt-8 border-t border-border/40 flex items-center gap-4 text-xs font-mono text-muted-foreground/60"
            >
              <span>CONNECT:</span>
              {[
                { href: "https://github.com/anil-unni", label: "GITHUB" },
                { href: "https://linkedin.com/in/anilunni", label: "LINKEDIN" },
              ].map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors duration-300 underline underline-offset-4"
                >
                  {label}
                </a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Vertical Grid Partition Line */}
        <div className="hidden lg:block absolute left-[58%] top-0 bottom-0 w-[1px] bg-border/40 z-10 pointer-events-none" />

        {/* ID Badge Panel (Right side) - Static and elegant */}
        <div className="lg:col-span-5 relative border-t border-border/40 lg:border-t-0 bg-transparent z-20 min-h-[500px] lg:min-h-0 w-full flex items-center justify-center py-12 lg:py-0">
          <div className="absolute inset-0 pointer-events-none">
            {/* Visual background blueprint grid details */}
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 opacity-[0.02] pointer-events-none dark:opacity-[0.04]">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className="border-[0.5px] border-foreground" />
              ))}
            </div>
          </div>

          {/* Minimalist Blueprint ID Badge Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-72 border border-foreground/20 bg-card/10 backdrop-blur-md p-6 font-mono text-[9px] relative overflow-hidden"
          >
            {/* Blueprint Coordinate Outlines */}
            <div className="absolute top-2 right-2 text-muted-foreground/30 text-[7px]">
              SYS_REF: IP-77.5
            </div>

            {/* Badge Header */}
            <div className="border-b border-foreground/20 pb-3 mb-4 flex items-center justify-between">
              <span className="font-semibold text-foreground tracking-wider">// ANIL UNNI</span>
              <span className="text-muted-foreground/60">SYS_OPERATIONAL</span>
            </div>

            {/* Emblem/Photo Area */}
            <div className="border border-foreground/15 aspect-[4/3] flex flex-col items-center justify-center relative bg-card/25 p-4 mb-4">
              {/* Corner crosshairs */}
              <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-foreground/30" />
              <div className="absolute top-1 right-1 w-1.5 h-1.5 border-t border-r border-foreground/30" />
              <div className="absolute bottom-1 left-1 w-1.5 h-1.5 border-b border-l border-foreground/30" />
              <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-foreground/30" />

              <span className="font-display text-4xl font-light italic tracking-widest text-foreground/75 not-italic">
                AU
              </span>
              <span className="text-[7px] text-muted-foreground/45 mt-2 tracking-widest uppercase">
                DEPT // LEAD_ENG
              </span>
            </div>

            {/* Badge Metadata Grid */}
            <div className="space-y-2 border-t border-b border-foreground/20 py-3 my-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground/60">ROLE:</span>
                <span className="text-foreground font-semibold">LEAD ENGINEER</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground/60">LOC:</span>
                <span className="text-foreground">KERALA, IND // 9.93N</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground/60">CLASS:</span>
                <span className="text-foreground">PRODUCT BUILDER</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground/60">STATUS:</span>
                <span className="text-foreground font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                  ACTIVE
                </span>
              </div>
            </div>

            {/* Barcode representation */}
            <div className="flex flex-col gap-1 items-center pt-2">
              <div className="w-full h-8 flex justify-between opacity-70">
                {Array.from({ length: 28 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-foreground"
                    style={{
                      width: `${(i % 3 === 0 ? 2 : i % 5 === 0 ? 3 : 1) * 0.7}px`,
                      height: "100%",
                      opacity: i % 7 === 0 ? 0.3 : 1,
                    }}
                  />
                ))}
              </div>
              <span className="text-[6px] tracking-[0.25em] text-muted-foreground/60 mt-1 uppercase">
                * 2 0 2 6 0 5 2 3 *
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-8 left-6 md:left-12 lg:left-20 translate-x-4 flex items-center gap-3 pointer-events-none"
      >
        <span className="text-[8px] font-mono tracking-[0.4em] uppercase text-muted-foreground/60">
          scroll down
        </span>
        <div className="w-12 h-[1px] bg-border/80" />
      </motion.div>
    </section>
  );
}
