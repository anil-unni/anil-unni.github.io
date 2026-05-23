"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Module-level ref so page.tsx can call scrollToSection without prop-drilling
let _lenis: Lenis | null = null;

export function scrollToSection(targetY: number) {
  if (_lenis) {
    _lenis.scrollTo(targetY, {
      duration: 1.0,
      // easeOutExpo — matches clip-path ease
      easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    });
  } else {
    window.scrollTo({ top: targetY });
  }
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Touch devices use native scroll — Lenis would fight the OS scroll physics
    const isTouch =
      "ontouchstart" in window ||
      window.matchMedia("(pointer: coarse)").matches;

    if (isTouch) return;

    _lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      _lenis?.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      _lenis?.destroy();
      _lenis = null;
    };
  }, []);

  return <>{children}</>;
}
