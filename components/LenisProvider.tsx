"use client";

import { ReactLenis } from "lenis/react";
import React from "react";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.075, duration: 1.8, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
