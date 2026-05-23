"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_CUBIC } from "@/components/ui/reveal-text";

const DISCIPLINES = [
  {
    id: "01",
    category: "Engineering",
    items: [
      "Full-Stack Architecture",
      "Scalable Backend Systems",
      "Responsive Frontends",
    ],
    desc: "Architecting unified modern ecosystems combining modular frontend engines with microservice-based backend routers and relational data layers.",
  },
  {
    id: "02",
    category: "Leadership",
    items: [
      "Technical Scoping",
      "Team Management",
      "Code Review & Quality Assurance",
    ],
    desc: "Translating complex business criteria into atomic developer tasks, establishing strict quality metrics, and hosting detailed product reviews.",
  },
  {
    id: "03",
    category: "Toolkit",
    items: [
      "React, Python, Node.js, SQL",
      "Advanced AI Workflows (Cursor, MCP, LLM integrations)",
    ],
    desc: "Utilizing state-of-the-art context tools, custom Model Context Protocol (MCP) integrations, and developer environments to ship features with high precision.",
  },
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <section id="areas" className="py-24 md:py-32 border-b border-border/40">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground/60 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
              02 — Capabilities
            </span>
            <h2
              className="font-display font-light text-foreground leading-[1]"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 4rem)" }}
            >
              Disciplines.
            </h2>
            <p className="mt-6 text-sm text-muted-foreground leading-relaxed font-light max-w-xs">
              A technical arsenal and leadership model to guide applications from concept to production.
            </p>
          </div>

          <div className="lg:col-span-8 flex flex-col border-t border-border/40 lg:pl-8">
            {DISCIPLINES.map((disc, index) => {
              const isOpen = activeTab === index;
              return (
                <div key={disc.category} className="border-b border-border/40">
                  <button
                    onClick={() => setActiveTab(isOpen ? -1 : index)}
                    className="w-full flex items-center justify-between py-6 md:py-8 text-left group transition-colors focus:outline-none"
                  >
                    <div className="flex items-center gap-6 md:gap-10">
                      <span className="font-mono text-xs text-muted-foreground/40 group-hover:text-foreground transition-colors duration-300">
                        {disc.id}
                      </span>
                      <h3 className="font-display text-xl md:text-2xl font-light text-foreground group-hover:translate-x-1 transition-transform duration-300">
                        {disc.category}
                      </h3>
                    </div>
                    <div className="relative w-4 h-4 flex items-center justify-center shrink-0">
                      <motion.div
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        transition={{ duration: 0.3, ease: EASE_CUBIC }}
                        className="absolute w-[12px] h-[1px] bg-foreground"
                      />
                      <motion.div
                        animate={{ rotate: isOpen ? 0 : 90 }}
                        transition={{ duration: 0.3, ease: EASE_CUBIC }}
                        className="absolute w-[12px] h-[1px] bg-foreground"
                      />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE_CUBIC }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 pl-12 md:pl-16 pr-4 grid grid-cols-1 md:grid-cols-12 gap-6">
                          <p className="md:col-span-7 text-sm text-muted-foreground leading-relaxed font-light">
                            {disc.desc}
                          </p>
                          <ul className="md:col-span-5 space-y-2 md:pl-6 border-l border-border/40 font-mono text-[10px] tracking-wider text-foreground/70">
                            {disc.items.map((item) => (
                              <li key={item} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-foreground/30 mt-1.5 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
