"use client";

import { motion } from "framer-motion";

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

const DISCIPLINES = [
  {
    id: "01", name: "Engineering",
    summary: "End-to-end system design — database layer to responsive interface.",
    tags: ["Full-Stack Architecture", "Scalable Backends", "Responsive Frontends"],
  },
  {
    id: "02", name: "Leadership",
    summary: "Growing engineers and driving teams toward high-quality outcomes.",
    tags: ["Technical Scoping", "Team Management", "Code Review"],
  },
  {
    id: "03", name: "Toolkit",
    summary: "Modern stack paired with advanced AI-assisted workflows.",
    tags: ["React", "Python", "Node.js", "SQL", "AI Workflows"],
  },
] as const;

export default function Skills() {
  return (
    <section className="h-full bg-void flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-20 pb-10 overflow-hidden">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="flex items-baseline justify-between mb-10 md:mb-14"
      >
        <span className="text-label text-white/28">Disciplines</span>
        <span className="text-label" style={{ color: "rgba(255,255,255,0.1)" }}>03</span>
      </motion.div>

      {/* Rows */}
      <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        {DISCIPLINES.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: EASE_EXPO, delay: 0.1 + i * 0.1 }}
          >
            <div
              className="py-6 md:py-8 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              {/* Left: id + name + summary */}
              <div className="flex items-start gap-5 md:gap-7">
                <span className="text-label shrink-0 mt-0.5" style={{ color: "rgba(255,255,255,0.16)" }}>
                  {d.id}
                </span>
                <div>
                  <h3
                    className="font-display font-light text-white leading-none"
                    style={{ fontSize: "clamp(26px, 3.5vw, 50px)" }}
                  >
                    {d.name}
                  </h3>
                  <p className="text-white/28 text-[12px] md:text-[13px] mt-1.5 max-w-xs leading-relaxed">
                    {d.summary}
                  </p>
                </div>
              </div>

              {/* Right: tags */}
              <div className="flex flex-wrap gap-1.5 pl-10 md:pl-0 md:max-w-[200px] md:justify-end">
                {d.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-label text-white/30 border rounded-full px-2.5 py-1"
                    style={{ borderColor: "rgba(255,255,255,0.08)", fontSize: "9px" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
