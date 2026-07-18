"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotionClient } from "./useClientHooks";

/**
 * A small fixed scroll-depth indicator (bottom-right on desktop).
 * Shows the percentage of the page scrolled, with a circular progress ring.
 * Hidden until user scrolls past ~5% of the page.
 */
export function ReadingProgress() {
  const reduce = useReducedMotionClient();
  const [pct, setPct] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const p = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      const rounded = Math.round(p * 100);
      setPct(rounded);
      setVisible(rounded > 5 && rounded < 99);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Circular ring geometry
  const size = 44;
  const stroke = 3;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (pct / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.6,
        pointerEvents: visible ? "auto" : "none" }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-6 right-6 z-40 hidden items-center justify-center sm:flex sm:bottom-8 sm:right-8"
      aria-label={`Đã đọc ${pct}% trang`}
    >
      <div className="relative flex items-center justify-center">
        <svg
          width={size}
          height={size}
          className="rotate-[-90deg]"
          aria-hidden
        >
          {/* track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(46,196,182,0.15)"
            strokeWidth={stroke}
          />
          {/* progress */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#2EC4B6"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={reduce ? 0 : dashOffset}
            style={{
              transition: reduce ? "none" : "stroke-dashoffset 0.2s ease-out",
              filter: "drop-shadow(0 0 4px rgba(46,196,182,0.4))" }}
          />
        </svg>
        <span className="absolute font-mono text-[0.6rem] font-medium text-teal">
          {pct}
        </span>
      </div>
    </motion.div>
  );
}
