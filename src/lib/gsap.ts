"use client";

/**
 * Central GSAP setup — registers every plugin the portfolio uses, once.
 *
 * Import the re-exported `gsap`, plugins, and `useGSAP` from THIS file (never
 * straight from the `gsap` package) so registration is guaranteed to have run.
 * Registration is guarded to the client: GSAP only runs in the browser, so
 * nothing here executes during Next.js SSR.
 *
 * Coexistence note: we deliberately do NOT use ScrollSmoother — native scroll
 * stays intact so Framer Motion's `useScroll` (ScrollProgress, etc.) keeps
 * working alongside ScrollTrigger. See
 * docs/superpowers/specs/2026-07-22-gsap-animation-upgrade-design.md
 */

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Observer } from "gsap/Observer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, Observer);

  // Markers are a dev-only debugging aid; never show them in production.
  ScrollTrigger.defaults({ markers: false });
}

export { gsap, useGSAP, ScrollTrigger, SplitText, Observer };
