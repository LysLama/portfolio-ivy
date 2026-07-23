"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// Client-only mount flag via useSyncExternalStore (no hydration mismatch, no setState-in-effect)
const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true, // client snapshot
    () => false // server snapshot
  );
}

/**
 * Editorial page loader — shows Vy's monogram + a thin progress bar,
 * then slides away. Only shows on first paint, ~1.4s total.
 *
 * Uses useSyncExternalStore to avoid hydration mismatch: server renders
 * null, client renders the loader after hydration.
 */
export function PageLoader() {
  const isClient = useIsClient();
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!isClient || reduce) return;
    if (startedRef.current) return;
    startedRef.current = true;

    // animate progress 0 → 100 over ~1s using timers (setState in timeout is fine)
    let p = 0;
    let timer: number;
    const tick = () => {
      p += Math.random() * 18 + 6;
      if (p >= 100) {
        p = 100;
        setProgress(100);
        timer = window.setTimeout(() => setDone(true), 280);
      } else {
        setProgress(p);
        timer = window.setTimeout(tick, 90 + Math.random() * 70);
      }
    };
    timer = window.setTimeout(tick, 120);
    return () => window.clearTimeout(timer);
  }, [isClient, reduce]);

  // Don't render on server (isClient = false) or if reduced motion preferred
  if (!isClient || reduce) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ocean"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Monogram */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-teal/50"
          >
            <span className="font-anton text-4xl text-teal">V</span>
            <motion.span
              className="absolute inset-0 rounded-full border border-teal"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{ borderTopColor: "transparent", borderBottomColor: "transparent" }}
            />
          </motion.div>

          {/* Name */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-2 font-anton text-xl uppercase tracking-[0.25em] text-offwhite"
          >
            Vy Nguyen
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mb-10 text-[0.6rem] uppercase tracking-[0.3em] text-slate-dim"
          >
            Fresher Planner · Portfolio
          </motion.p>

          {/* Progress bar */}
          <div className="h-px w-48 overflow-hidden bg-ocean-line">
            <motion.div
              className="h-full bg-teal"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-slate-dim"
          >
            {Math.round(progress)}% — Đang mở bản đồ
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
