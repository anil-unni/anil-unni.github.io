"use client";

import React, { useState, useEffect, useRef } from "react";

// Section component imports
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Work from "@/components/sections/Work";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

/**
 * @component Portfolio
 * @description The main controller page representing the root layout of the portfolio.
 * Manages core settings (dark/light theme, custom scroll events) and sets up the structural
 * layout grid lines, hosting the isolated page section modules.
 */
export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState<boolean>(true);
  const [navScrolled, setNavScrolled] = useState<boolean>(false);

  /* Theme bootstrap on mount */
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = stored ? stored === "dark" : prefersDark;
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  /* Navigation scroll observer */
  useEffect(() => {
    const onScroll = () => {
      setNavScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () =>
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-background text-foreground overflow-hidden"
    >
      {/* ── ARCHITECTURAL GRID SYSTEM (BACKGROUND LAYOUT LINES) ── */}
      <div className="absolute left-6 md:left-12 lg:left-20 top-0 bottom-0 w-[1px] bg-border/20 pointer-events-none z-10" />
      <div className="absolute right-6 md:right-12 lg:right-20 top-0 bottom-0 w-[1px] bg-border/20 pointer-events-none z-10" />

      {/* Navigation Shell */}
      <Header
        isDark={isDark}
        toggleTheme={toggleTheme}
        navScrolled={navScrolled}
      />

      {/* Page Sections */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Work />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
