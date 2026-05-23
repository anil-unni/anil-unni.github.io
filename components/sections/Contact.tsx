"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import LocalTimeTicker from "@/components/ui/LocalTimeTicker";

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

const SOCIALS = [
  { href: "https://github.com/anil-unni",       icon: FaGithub,   label: "GitHub"   },
  { href: "https://linkedin.com/in/anilunni",   icon: FaLinkedin, label: "LinkedIn" },
] as const;

export default function Contact() {
  return (
    <section className="relative h-full bg-void flex flex-col justify-between px-6 md:px-12 lg:px-20 pt-20 pb-8 overflow-hidden">

      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none animate-glow-pulse"
        style={{
          top: "40%", left: "35%",
          transform: "translate(-50%,-50%)",
          width: "min(700px,90vw)", height: "min(700px,90vw)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(100,80,200,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* ── Main CTA ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="block text-label text-white/28 mb-8 md:mb-12"
        >
          Available for opportunities
        </motion.span>

        <div style={{ overflow: "hidden" }}>
          <motion.h2
            initial={{ y: "75%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.15, ease: EASE_EXPO, delay: 0.1 }}
            className="font-display font-light text-white leading-[0.88] tracking-tight"
            style={{ fontSize: "clamp(44px, 9vw, 138px)" }}
          >
            Let's build
            <br />
            something
            <br />
            <em className="text-white/28">great.</em>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: EASE_EXPO, delay: 0.3 }}
          className="mt-10 md:mt-14 flex flex-wrap items-center gap-5"
        >
          {/* Email */}
          <a
            href="mailto:anilunni@outlook.com"
            className="group inline-flex items-center gap-3 border rounded-full px-6 py-3.5 text-white/55 hover:text-white text-[12px] md:text-[13px] transition-all duration-300 hover:bg-white/4"
            style={{ borderColor: "rgba(255,255,255,0.12)" }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m2 7 10 6 10-6" />
            </svg>
            <span>anilunni@outlook.com</span>
            <span className="group-hover:translate-x-0.5 transition-transform duration-300 opacity-40 text-[10px]">↗</span>
          </a>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-full border flex items-center justify-center text-white/38 hover:text-white/85 transition-all duration-300"
                style={{ borderColor: "rgba(255,255,255,0.09)" }}
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Footer bar (bottom) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-6 border-t shrink-0"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <span className="text-label text-white/18">© {new Date().getFullYear()} Anil Unni</span>

        <LocalTimeTicker />

        <div className="flex items-center gap-6">
          {[
            { href: "https://github.com/anil-unni",     label: "GitHub"   },
            { href: "https://linkedin.com/in/anilunni", label: "LinkedIn" },
            { href: "mailto:anilunni@outlook.com",      label: "Email"    },
          ].map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target={label !== "Email" ? "_blank" : undefined}
              rel={label !== "Email" ? "noopener noreferrer" : undefined}
              className="text-label text-white/20 hover:text-white/55 transition-colors duration-300"
            >
              {label}
            </a>
          ))}
        </div>
      </motion.div>

    </section>
  );
}
