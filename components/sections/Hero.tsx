"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import RevealText from "@/components/ui/reveal-text";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-20 border-b border-border/40"
    >
      <div className="w-full px-6 md:px-12 lg:px-20 py-16">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-foreground inline-block" />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              Lead Full-Stack Engineer
            </span>
          </motion.div>

          <h1
            className="font-display font-light tracking-tight text-foreground leading-[0.85]"
            style={{ fontSize: "clamp(4rem, 12vw, 9rem)" }}
          >
            <RevealText delay={0.15}>ANIL</RevealText>
            <RevealText delay={0.3}>UNNI.</RevealText>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-4 flex items-center gap-3"
          >
            <span className="w-8 h-[1px] bg-foreground/60" />
            <span className="font-display text-xl md:text-2xl font-medium italic text-foreground/70">
              Lead Engineer — Product Builder
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="mt-8 text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl"
          >
            I build high-end digital experiences and direct technical teams — combining an entrepreneurial mindset with strict engineering discipline.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#works"
              className="group inline-flex items-center gap-3 px-7 py-3 rounded-full bg-foreground text-background font-mono text-xs tracking-wider uppercase hover:opacity-90 transition-opacity"
            >
              View Works
              <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center px-7 py-3 rounded-full border border-border hover:border-foreground/40 font-mono text-xs tracking-wider uppercase transition-colors"
            >
              Get in Touch
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
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
                className="hover:text-foreground transition-colors underline underline-offset-4"
              >
                {label}
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-6 md:left-12 lg:left-20 flex items-center gap-3 pointer-events-none"
      >
        <span className="text-[8px] font-mono tracking-[0.4em] uppercase text-muted-foreground/50">
          scroll
        </span>
        <div className="w-10 h-[1px] bg-border/60" />
      </motion.div>
    </section>
  );
}
