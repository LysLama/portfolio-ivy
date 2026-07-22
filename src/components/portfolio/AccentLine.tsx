"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * A thin decorative rule that "draws in" from the left (scaleX 0 → 1) when it
 * scrolls into view. A drop-in replacement for the static
 * `<span className="h-px … " />` divider lines used beside section eyebrows.
 *
 * Reduced-motion: renders as a static, fully-drawn line (no animation).
 */
export function AccentLine({
  className = "",
  color = "bg-ocean-line",
}: {
  className?: string;
  color?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(ref.current, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return <span ref={ref} aria-hidden className={`h-px ${color} ${className}`} />;
}
