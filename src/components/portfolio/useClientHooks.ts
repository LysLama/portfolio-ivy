"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";

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
 * SSR-safe version of framer-motion's useReducedMotion.
 *
 * Problem: useReducedMotion() returns `null` on server but `true`/`false` on client.
 * When used in render-time style/prop computation, this causes hydration mismatch.
 *
 * Solution: return `false` on both server AND hydration render, then return the
 * actual value after mount. This ensures server and client initial render match.
 * The value may update post-mount (if user has reduced motion), causing a normal
 * re-render — but NOT a hydration error.
 */
export function useReducedMotionClient(): boolean {
  const isClient = useIsClient();
  const reduce = useReducedMotion();
  // During SSR and hydration: isClient=false → return false (matches server)
  // After mount: isClient=true → return actual reduce value
  return isClient ? Boolean(reduce) : false;
}

export { useIsClient };
