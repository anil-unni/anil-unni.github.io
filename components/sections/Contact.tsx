"use client";

import React from "react";
import { FaArrowRight, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

const SOCIALS = [
  { href: "https://github.com/anil-unni", icon: FaGithub, label: "GitHub" },
  { href: "https://linkedin.com/in/anilunni", icon: FaLinkedin, label: "LinkedIn" },
] as const;

/**
 * @component Contact
 * @description Renders a high-impact contact CTA card containing details for project inquiries,
 * full-stack hiring, and standard social media links.
 */
export default function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32 border-b border-border/60 bg-transparent">
      {/* ── Editorial Blueprint Grids ── */}
      <div className="absolute left-6 md:left-12 lg:left-20 top-0 bottom-0 w-[1px] bg-border/40 pointer-events-none" />
      <div className="absolute right-6 md:right-12 lg:right-20 top-0 bottom-0 w-[1px] bg-border/40 pointer-events-none" />

      <div className="w-full text-center relative max-w-3xl mx-auto px-6">
        {/* Absolute aesthetic matrix details */}
        <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground/60 mb-6 flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
          [ 04 // INBOX DIRECTORY ]
        </div>

        <div className="overflow-hidden mt-6 mb-6">
          <h2
            className="font-display font-light italic leading-[0.95] tracking-tight text-foreground"
            style={{ fontSize: "clamp(3rem, 9.5vw, 6.5rem)" }}
          >
            LET'S BUILD
            <br />
            SOMETHING
            <br />
            <span className="font-normal not-italic">MEMORABLE.</span>
          </h2>
        </div>

        <p className="text-sm md:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed font-sans font-light mb-10">
          Always open to discussing innovative product strategy, architecture, or technical leadership roles. Let's connect.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:anilunni@outlook.com"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-foreground text-background font-mono text-xs tracking-wider uppercase transition-transform hover:scale-[1.02] duration-300"
          >
            <FaEnvelope className="w-4 h-4" />
            anilunni@outlook.com
            <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="mt-12 flex items-center justify-center gap-4">
          {SOCIALS.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-3.5 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 hover:bg-card/25 transition-all duration-300"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
