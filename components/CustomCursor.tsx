"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  const dotX = useSpring(mx, { damping: 60, stiffness: 900 });
  const dotY = useSpring(my, { damping: 60, stiffness: 900 });
  const ringX = useSpring(mx, { damping: 28, stiffness: 300 });
  const ringY = useSpring(my, { damping: 28, stiffness: 300 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setVisible(true);

    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };

    const checkHover = (e: MouseEvent) => {
      const target = e.target as Element;
      setHovering(!!target.closest("a, button, [data-hover]"));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", checkHover);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", checkHover);
    };
  }, [mx, my]);

  if (!visible) return null;

  return (
    <>
      {/* Outer ring — lags behind */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998] mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className="rounded-full border border-white"
          animate={{
            width: hovering ? 52 : 36,
            height: hovering ? 52 : 36,
            opacity: hovering ? 0.7 : 0.45,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
      </motion.div>

      {/* Inner dot — snaps instantly */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] mix-blend-difference"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-white"
          animate={{ scale: hovering ? 0 : 1, opacity: hovering ? 0 : 1 }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>
    </>
  );
}
