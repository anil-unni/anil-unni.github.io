"use client";

import { ReactLenis } from "lenis/react";
import React from "react";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.6, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
