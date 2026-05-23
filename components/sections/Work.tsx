"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { PROJECTS } from "@/lib/data";
import { EASE_CUBIC } from "@/components/ui/reveal-text";

export default function Work() {
  return (
    <section id="works" className="py-24 md:py-32 border-b border-border/40">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground/60 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
              03 — Work
            </span>
            <h2
              className="font-display font-light text-foreground leading-[1]"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 4rem)" }}
            >
              Selected
              <br />
              <span className="italic font-normal">Works.</span>
            </h2>
            <p className="mt-6 text-sm text-muted-foreground leading-relaxed font-light max-w-xs">
              A selective showcase of enterprise architectures, scaling initiatives, and product launches.
            </p>
          </div>

          <div className="lg:col-span-8 flex flex-col border-t border-border/40 lg:pl-8">
            {PROJECTS.map((project, i) => (
              <motion.a
                key={project.id}
                href={project.href}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: EASE_CUBIC }}
                className="group flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-border/40 transition-all duration-300"
              >
                <div className="flex items-start gap-6 md:gap-8 min-w-0 pr-4">
                  <span className="font-mono text-xs text-muted-foreground/40 mt-1 group-hover:text-foreground transition-colors duration-300 shrink-0">
                    {project.id}
                  </span>
                  <div className="min-w-0 space-y-1.5">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-display text-xl md:text-2xl font-light text-foreground group-hover:translate-x-1.5 transition-transform duration-300">
                        {project.title}
                      </h3>
                      <span className="font-mono text-[8px] tracking-wider text-muted-foreground/50 border border-border px-1.5 py-0.5 uppercase">
                        {project.category}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground/80 font-light max-w-lg leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 pl-12 md:pl-0 mt-4 md:mt-0 justify-between md:justify-end">
                  <div className="flex items-center gap-1.5 font-mono text-[8px] tracking-wider flex-wrap">
                    {project.tech.map((t) => (
                      <span key={t} className="px-2 py-0.5 border border-border text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground group-hover:border-foreground group-hover:text-foreground transition-all duration-300">
                    <FaArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
