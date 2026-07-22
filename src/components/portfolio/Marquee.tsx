"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  // Exposed by the GSAP setup so React hover handlers can pause/resume.
  const controlRef = useRef<{ pause: () => void; resume: () => void } | null>(null);

  // 4 copies so the track is always ≥ 2× viewport; translating xPercent -50
  // (i.e. exactly 2 copies) lands on a content boundary → seamless loop.
  const loop = [...WORDS, ...WORDS, ...WORDS, ...WORDS];

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const paused = { on: false };
        const state = { ts: 1 }; // signed timeScale — baseline +1 drifts left

        const loopTween = gsap.to(track, {
          xPercent: -50,
          duration: 40,
          ease: "none",
          repeat: -1,
        });

        const applyTS = () => {
          if (!paused.on) loopTween.timeScale(state.ts);
        };

        let settle: gsap.core.Tween | undefined;
        const st = ScrollTrigger.create({
          trigger: containerRef.current,
          onUpdate: (self) => {
            if (paused.on) return;
            // Signed boost: scroll down → faster left; scroll up → reverse right.
            const boost = gsap.utils.clamp(-7, 7, self.getVelocity() / 300);
            state.ts = 1 + boost;
            applyTS();
            settle?.kill();
            settle = gsap.to(state, { ts: 1, duration: 1, ease: "power2.out", onUpdate: applyTS });
          },
        });

        controlRef.current = {
          pause: () => {
            paused.on = true;
            gsap.to(loopTween, { timeScale: 0, duration: 0.4, overwrite: true });
          },
          resume: () => {
            paused.on = false;
            gsap.to(loopTween, { timeScale: state.ts, duration: 0.4, overwrite: true });
          },
        };

        return () => {
          settle?.kill();
          st.kill();
          controlRef.current = null;
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        const loopTween = gsap.to(track, {
          xPercent: -50,
          duration: 70,
          ease: "none",
          repeat: -1,
        });
        controlRef.current = {
          pause: () => gsap.to(loopTween, { timeScale: 0, duration: 0.4, overwrite: true }),
          resume: () => gsap.to(loopTween, { timeScale: 1, duration: 0.4, overwrite: true }),
        };
        return () => {
          controlRef.current = null;
        };
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

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
      ref={containerRef}
      aria-hidden
      className="group relative flex overflow-hidden border-y border-ocean-line bg-ocean-soft py-7"
      onMouseEnter={() => controlRef.current?.pause()}
      onMouseLeave={() => controlRef.current?.resume()}
    >
      {/* gradient fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-ocean-soft to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-ocean-soft to-transparent" />

      {/* Single GSAP-driven track */}
      <div
        ref={trackRef}
        className="flex shrink-0 items-center gap-12 whitespace-nowrap pr-12 will-change-transform"
      >
        {loop.map((w, i) => renderWord(w, `m-${i}`))}
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
