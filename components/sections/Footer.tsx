"use client";

import React from "react";
import LocalTimeTicker from "@/components/ui/LocalTimeTicker";

const FOOTER_LINKS = [
  { href: "https://github.com/anil-unni", label: "GITHUB", isExternal: true },
  { href: "https://linkedin.com/in/anilunni", label: "LINKEDIN", isExternal: true },
  { href: "mailto:anilunni@outlook.com", label: "EMAIL", isExternal: false },
] as const;

/**
 * @component Footer
 * @description Renders copyright terms, framework build attributes, navigation shortcut links,
 * and hosts the performance-optimized LocalTimeTicker.
 */
export default function Footer() {
  return (
    <footer className="relative px-6 md:px-12 lg:px-20 py-12 bg-transparent">
      {/* ── Editorial Blueprint Grids ── */}
      <div className="absolute left-6 md:left-12 lg:left-20 top-0 bottom-0 w-[1px] bg-border/40 pointer-events-none" />
      <div className="absolute right-6 md:right-12 lg:right-20 top-0 bottom-0 w-[1px] bg-border/40 pointer-events-none" />
      <div className="absolute left-6 md:left-12 lg:left-20 right-6 md:right-12 lg:right-20 top-0 h-[1px] bg-border/60 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        {/* Attribution & Copyright */}
        <div className="flex flex-col items-center md:items-start gap-1.5">
          <p className="text-[10px] font-mono text-foreground font-semibold tracking-wider">
            © 2026 ANIL UNNI — ALL SYSTEMS OPERATIONAL
          </p>
          <p className="text-[9px] font-mono text-muted-foreground/60 tracking-wider">
            BUILT WITH NEXT.JS, THREE.JS, AND LENIS SMOOTH SCROLL
          </p>
        </div>

        {/* Time Zone Widget (IST) */}
        <LocalTimeTicker />

        {/* Links list */}
        <div className="flex items-center gap-6 font-mono text-[10px] text-muted-foreground">
          {FOOTER_LINKS.map(({ href, label, isExternal }) => (
            <a
              key={label}
              href={href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="hover:text-foreground transition-colors duration-300 py-1 underline underline-offset-4"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
