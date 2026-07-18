"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Check } from "lucide-react";

const SECTIONS = [
  { id: "intro", label: "Intro" },
  { id: "about", label: "About" },
  { id: "thinking", label: "How I Think" },
  { id: "work", label: "Case Studies" },
  { id: "heading", label: "Where I'm Heading" },
  { id: "contact", label: "Let's Talk" },
];

/**
 * Fixed vertical section indicator on the right side (desktop only).
 * Shows a dot per section; the active one expands into a pill with the label.
 * Includes a share button at the bottom that copies the current section URL.
 */
export function SectionIndicator() {
  const [active, setActive] = useState("intro");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const share = async () => {
    const url = `${window.location.origin}/#${active}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Nguyễn Ngọc Tường Vy — Portfolio",
          text: "Xem portfolio của Vy Nguyen",
          url,
        });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // user cancelled share or clipboard failed — silent
    }
  };

  return (
    <div
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 xl:flex"
      aria-label="Điều hướng section"
    >
      {SECTIONS.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            onClick={() => go(s.id)}
            className="group flex items-center gap-3"
            aria-label={`Đi tới ${s.label}`}
            aria-current={isActive ? "true" : undefined}
          >
            <AnimatePresence>
              {isActive && (
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                  className="font-anton text-[0.65rem] uppercase tracking-[0.2em] text-offwhite"
                >
                  {s.label}
                </motion.span>
              )}
            </AnimatePresence>
            <span className="relative flex h-3 items-center">
              <span
                className={`block rounded-full transition-all duration-400 ${
                  isActive
                    ? "h-1.5 w-7 bg-teal"
                    : "h-1.5 w-1.5 bg-slate-dim group-hover:bg-teal"
                }`}
                style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
              />
            </span>
          </button>
        );
      })}

      {/* divider + share button */}
      <span className="mt-2 h-px w-8 bg-ocean-line" />
      <button
        onClick={share}
        className="group flex items-center gap-3"
        aria-label="Chia sẻ section này"
      >
        <AnimatePresence>
          {copied && (
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className="font-anton text-[0.6rem] uppercase tracking-[0.2em] text-teal"
            >
              Đã copy!
            </motion.span>
          )}
        </AnimatePresence>
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-ocean-line bg-ocean-soft/60 text-slate transition-all duration-300 group-hover:border-teal group-hover:text-teal">
          {copied ? <Check className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
        </span>
      </button>
    </div>
  );
}
