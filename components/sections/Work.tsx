"use client";

import { motion } from "framer-motion";
import { PROJECTS } from "@/lib/data";

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

export default function Work() {
  return (
    <section className="h-full bg-chalk flex flex-col px-6 md:px-12 lg:px-20 pt-20 pb-10 overflow-hidden">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: EASE_EXPO, delay: 0.05 }}
        className="mb-8 md:mb-10 shrink-0"
      >
        <span className="text-label text-black/28">Selected Works</span>
        <div style={{ overflow: "hidden" }} className="mt-3">
          <motion.h2
            initial={{ y: "85%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.0, ease: EASE_EXPO, delay: 0.1 }}
            className="font-display font-light text-black leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(36px, 5.5vw, 80px)" }}
          >
            Projects.
          </motion.h2>
        </div>
      </motion.div>

      {/* Project rows — flex-1 so they fill remaining height */}
      <div className="flex-1 flex flex-col justify-evenly border-t" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
        {PROJECTS.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.85, ease: EASE_EXPO, delay: 0.2 + i * 0.09 }}
            className="group border-b"
            style={{ borderColor: "rgba(0,0,0,0.07)" }}
          >
            <a
              href={project.href || "#"}
              className="flex items-center gap-5 md:gap-7 py-4 md:py-5"
            >
              {/* Number */}
              <span className="text-label text-black/20 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Info */}
              <div className="flex-1 min-w-0 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <h3
                      className="font-display font-light text-black group-hover:text-black/55 transition-colors duration-300 truncate"
                      style={{ fontSize: "clamp(18px, 2.2vw, 30px)" }}
                    >
                      {project.title}
                    </h3>
                    <span className="text-label text-black/25 shrink-0">{project.category}</span>
                  </div>
                  <p className="text-black/36 text-[12px] md:text-[13px] mt-1 leading-snug line-clamp-1 max-w-lg">
                    {project.description}
                  </p>
                </div>

                {/* Arrow */}
                <span
                  className="text-black/22 group-hover:text-black/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0"
                  style={{ fontSize: "16px" }}
                >
                  ↗
                </span>
              </div>
            </a>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
