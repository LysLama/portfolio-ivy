"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin teal scroll progress bar fixed to the top of the viewport.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-gradient-to-r from-teal via-teal-bright to-teal shadow-[0_0_12px_rgba(46,196,182,0.6)]"
      aria-hidden
    />
  );
}
