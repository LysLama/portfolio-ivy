"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotionClient } from "./useClientHooks";
import { ANTON_MASK_FONT_CSS } from "@/lib/anton-mask-font";

type VideoTextProps = {
  /** Text lines, rendered stacked and left-aligned (e.g. ["NGUYỄN NGỌC", "TƯỜNG VY"]). */
  lines: string[];
  /** MP4 source (required). */
  mp4Src: string;
  /** Optional WebM source, preferred when supported. */
  webmSrc?: string;
  /** Optional poster shown while the video loads. */
  poster?: string;
  /** CSS font-size (supports clamp()). */
  fontSize?: string;
  /** Fallback letter colour when the video is absent / reduced-motion. */
  fallbackColor?: string;
  className?: string;
};

const escapeXml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * "Video text" — one shared video is revealed through the letterforms of ALL
 * lines at once (a single mask spanning the whole name block, so both lines
 * show the same, spatially-continuous video).
 *
 * Structure: a real teal text layer (SSR-safe, accessible, the fallback) with a
 * masked <video> laid exactly over it. The mask geometry is measured from the
 * real text, so the video letters align with the teal letters. Anton is
 * base64-embedded in the mask (a data-URI SVG can't load page web-fonts).
 */
export function VideoText({
  lines,
  mp4Src,
  webmSrc,
  poster,
  fontSize = "clamp(2rem, 10vw, 8rem)",
  fallbackColor = "rgb(45 212 191)",
  className = "",
}: VideoTextProps) {
  const reduce = useReducedMotionClient();
  const textRef = useRef<HTMLSpanElement>(null);
  const [mask, setMask] = useState<{ url: string; w: number; h: number } | null>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const build = () => {
      const lineEls = Array.from(el.querySelectorAll<HTMLElement>("[data-vt-line]"));
      if (lineEls.length === 0) return;
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      if (w === 0 || h === 0) return;

      const fs = parseFloat(getComputedStyle(lineEls[0]).fontSize);
      const ls = parseFloat(getComputedStyle(lineEls[0]).letterSpacing) || 0;
      // Approx cap/ascent so the baseline sits correctly inside each line box.
      const ascent = fs * 0.8;
      const texts = lineEls
        .map((line) => {
          const x = line.offsetLeft;
          const y = line.offsetTop + ascent;
          return `<text x="${x}" y="${y}">${escapeXml(line.textContent ?? "")}</text>`;
        })
        .join("");

      const svg =
        `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">` +
        `<style>${ANTON_MASK_FONT_CSS}</style>` +
        `<g fill="#fff" font-family="AntonMask, sans-serif" font-weight="400" font-size="${fs}" letter-spacing="${ls}">` +
        texts +
        `</g></svg>`;

      setMask({ url: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`, w, h });
    };

    build();
    const ro = new ResizeObserver(build);
    ro.observe(el);
    // Re-measure once fonts settle (Anton metrics can shift the layout).
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(build).catch(() => {});
    }
    return () => ro.disconnect();
  }, [lines]);

  const maskStyle = mask
    ? ({
        maskImage: mask.url,
        WebkitMaskImage: mask.url,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskSize: "100% 100%",
        WebkitMaskSize: "100% 100%",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      } as const)
    : undefined;

  const showVideo = !reduce && !videoFailed && !!mask;

  return (
    <span className={`relative inline-block ${className}`}>
      {/* Base: real teal text — layout source of truth, SSR + a11y + fallback. */}
      <span
        ref={textRef}
        style={{
          display: "block",
          fontFamily: "var(--font-anton)",
          fontSize,
          lineHeight: 0.92,
          whiteSpace: "nowrap",
          color: fallbackColor,
        }}
      >
        {lines.map((line, i) => (
          <span
            key={i}
            data-vt-line
            style={{ display: "block", marginTop: i === 0 ? 0 : "0.06em" }}
          >
            {line}
          </span>
        ))}
      </span>

      {/* Overlay: the shared video, clipped to the letterforms and aligned to the base. */}
      {showVideo && (
        <video
          aria-hidden
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          onError={() => setVideoFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
          style={maskStyle}
        >
          {webmSrc && <source src={webmSrc} type="video/webm" />}
          <source src={mp4Src} type="video/mp4" />
        </video>
      )}
    </span>
  );
}
