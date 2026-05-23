"use client";

import { useRef, useState, useCallback } from "react";
import { animate, AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Work from "@/components/sections/Work";
import Contact from "@/components/sections/Contact";
import { scrollToSection } from "@/components/ui/SmoothScroll";

// ── Section registry ───────────────────────────────────────
const SECTIONS = [
  { id: "hero",    bg: "#070709", isLight: false, Component: Hero,    label: ""            },
  { id: "about",   bg: "#F8F8F5", isLight: true,  Component: About,   label: "Philosophy"  },
  { id: "skills",  bg: "#070709", isLight: false,  Component: Skills,  label: "Disciplines" },
  { id: "works",   bg: "#F8F8F5", isLight: true,  Component: Work,    label: "Projects"    },
  { id: "contact", bg: "#070709", isLight: false,  Component: Contact, label: "Contact"     },
];

const TOTAL = SECTIONS.length;
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const WIPE_DUR = 0.88;

// Clip-path constants
const HIDDEN_ABOVE = "inset(100% 0 0 0)"; // completely hidden — top clip 100%
const VISIBLE      = "inset(0% 0 0 0)";   // fully revealed
const HIDDEN_BELOW = "inset(0 0 100% 0)"; // completely hidden — bottom clip 100%

export default function Portfolio() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeRef = useRef(0);
  const bgRefs    = useRef<(HTMLDivElement | null)[]>(Array(TOTAL).fill(null));
  const bgAnims   = useRef<Map<number, { stop: () => void }>>(new Map());
  const snapping  = useRef(false); // true while Lenis is snapping — throttles scroll events

  const { scrollY } = useScroll();

  const stopBgAnim = useCallback((idx: number) => {
    bgAnims.current.get(idx)?.stop();
    bgAnims.current.delete(idx);
  }, []);

  const doTransition = useCallback((next: number) => {
    const prev = activeRef.current;
    if (next === prev) return;

    activeRef.current = next;
    setActiveIdx(next);

    const prevBg = bgRefs.current[prev];
    const nextBg = bgRefs.current[next];
    const dir    = next > prev ? 1 : -1;

    if (dir > 0) {
      // DOWN — next bg wipes in from bottom
      stopBgAnim(next);
      if (nextBg) {
        bgAnims.current.set(
          next,
          animate(nextBg, { clipPath: [HIDDEN_ABOVE, VISIBLE] }, { duration: WIPE_DUR, ease: EASE }),
        );
      }
    } else {
      // UP — prev bg wipes out downward, revealing the section below
      stopBgAnim(prev);
      if (prevBg) {
        bgAnims.current.set(
          prev,
          animate(prevBg, { clipPath: [VISIBLE, HIDDEN_BELOW] }, {
            duration: WIPE_DUR,
            ease: EASE,
            onComplete: () => {
              if (prevBg) prevBg.style.clipPath = HIDDEN_ABOVE;
            },
          }),
        );
      }
    }

    // Snap scroll to the exact section boundary (like the CodePen's lenis.scrollTo)
    snapping.current = true;
    scrollToSection(next * window.innerHeight);
    // Release the throttle after the wipe finishes
    setTimeout(() => { snapping.current = false; }, WIPE_DUR * 1000 + 200);
  }, [stopBgAnim]);

  // Track scroll → fire clip-path transition at each section boundary
  useMotionValueEvent(scrollY, "change", (y) => {
    if (snapping.current) return; // ignore events while we're snapping
    const vh      = window.innerHeight;
    const section = Math.floor((y + vh * 0.4) / vh);
    const clamped = Math.min(Math.max(section, 0), TOTAL - 1);
    if (clamped !== activeRef.current) doTransition(clamped);
  });

  // Programmatic nav (header / nav dots)
  const navigateTo = useCallback((idx: number) => {
    doTransition(idx);
  }, [doTransition]);

  const isLight       = SECTIONS[activeIdx].isLight;
  const ActiveSection = SECTIONS[activeIdx].Component;
  const dotActive     = isLight ? "rgba(0,0,0,0.55)"  : "rgba(255,255,255,0.65)";
  const dotInactive   = isLight ? "rgba(0,0,0,0.18)"  : "rgba(255,255,255,0.18)";
  const labelColor    = isLight ? "rgba(0,0,0,0.32)"  : "rgba(255,255,255,0.32)";
  const counterColor  = isLight ? "rgba(0,0,0,0.18)"  : "rgba(255,255,255,0.15)";

  return (
    // Tall scroll track — gives the browser a scroll distance to work with
    <div style={{ height: `${TOTAL * 100}vh`, position: "relative" }}>

      {/* Invisible snap targets — CSS scroll-snap uses these on mobile */}
      {SECTIONS.map((_, i) => (
        <div
          key={`snap-${i}`}
          className="scroll-snap-target"
          style={{ position: "absolute", top: `${i * 100}vh`, height: "100vh", width: "100%" }}
        />
      ))}

      {/* Sticky viewport — always visible at the top, clip-path wipes render inside */}
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>

        {/* ── Background layers (stacked by z-index, each GPU-accelerated) ── */}
        {SECTIONS.map(({ bg }, i) => (
          <div
            key={i}
            ref={(el) => { bgRefs.current[i] = el; }}
            style={{
              position: "absolute",
              inset: 0,
              background: bg,
              zIndex: i + 1,
              clipPath: i === 0 ? VISIBLE : HIDDEN_ABOVE,
              willChange: "clip-path",
              transform: "translateZ(0)", // force GPU layer
            }}
          />
        ))}

        {/* ── Active section content ── */}
        <div style={{ position: "absolute", inset: 0, zIndex: 50 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ height: "100%" }}
            >
              <ActiveSection />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Header ── */}
        <Header
          scrolled={activeIdx > 0}
          isLight={isLight}
          onWorksClick={() => navigateTo(3)}
          onContactClick={() => navigateTo(4)}
        />

        {/* ── Nav dots (right edge, hidden on mobile) ── */}
        <nav
          className="fixed right-5 md:right-7 top-1/2 -translate-y-1/2 z-[200] hidden md:flex flex-col gap-3"
          aria-label="Section navigation"
        >
          {SECTIONS.map(({ id, label }, i) => {
            const active = i === activeIdx;
            return (
              <button
                key={id}
                onClick={() => navigateTo(i)}
                aria-label={label || "Home"}
                className="group flex items-center justify-end gap-2.5"
              >
                <span
                  className={`text-label transition-all duration-300 ${
                    active ? "opacity-100" : "opacity-0 group-hover:opacity-70"
                  }`}
                  style={{ fontSize: "9px", color: labelColor }}
                >
                  {label}
                </span>
                <div
                  className="rounded-full transition-all duration-[400ms]"
                  style={{
                    background: active ? dotActive : dotInactive,
                    width:  active ? "3px"  : "2px",
                    height: active ? "20px" : "6px",
                  }}
                />
              </button>
            );
          })}
        </nav>

        {/* ── Section counter (bottom-left, hidden on mobile) ── */}
        <div
          className="fixed bottom-6 left-6 md:left-12 z-[200] text-label hidden md:block"
          style={{ color: counterColor }}
        >
          {String(activeIdx + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
        </div>

      </div>
    </div>
  );
}
