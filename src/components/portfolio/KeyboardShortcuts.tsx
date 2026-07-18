"use client";

import { useEffect } from "react";

const SECTIONS = ["intro", "about", "thinking", "work", "heading", "contact"];

/**
 * Global keyboard shortcuts:
 *  - 1..6  → jump to section N
 *  - Home  → top of page
 *  - End   → bottom (contact)
 *  - t     → back to top
 *  - c     → jump to contact
 *  - Esc   → close any open mobile drawer (dispatches custom event)
 *
 * Ignores shortcuts when the user is typing in an input/textarea/contenteditable.
 */
export function KeyboardShortcuts() {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t) {
        const tag = t.tagName;
        if (
          tag === "INPUT" ||
          tag === "TEXTAREA" ||
          tag === "SELECT" ||
          t.isContentEditable
        ) {
          return;
        }
      }
      // ignore if any modifier is held (let browser shortcuts work)
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const go = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      };

      // number keys 1-6
      if (e.key >= "1" && e.key <= "6") {
        const idx = parseInt(e.key, 10) - 1;
        if (SECTIONS[idx]) go(SECTIONS[idx]);
        return;
      }
      if (e.key === "Home") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      if (e.key === "End") {
        go("contact");
        return;
      }
      if (e.key === "Escape") {
        // notify drawer to close
        window.dispatchEvent(new CustomEvent("portfolio:escape"));
        return;
      }
      const k = e.key.toLowerCase();
      if (k === "t") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (k === "c") {
        go("contact");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return null;
}
