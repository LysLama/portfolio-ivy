"use client";

import { useState } from "react";
import { Sparkles, Compass, BarChart3, Target, Lightbulb, Anchor } from "lucide-react";

type Word = {
  text: string;
  accent: boolean;
  icon: React.ComponentType<{ className?: string }>;
  size?: "lg" | "md";
};

const WORDS: Word[] = [
  { text: "Strategic Planning", accent: false, icon: Target, size: "lg" },
  { text: "Data-Driven", accent: false, icon: BarChart3, size: "md" },
  { text: "Brief → Insight → Proposal", accent: true, icon: Sparkles, size: "lg" },
  { text: "Business Analytics", accent: false, icon: BarChart3, size: "md" },
  { text: "FPT Online · 2025", accent: false, icon: Compass, size: "md" },
  { text: "Đọc đúng sự thật", accent: true, icon: Lightbulb, size: "lg" },
  { text: "Biển & Núi", accent: false, icon: Anchor, size: "md" },
];

export function Marquee() {
  const [paused, setPaused] = useState(false);
  // Duplicate the list so the loop is seamless (translateX -50%)
  const loop = [...WORDS, ...WORDS];

  const renderWord = (w: Word, key: string) => {
    const Icon = w.icon;
    const isLg = w.size === "lg";
    return (
      <span key={key} className="flex items-center gap-12">
        <span className="flex items-center gap-3">
          <Icon
            className={`h-4 w-4 flex-shrink-0 transition-colors duration-300 ${
              w.accent ? "text-teal" : "text-slate-dim"
            }`}
          />
          <span
            className={
              isLg
                ? `font-anton text-2xl uppercase tracking-tight transition-colors duration-300 group-hover:text-offwhite sm:text-3xl ${
                    w.accent ? "text-teal" : "text-offwhite/70"
                  }`
                : `font-sans text-lg font-light lowercase tracking-wide transition-colors duration-300 group-hover:text-offwhite sm:text-xl ${
                    w.accent ? "text-teal" : "text-slate"
                  }`
            }
          >
            {w.text}
          </span>
        </span>
        <span className="h-1.5 w-1.5 rotate-45 bg-teal/60" />
      </span>
    );
  };

  return (
    <div
      aria-hidden
      className="group relative flex overflow-hidden border-y border-ocean-line bg-ocean-soft py-7"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* gradient fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-ocean-soft to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-ocean-soft to-transparent" />

      {/* Row 1 — scrolls left */}
      <div
        className="flex shrink-0 items-center gap-12 whitespace-nowrap pr-12"
        style={{
          animation: "marquee 36s linear infinite",
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {loop.map((w, i) => renderWord(w, `r1-${i}`))}
      </div>
      <div
        className="flex shrink-0 items-center gap-12 whitespace-nowrap pr-12"
        style={{
          animation: "marquee 36s linear infinite",
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {loop.map((w, i) => renderWord(w, `r1b-${i}`))}
      </div>

      {/* small label top-left */}
      <div className="pointer-events-none absolute left-6 top-2 z-20 flex items-center gap-2">
        <span className="h-1 w-1 animate-pulse rounded-full bg-teal" />
        <span className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-slate-dim">
          / manifesto
        </span>
      </div>
      {/* small label bottom-right */}
      <div className="pointer-events-none absolute bottom-2 right-6 z-20 hidden items-center gap-2 sm:flex">
        <span className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-slate-dim">
          hover to pause
        </span>
        <span className="h-1 w-1 rounded-full bg-slate-dim" />
      </div>
    </div>
  );
}
