"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useReducedMotionClient } from "./useClientHooks";

type AnimatedCounterProps = {
  /** The raw value string, e.g. "19", "60%", "~1 tỷ", "24.7M" */
  value: string;
  className?: string;
  /** Duration in ms */
  duration?: number;
};

/**
 * Parses a metric string into a numeric target + prefix + suffix,
 * then animates the number from 0 → target when scrolled into view.
 *
 * Supported patterns:
 *   "19"        → 0..19
 *   "60%"       → 0..60 + "%"
 *   "~1 tỷ"     → "~1 tỷ" (non-numeric, shown as-is, no animation)
 *   "24.7M"     → 0..24.7 + "M"
 *   "4 ngày"    → 0..4 + " ngày"
 *   "67.6%"     → 0..67.6 + "%"
 */
export function AnimatedCounter({
  value,
  className,
  duration = 1400 }: AnimatedCounterProps) {
  const reduce = useReducedMotionClient();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px -60px 0px" });

  // Parse the value — derived values (React Compiler auto-memoizes)
  const match = value.match(/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/);
  const isNumeric = Boolean(match);
  const prefix = match?.[1] ?? "";
  const target = match ? parseFloat(match[2]) : 0;
  const suffix = match?.[3] ?? "";
  const hasDecimal = match ? match[2].includes(".") : false;

  const [animatedVal, setAnimatedVal] = useState<number | null>(null);

  useEffect(() => {
    if (!isNumeric) return;
    if (!inView) return;
    // Reduced motion: skip animation, show final value immediately
    if (reduce) {
      setAnimatedVal(target);
      return;
    }
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      const current = target * eased;
      setAnimatedVal(current);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setAnimatedVal(target);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, isNumeric, target, duration, reduce]);

  // Compute the display string
  let display = value;
  if (isNumeric) {
    if (animatedVal === null) {
      display = `${prefix}0${suffix}`;
    } else {
      const rounded = hasDecimal
        ? animatedVal.toFixed(1)
        : Math.round(animatedVal).toString();
      display = `${prefix}${rounded}${suffix}`;
    }
  }

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
