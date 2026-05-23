"use client";

import React, { useState, useEffect } from "react";

/**
 * @component LocalTimeTicker
 * @description A performance-isolated, hydration-safe clock ticker.
 * Updates local time (IST) in Kerala, India every second. By encapsulating this
 * state internally, we prevent the entire main portfolio page from re-rendering
 * on every clock tick.
 */
export default function LocalTimeTicker() {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setCurrentTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted || !currentTime) {
    return (
      <div className="flex items-center gap-2.5 px-3 py-1.5 border border-border/30 rounded-full bg-card/20 backdrop-blur-sm font-mono text-[9px] tracking-widest text-muted-foreground/80 uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/40" />
        KERALA IND // IST --:--:--
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2.5 px-3 py-1.5 border border-border/30 rounded-full bg-card/20 backdrop-blur-sm font-mono text-[9px] tracking-widest text-muted-foreground/80 uppercase">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      KERALA IND // IST {currentTime}
    </div>
  );
}
