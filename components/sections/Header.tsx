"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";

interface HeaderProps {
  /** Current active theme state (dark/light) */
  isDark: boolean;
  /** Callback to trigger theme change */
  toggleTheme: () => void;
  /** Whether the user has scrolled past a specific vertical offset */
  navScrolled: boolean;
}

const NAV_LINKS = ["Philosophy", "Areas", "Works", "Contact"] as const;

/**
 * @component Header
 * @description Renders the global navigation header containing navigation anchors
 * and the animated dark/light theme switch button.
 */
export default function Header({ isDark, toggleTheme, navScrolled }: HeaderProps) {
  return (
    <header
      className={`fixed inset-x-0 top-0 z-[200] transition-all duration-500 ${
        navScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 py-4"
          : "py-6"
      }`}
    >
      <nav className="flex items-center justify-between px-6 md:px-12 lg:px-20">
        <a
          href="#"
          className="text-xs font-mono tracking-[0.25em] uppercase font-bold text-foreground transition-opacity hover:opacity-75"
        >
          ANIL UNNI // PORTFOLIO
        </a>

        <div className="flex items-center gap-8">
          {/* Navigation Anchors */}
          <div className="hidden md:flex items-center gap-8 text-[11px] font-mono tracking-widest uppercase">
            {NAV_LINKS.map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                className="hover:text-foreground/60 transition-colors duration-300 relative group py-1 text-foreground"
              >
                {label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-foreground transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Theme Toggle Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all duration-300 bg-card/25 backdrop-blur-sm"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isDark ? "sun" : "moon"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  {isDark ? (
                    <FaSun className="w-3.5 h-3.5 text-amber-400" />
                  ) : (
                    <FaMoon className="w-3.5 h-3.5" />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
