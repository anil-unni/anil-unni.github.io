"use client";

import { motion } from "framer-motion";

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <section className="relative h-full bg-void flex flex-col px-6 md:px-12 lg:px-20 pt-24 md:pt-28 pb-10 md:pb-14 overflow-hidden">

      {/* Ambient orb */}
      <div
        className="animate-float absolute pointer-events-none rounded-full"
        style={{
          top: "-10%", right: "-10%",
          width: "min(640px, 100vw)", height: "min(640px, 100vw)",
          background: "radial-gradient(circle, rgba(110,85,210,0.13) 0%, transparent 65%)",
          filter: "blur(90px)",
        }}
      />

      {/* ── Zone 2: Name (grows to fill remaining height) ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center">
        <div aria-label="Anil Unni">
          {(["ANIL", "UNNI."] as const).map((word, i) => (
            <div key={word} style={{ overflow: "hidden" }}>
              <motion.h1
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.25, ease: EASE_EXPO, delay: 0.22 + i * 0.13 }}
                className="font-display font-light text-white"
                style={{ fontSize: "clamp(72px, 16.5vw, 240px)", lineHeight: 0.9, letterSpacing: "-0.02em" }}
              >
                {word}
              </motion.h1>
            </div>
          ))}
        </div>
      </div>

      {/* ── Zone 3: Role + CTAs (pinned to bottom) ── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE_EXPO, delay: 0.85 }}
        className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-5 sm:gap-10"
      >
        <p className="text-white/28 leading-snug" style={{ fontSize: "clamp(11px, 1vw, 13px)" }}>
          Lead Full-Stack Engineer
          <br />
          &amp; Product Architect
        </p>

        <div className="flex items-center gap-7">
          {[
            { label: "View Works",   href: "#works"   },
            { label: "Get in Touch", href: "#contact" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="group flex items-center gap-1.5 text-white/30 hover:text-white/75 transition-colors duration-300"
              style={{ fontSize: "clamp(10px, 1vw, 12px)" }}
            >
              <span className="text-label">{label}</span>
              <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" style={{ fontSize: "10px" }}>↗</span>
            </a>
          ))}
        </div>
      </motion.div>

    </section>
  );
}
