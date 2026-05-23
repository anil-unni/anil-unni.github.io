"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { PROJECTS } from "@/lib/data";

/**
 * @component Work
 * @description Renders the catalog of selected projects in an impact-focused minimalist editorial list.
 * Includes a premium, high-aesthetic floating preview overlay on desktop viewports.
 */
export default function Work() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section
      id="works"
      className="relative py-24 md:py-32 border-b border-border/60"
    >
      {/* ── Editorial Blueprint Grids ── */}
      <div className="absolute left-6 md:left-12 lg:left-20 top-0 bottom-0 w-[1px] bg-border/40 pointer-events-none" />
      <div className="absolute right-6 md:right-12 lg:right-20 top-0 bottom-0 w-[1px] bg-border/40 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-10 md:px-20 lg:px-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Section Indicator */}
          <div className="lg:col-span-4 flex flex-col justify-start">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground/60 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
              [ 03 // INDEXED WORKS ]
            </span>
            <h2
              className="font-display font-light text-foreground leading-[1]"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 4rem)" }}
            >
              Selected
              <br />
              <span className="italic font-normal">Works.</span>
            </h2>
            <p className="mt-6 text-sm text-muted-foreground leading-relaxed font-sans font-light max-w-xs">
              A highly selective showcase of enterprise architectures, scaling initiatives, and product launches. Hover to reveal complexity matrices.
            </p>
          </div>

          {/* Project List */}
          <div className="lg:col-span-8 flex flex-col border-t border-border/60 lg:pl-8">
            {PROJECTS.map((project, i) => (
              <a
                key={project.id}
                href={project.href}
                onMouseEnter={() => setHoveredProject(i)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group relative flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-border/60 transition-all duration-300"
              >
                {/* Text details */}
                <div className="flex items-start gap-6 md:gap-8 relative z-10 min-w-0 pr-4">
                  <span className="font-mono text-xs text-muted-foreground/40 mt-1 group-hover:text-foreground transition-colors duration-300">
                    {project.id}
                  </span>

                  <div className="min-w-0 space-y-1.5">
                    <div className="flex items-center gap-3">
                      <h3 className="font-display text-xl md:text-2xl font-light text-foreground group-hover:translate-x-1.5 transition-transform duration-300">
                        {project.title}
                      </h3>
                      <span className="font-mono text-[8px] tracking-wider text-muted-foreground/50 border border-border px-1.5 py-0.5 uppercase">
                        {project.category}
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground/80 font-sans font-light max-w-lg leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Right side tag layout and arrow */}
                <div className="flex items-center gap-6 relative z-10 shrink-0 pl-12 md:pl-0 mt-4 md:mt-0 justify-between md:justify-end">
                  <div className="flex items-center gap-1.5 font-mono text-[8px] tracking-wider">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 border border-border text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="relative w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground group-hover:border-foreground group-hover:text-foreground group-hover:bg-foreground/5 transition-all duration-500 overflow-hidden">
                    <motion.div
                      className="absolute"
                      animate={{ x: hoveredProject === i ? 0 : -30 }}
                      initial={{ x: -30 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                      <FaArrowRight className="w-3 h-3 text-foreground" />
                    </motion.div>
                    <motion.div
                      className="absolute"
                      animate={{ x: hoveredProject === i ? 30 : 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                      <FaArrowRight className="w-3 h-3" />
                    </motion.div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
