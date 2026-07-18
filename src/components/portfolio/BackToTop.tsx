"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotionClient } from "./useClientHooks";
import { ArrowUp } from "lucide-react";

/**
 * Floating back-to-top button. Appears after scrolling past ~1 viewport,
 * fades/slides in. Hidden on reduced-motion (still functional, just instant).
 */
export function BackToTop() {
  const reduce = useReducedMotionClient();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > window.innerHeight * 0.9);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () =>
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          onClick={toTop}
          aria-label="Về đầu trang"
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 12 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="group fixed bottom-6 left-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-teal/40 bg-ocean-soft/80 text-teal backdrop-blur-md transition-all duration-300 hover:border-teal hover:bg-teal hover:text-ocean sm:bottom-8 sm:left-8"
        >
          <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          {/* progress ring (decorative) */}
          <span className="pointer-events-none absolute inset-0 rounded-full border border-teal/0 transition-all duration-500 group-hover:scale-110 group-hover:border-teal/30" />
          <span className="pointer-events-none absolute -right-1 -top-1 hidden h-2 w-2 rounded-full bg-teal sm:block" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
