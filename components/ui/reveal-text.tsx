"use client";

import React from "react";
import { motion } from "framer-motion";

interface RevealTextProps {
  children: string;
  delay?: number;
}

const EASE_CUBIC = [0.16, 1, 0.3, 1] as const;

/**
 * @component RevealText
 * @description Animates text upwards from an overflow-hidden wrapper, creating
 * an elegant typography entrance effect commonly seen on high-end Awwwards websites.
 */
export default function RevealText({ children, delay = 0 }: RevealTextProps) {
  return (
    <span className="inline-block overflow-hidden py-1">
      <motion.span
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: EASE_CUBIC }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}
export { EASE_CUBIC };
