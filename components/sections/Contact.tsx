"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { EASE_CUBIC } from "@/components/ui/reveal-text";

const SOCIALS = [
  { href: "https://github.com/anil-unni", icon: FaGithub, label: "GitHub" },
  { href: "https://linkedin.com/in/anilunni", icon: FaLinkedin, label: "LinkedIn" },
] as const;

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 border-b border-border/40">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE_CUBIC }}
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground/60 mb-8 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
            04 — Contact
          </span>

          <h2
            className="font-display font-light italic leading-[0.95] tracking-tight text-foreground mt-6 mb-6"
            style={{ fontSize: "clamp(3rem, 9.5vw, 6.5rem)" }}
          >
            I build solutions
            <br />
            <span className="font-normal not-italic">with meaning.</span>
          </h2>

          <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto leading-relaxed font-light mb-10">
            Open to discussing product strategy, architecture, or technical leadership roles.
          </p>

          <a
            href="mailto:anilunni@outlook.com"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-foreground text-background font-mono text-xs tracking-wider uppercase hover:opacity-90 transition-opacity"
          >
            <FaEnvelope className="w-3.5 h-3.5" />
            anilunni@outlook.com
            <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </a>

          <div className="mt-10 flex items-center justify-center gap-4">
            {SOCIALS.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-3 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all duration-300"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
