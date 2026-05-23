"use client";

import { useState, useEffect } from "react";

export default function LocalTimeTicker() {
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-2.5 text-label text-white/22">
      <span
        className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
        style={{ opacity: mounted ? 1 : 0.3 }}
      />
      <span>Kerala IND // IST {mounted ? time : "--:--:--"}</span>
    </div>
  );
}
