"use client";

import { motion } from "framer-motion";

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

const PILLARS = [
  { id: "01", title: "Team Leadership",   desc: "Directing high-performance engineering teams from sprint to scale." },
  { id: "02", title: "System Architecture", desc: "Resilient distributed backends built to survive enterprise load."  },
  { id: "03", title: "Product Strategy",  desc: "Bridging engineering precision with outcomes that move the needle." },
] as const;

export default function About() {
  return (
    <section className="h-full bg-chalk flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-20 pb-10 overflow-hidden">

      {/* Eyebrow */}
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: EASE_EXPO, delay: 0.05 }}
        className="block text-label text-black/28 mb-7 md:mb-10"
      >
        Philosophy
      </motion.span>

      {/* Headline — clip reveal */}
      <div style={{ overflow: "hidden" }} className="mb-8 md:mb-12">
        <motion.h2
          initial={{ y: "90%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1.1, ease: EASE_EXPO, delay: 0.1 }}
          className="font-display font-light text-black leading-[0.9] tracking-tight"
          style={{ fontSize: "clamp(40px, 6.5vw, 96px)" }}
        >
          Beyond just
          <br />
          <em>engineering.</em>
        </motion.h2>
      </div>

      {/* Body */}
      <motion.p
        initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.85, ease: EASE_EXPO, delay: 0.25 }}
        className="text-black/42 text-[13px] md:text-[14px] leading-relaxed max-w-md mb-10 md:mb-14"
      >
        I architect digital systems at scale, lead engineering organizations,
        and translate business complexity into elegant software.
      </motion.p>

      {/* Pillars */}
      <div className="border-t" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
        {PILLARS.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: EASE_EXPO, delay: 0.35 + i * 0.08 }}
            className="flex items-baseline gap-5 py-4 md:py-5 border-b"
            style={{ borderColor: "rgba(0,0,0,0.07)" }}
          >
            <span className="text-label text-black/20 shrink-0 w-6">{p.id}</span>
            <div className="flex-1 flex flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
              <h3 className="text-black font-medium text-[13px] md:text-[14px] shrink-0 mb-0.5 sm:mb-0">{p.title}</h3>
              <p className="text-black/36 text-[12px] md:text-[13px] leading-relaxed sm:text-right sm:max-w-sm">{p.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
