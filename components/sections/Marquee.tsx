"use client";

import React from "react";
import { TECHS } from "@/lib/data";

/**
 * @component Marquee
 * @description Creates an infinite horizontal scrolling ticker displaying technical tags.
 * Helps ground the portfolio's aesthetics with standard modern design patterns.
 */
export default function Marquee() {
  // Triple the array elements to ensure it fills widescreen width transitions perfectly.
  const marqueeItems = [...TECHS, ...TECHS, ...TECHS];

  return (
    <div
      className="relative overflow-hidden border-b border-border/20 py-5 bg-card/10 backdrop-blur-sm"
      aria-hidden
    >
      <div className="flex animate-marquee w-max select-none pointer-events-none">
        {marqueeItems.map((tech, i) => (
          <span
            key={i}
            className="mx-8 text-[11px] font-mono uppercase tracking-widest text-muted-foreground/60 whitespace-nowrap flex items-center gap-4"
          >
            {tech}
            <span className="w-1.5 h-1.5 rounded-full bg-primary/40 inline-block" />
          </span>
        ))}
      </div>
    </div>
  );
}
