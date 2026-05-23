"use client";

import { motion } from "framer-motion";

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

interface HeaderProps {
  scrolled: boolean;
  isLight: boolean;
  onWorksClick: () => void;
  onContactClick: () => void;
}

export default function Header({ scrolled, isLight, onWorksClick, onContactClick }: HeaderProps) {
  const text   = (a: number) => (isLight ? `rgba(0,0,0,${a})`   : `rgba(255,255,255,${a})`);
  const border = isLight ? "rgba(0,0,0,0.08)"  : "rgba(255,255,255,0.06)";
  const glass  = isLight ? "rgba(248,248,245,0.7)" : "rgba(7,7,9,0.6)";

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-6 py-5"
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE_EXPO, delay: 0.15 }}
    >
      <div
        className="w-full max-w-5xl flex items-center justify-between transition-all duration-500 rounded-full"
        style={
          scrolled
            ? {
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                background: glass,
                border: `1px solid ${border}`,
                padding: "10px 24px",
              }
            : {}
        }
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0 })}
          className="text-label transition-colors duration-300"
          style={{ color: text(0.45) }}
        >
          Anil Unni
        </button>

        {/* Nav */}
        <nav className="flex items-center gap-8">
          <button
            onClick={onWorksClick}
            className="text-label transition-colors duration-300 hover:opacity-80"
            style={{ color: text(0.32) }}
          >
            Works
          </button>
          <button
            onClick={onContactClick}
            className="text-label transition-colors duration-300 hover:opacity-80"
            style={{ color: text(0.32) }}
          >
            Contact
          </button>
        </nav>
      </div>
    </motion.header>
  );
}
