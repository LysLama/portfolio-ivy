"use client";

import { useRef } from "react";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";

export type TypingSegment = { text: string; className?: string };

/** Half a blink cycle, in seconds — the classic terminal caret cadence. */
const BLINK = 0.53;
/** How long the caret keeps blinking after the last character lands. */
const CARET_LINGER = 0.9;
/** Extra beats after punctuation, in seconds — this is what makes it read as typing. */
const PAUSE_SOFT = 0.16; // , ; : — –
const PAUSE_HARD = 0.28; // . ! ? …

/**
 * Typewriter reveal built on GSAP SplitText.
 *
 * The full text is always in the DOM (server-rendered, correct for SEO and for
 * no-JS): we split it into characters and reveal them one by one with
 * `autoAlpha`, which keeps every character's box in the layout. Nothing reflows
 * while typing — no CLS pushing the content below, no words hopping to the next
 * line mid-sentence — and React never re-renders, since the whole animation
 * lives in GSAP.
 *
 * A caret rides along, moved through the DOM after each revealed character so it
 * follows line wraps for free, then blinks a moment and fades.
 *
 * Reduced motion: the matchMedia branch never runs, so the text simply stays as
 * rendered — fully visible, instantly.
 */
export function TypingText({
  segments,
  speed = 30,
  startDelay = 0,
  className = "",
  as = "p",
}: {
  segments: TypingSegment[];
  /** ms per character */
  speed?: number;
  /** ms before typing begins (lets an intro settle first) */
  startDelay?: number;
  className?: string;
  as?: "p" | "span" | "div";
}) {
  // One cast covers all three tags — they share the HTMLElement ref shape.
  const Tag = as as "p";
  const rootRef = useRef<HTMLParagraphElement>(null);
  // Survives a re-split (font load / resize): once typed, stay typed.
  const typedRef = useRef(false);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(root, {
          // Splitting words too keeps line-breaking at word boundaries.
          type: "words,chars",
          // Default is <div>, which is invalid inside a <p>.
          tag: "span",
          autoSplit: true,
          onSplit(self) {
            if (typedRef.current) return;
            const chars = self.chars as HTMLElement[];
            if (!chars.length) return;

            // Caret is created here rather than in JSX: SplitText.revert()
            // restores the original markup, so it cleans itself up on re-split,
            // and React never sees a node GSAP moves around.
            const caret = document.createElement("span");
            caret.className = "typing-caret";
            caret.setAttribute("aria-hidden", "true");
            chars[0].before(caret);

            gsap.set(chars, { autoAlpha: 0 });

            // Walk the characters once to build the schedule, holding a beat
            // after punctuation so the rhythm isn't metronomic.
            const step = speed / 1000;
            const times: number[] = [];
            let t = startDelay / 1000;
            for (const char of chars) {
              times.push(t);
              t += step;
              const c = char.textContent ?? "";
              if (/[,;:—–]/.test(c)) t += PAUSE_SOFT;
              else if (/[.!?…]/.test(c)) t += PAUSE_HARD;
            }

            const tl = gsap.timeline();
            chars.forEach((char, i) => {
              tl.set(char, { autoAlpha: 1 }, times[i]);
              tl.call(() => char.after(caret), undefined, times[i]);
            });

            // An even number of half-cycles lands the yoyo back on opacity 1,
            // so the fade-out always starts from a visible caret.
            const halves = Math.max(
              2,
              Math.round((t + CARET_LINGER) / BLINK / 2) * 2
            );
            tl.to(
              caret,
              {
                opacity: 0,
                duration: BLINK,
                ease: "steps(1)",
                repeat: halves - 1,
                yoyo: true,
              },
              0
            );
            tl.to(caret, { autoAlpha: 0, duration: 0.3 }, halves * BLINK);
            tl.call(() => {
              typedRef.current = true;
            });

            // Returning it lets SplitText revert and re-sync on re-split.
            return tl;
          },
        });

        return () => split.revert();
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    // font-kerning: none keeps metrics identical before and after the split,
    // so a re-split can't nudge the text sideways.
    <Tag ref={rootRef} className={className} style={{ fontKerning: "none" }}>
      {segments.map((s, i) =>
        s.className ? (
          <span key={i} className={s.className}>
            {s.text}
          </span>
        ) : (
          <span key={i}>{s.text}</span>
        )
      )}
    </Tag>
  );
}
