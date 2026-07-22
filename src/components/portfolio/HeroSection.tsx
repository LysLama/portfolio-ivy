"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import { useReducedMotionClient } from "./useClientHooks";
import { ArrowDown, MapPin } from "lucide-react";
import { Magnetic } from "./CursorGlow";

export function HeroSection() {
  const reduce = useReducedMotionClient();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // ── Parallax (scrub, font-independent) — set up synchronously ──
        const scrub = { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1 as const };
        gsap.to(".hero-bg", { yPercent: 14, scale: 1.12, ease: "none", scrollTrigger: scrub });
        gsap.to(".hero-content", { y: -60, opacity: 0.4, ease: "none", scrollTrigger: scrub });
        gsap.to(".hero-glow", {
          opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "55% top", scrub: 1 },
        });

        // ── Intro entrance for everything except the name ──
        // .from() applies its hidden start state synchronously inside the
        // layout effect → no flash before first paint.
        const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.9 } });
        tl.from(".hero-meta", { autoAlpha: 0, duration: 1 }, 0)
          .from(".hero-eyebrow", { autoAlpha: 0, y: 14 }, 0.15)
          .from(".hero-tick", { scaleX: 0, transformOrigin: "left center", duration: 0.8 }, 1.1)
          .from(".hero-signature", { autoAlpha: 0, y: 14 }, 0.6)
          .from(".hero-rolequote > *", { autoAlpha: 0, y: 24, stagger: 0.12 }, 0.75)
          .from(".hero-cta", { autoAlpha: 0, y: 24 }, 0.95)
          .from(".hero-detail", { autoAlpha: 0, duration: 1, stagger: 0.12 }, 1.3);

        // ── Name: SplitText char reveal, deferred until fonts are ready so
        // Anton doesn't shift the split. Pre-hidden synchronously to avoid a
        // flash of the un-split name. No mask (would clip Vietnamese diacritics).
        gsap.set(".hero-name-line", { autoAlpha: 0 });
        let split: SplitText | undefined;
        let nameTween: gsap.core.Tween | undefined;
        let cancelled = false;
        const buildName = () => {
          if (cancelled || !sectionRef.current) return;
          gsap.set(".hero-name-line", { autoAlpha: 1 });
          split = SplitText.create(sectionRef.current.querySelectorAll(".hero-name-line"), {
            type: "chars",
          });
          nameTween = gsap.from(split.chars, {
            yPercent: 110,
            autoAlpha: 0,
            stagger: 0.025,
            duration: 0.9,
            ease: "power4.out",
            delay: 0.25,
          });
        };
        const fontsReady =
          typeof document !== "undefined" && document.fonts ? document.fonts.ready : Promise.resolve();
        fontsReady.then(buildName);

        return () => {
          cancelled = true;
          nameTween?.kill();
          split?.revert();
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="intro"
      className="section-anchor relative flex min-h-screen flex-col justify-center overflow-hidden px-5 pt-28 pb-20 sm:px-8 lg:px-12"
    >
      {/* Background image — parallax layer */}
      <div className="hero-bg pointer-events-none absolute inset-0 -z-10">
        <img
          src="/images/hero-bg.png"
          alt=""
          aria-hidden
          className="h-[115%] w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean/70 via-ocean/40 to-ocean" />
        <div className="absolute inset-0 bg-gradient-to-r from-ocean via-transparent to-ocean/60" />
      </div>

      {/* Radial teal glow — fades on scroll */}
      <div className="hero-glow radial-teal pointer-events-none absolute inset-0 -z-10" />

      {/* Floating orbs — slow-moving teal blobs for depth (Framer, scroll-independent) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -left-20 top-1/4 h-72 w-72 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(46,196,182,0.12), transparent 70%)",
            willChange: reduce ? undefined : "transform" }}
          animate={reduce ? undefined : { x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-10 top-1/3 h-96 w-96 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(79,209,197,0.08), transparent 70%)",
            willChange: reduce ? undefined : "transform" }}
          animate={reduce ? undefined : { x: [0, -50, 0], y: [0, 40, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute bottom-10 left-1/3 h-64 w-64 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(46,196,182,0.06), transparent 70%)",
            willChange: reduce ? undefined : "transform" }}
          animate={reduce ? undefined : { x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
      </div>

      {/* Decorative grid lines (very subtle) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #F5F1EA 1px, transparent 1px), linear-gradient(to bottom, #F5F1EA 1px, transparent 1px)",
          backgroundSize: "120px 120px" }}
      />

      {/* Top meta bar */}
      <div className="hero-meta mx-auto mb-10 flex w-full max-w-[1400px] items-center justify-between gap-3 text-[0.6rem] uppercase tracking-[0.24em] text-slate sm:text-xs">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-teal" />
          Portfolio — 2026
        </span>
        <span className="hidden md:inline">FPT University · Digital Marketing</span>
        <span className="flex items-center gap-1.5">
          <MapPin className="h-3 w-3 text-teal" />
          TP. HCM
        </span>
      </div>

      <div className="hero-content mx-auto w-full max-w-[1400px]">
        {/* Eyebrow */}
        <div className="hero-eyebrow mb-6 flex items-center gap-4">
          <span className="h-px w-12 bg-teal" />
          <span className="eyebrow text-teal">Phần 01 — Tôi là ai</span>
        </div>

        {/* Massive name with signature placed as an editorial "kicker" beside it */}
        <h1 className="editorial-title text-offwhite">
          <span
            className="hero-name-line block leading-[0.86] mb-8"
            style={{ fontSize: "clamp(2rem, 10vw, 8rem)" }}
          >
            NGUYỄN NGỌC
          </span>
          <span className="relative block leading-[0.86]">
            <span className="hero-name-line inline-block" style={{ fontSize: "clamp(2rem, 10vw, 8rem)" }}>
              TƯỜNG VY
            </span>
            {/* small teal tick under the name — animated grow-in */}
            <span className="hero-tick absolute -bottom-2 left-0 h-1 w-12 origin-left bg-gradient-to-r from-teal to-teal-bright sm:w-20 lg:w-28" />
          </span>
        </h1>

        {/* Signature row — sits directly under the name, clearly a handwritten sign-off */}
        <div className="hero-signature mt-5 flex items-center gap-4">
          <span className="signature rotate-[-4deg] text-3xl text-teal sm:text-4xl lg:text-5xl">
            Ivy
          </span>
          <span className="h-px flex-1 bg-ocean-line" />
          <span className="hidden font-mono text-[0.6rem] uppercase tracking-[0.2em] text-slate-dim sm:inline">
            / signature
          </span>
        </div>

        {/* Role + quote row */}
        <div className="hero-rolequote mt-12 grid gap-8 border-t border-ocean-line pt-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-3">
            <p className="eyebrow mb-2 text-slate-dim">Vai trò</p>
            <p className="font-anton text-3xl uppercase leading-none text-offwhite sm:text-4xl">
              Fresher
              <br />
              <span className="text-teal">Planner</span>
            </p>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <p className="eyebrow mb-4 text-slate-dim">Quan điểm</p>
            <p className="text-lg leading-relaxed text-offwhite sm:text-xl lg:text-2xl">
              &ldquo;Mình tin một ý tưởng chỉ thuyết phục khi nó đứng trên một{" "}
              <span className="accent-underline font-medium text-offwhite">
                sự thật được đọc đúng
              </span>{" "}
              — và data là cách mình đi tìm sự thật đó.&rdquo;
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="hero-cta mt-12 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6">
          <Magnetic strength={0.3} radius={110}>
            <a
              href="#work"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-teal px-7 py-4 text-sm font-medium uppercase tracking-[0.16em] text-ocean transition-transform duration-300 hover:scale-[1.02]"
            >
              <span className="relative z-10">Xem dự án của mình</span>
              <ArrowDown className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
              <span className="absolute inset-0 -translate-x-full bg-teal-bright transition-transform duration-500 group-hover:translate-x-0" />
            </a>
          </Magnetic>
          <Magnetic strength={0.2} radius={80}>
            <a
              href="#thinking"
              className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-slate transition-colors hover:text-offwhite"
            >
              <span className="h-px w-8 bg-slate transition-all duration-300 group-hover:w-12 group-hover:bg-teal" />
              Cách mình tư duy
            </a>
          </Magnetic>
          {/* Keyboard shortcut hint */}
          <button
            onClick={() =>
              window.dispatchEvent(
                new KeyboardEvent("keydown", {
                  key: "k",
                  metaKey: true,
                  ctrlKey:
                    typeof navigator !== "undefined" &&
                    navigator.platform.toLowerCase().includes("win"),
                  bubbles: true })
              )
            }
            className="group hidden items-center gap-2 rounded-md border border-ocean-line bg-ocean-soft/40 px-3 py-2 text-[0.65rem] uppercase tracking-[0.16em] text-slate-dim transition-all duration-300 hover:border-teal/50 hover:text-offwhite md:inline-flex"
            aria-label="Mở command palette"
          >
            <span className="h-1 w-1 animate-pulse rounded-full bg-teal" />
            <span>Mọi lệnh</span>
            <kbd className="rounded border border-ocean-line bg-ocean px-1.5 py-0.5 font-mono text-[0.55rem] text-teal">
              ⌘K
            </kbd>
          </button>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero-detail absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
        <span className="text-[0.6rem] uppercase tracking-[0.3em] text-slate-dim">
          Cuộn xuống
        </span>
        <span className="relative flex h-10 w-6 justify-center rounded-full border border-slate-dim/50">
          <span className="animate-scroll-hint absolute top-2 h-2 w-1 rounded-full bg-teal" />
        </span>
      </div>

      {/* Side rotated label */}
      <div className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rotate-90 xl:block">
        <span className="vertical-text text-[0.62rem] uppercase tracking-[0.4em] text-slate-dim">
          Strategic · Planning · Portfolio
        </span>
      </div>

      {/* Corner coordinates — editorial detail */}
      <div className="hero-detail pointer-events-none absolute bottom-6 left-5 hidden font-mono text-[0.6rem] uppercase tracking-[0.2em] text-slate-dim sm:left-8 sm:block lg:left-12">
        <span className="text-teal">10.7°N</span> · 106.6°E
      </div>
      <div className="hero-detail pointer-events-none absolute bottom-6 right-5 hidden font-mono text-[0.6rem] uppercase tracking-[0.2em] text-slate-dim sm:right-8 sm:block lg:right-12">
        Edition 01 / Portfolio
      </div>
    </section>
  );
}
