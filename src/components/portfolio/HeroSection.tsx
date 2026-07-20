"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotionClient } from "./useClientHooks";
import { ArrowDown, MapPin } from "lucide-react";
import { Magnetic } from "./CursorGlow";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.13, delayChildren: 0.3 } } };

const item = (y: number) => ({
  hidden: { opacity: 0, y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const } } });

export function HeroSection() {
  const reduce = useReducedMotionClient();
  const { scrollY } = useScroll();
  // Parallax: background moves slower (0.3x), content drifts up slightly, opacity fades
  const bgY = useTransform(scrollY, [0, 800], [0, reduce ? 0 : 180]);
  const bgScale = useTransform(scrollY, [0, 800], [1, reduce ? 1 : 1.12]);
  const contentY = useTransform(scrollY, [0, 800], [0, reduce ? 0 : -60]);
  const contentOpacity = useTransform(scrollY, [0, 500, 800], [1, 0.85, 0.4]);
  const glowOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section
      id="intro"
      className="section-anchor relative flex min-h-screen flex-col justify-center overflow-hidden px-5 pt-28 pb-20 sm:px-8 lg:px-12"
    >
      {/* Background image — parallax layer */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ y: bgY, scale: bgScale }}
      >
        <img
          src="/images/hero-bg.png"
          alt=""
          aria-hidden
          className="h-[115%] w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean/70 via-ocean/40 to-ocean" />
        <div className="absolute inset-0 bg-gradient-to-r from-ocean via-transparent to-ocean/60" />
      </motion.div>

      {/* Radial teal glow — fades on scroll */}
      <motion.div
        className="radial-teal pointer-events-none absolute inset-0 -z-10"
        style={{ opacity: glowOpacity }}
      />

      {/* Floating orbs — slow-moving teal blobs for depth */}
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
        className="mx-auto mb-10 flex w-full max-w-[1400px] items-center justify-between gap-3 text-[0.6rem] uppercase tracking-[0.24em] text-slate sm:text-xs"
      >
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-teal" />
          Portfolio — 2026
        </span>
        <span className="hidden md:inline">FPT University · Digital Marketing</span>
        <span className="flex items-center gap-1.5">
          <MapPin className="h-3 w-3 text-teal" />
          TP. HCM
        </span>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        style={{ y: contentY, opacity: contentOpacity }}
        className="mx-auto w-full max-w-[1400px]"
      >
        {/* Eyebrow */}
        <motion.div
          variants={item(reduce ? 0 : 14)}
          className="mb-6 flex items-center gap-4"
        >
          <span className="h-px w-12 bg-teal" />
          <span className="eyebrow text-teal">Phần 01 — Tôi là ai</span>
        </motion.div>

        {/* Massive name with signature placed as an editorial "kicker" beside it */}
        <motion.h1
          variants={item(reduce ? 0 : 40)}
          className="editorial-title text-offwhite"
        >
          <span
            className="block leading-[0.86] mb-8"
            style={{ fontSize: "clamp(2rem, 10vw, 8rem)" }}
          >
            NGUYỄN NGỌC
          </span>
          <span className="relative block leading-[0.86]">
            <span style={{ fontSize: "clamp(2rem, 10vw, 8rem)" }}>
              TƯỜNG VY
            </span>
            {/* small teal tick under the name — animated grow-in */}
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-2 left-0 h-1 w-12 origin-left bg-gradient-to-r from-teal to-teal-bright sm:w-20 lg:w-28"
            />
          </span>
        </motion.h1>

        {/* Signature row — sits directly under the name, clearly a handwritten sign-off */}
        <motion.div
          variants={item(reduce ? 0 : 14)}
          className="mt-5 flex items-center gap-4"
        >
          <span className="signature rotate-[-4deg] text-3xl text-teal sm:text-4xl lg:text-5xl">
            Ivy
          </span>
          <span className="h-px flex-1 bg-ocean-line" />
          <span className="hidden font-mono text-[0.6rem] uppercase tracking-[0.2em] text-slate-dim sm:inline">
            / signature
          </span>
        </motion.div>

        {/* Role + quote row */}
        <div className="mt-12 grid gap-8 border-t border-ocean-line pt-10 lg:grid-cols-12 lg:gap-12">
          <motion.div
            variants={item(reduce ? 0 : 24)}
            className="lg:col-span-3"
          >
            <p className="eyebrow mb-2 text-slate-dim">Vai trò</p>
            <p className="font-anton text-3xl uppercase leading-none text-offwhite sm:text-4xl">
              Fresher
              <br />
              <span className="text-teal">Planner</span>
            </p>
          </motion.div>

          <motion.div
            variants={item(reduce ? 0 : 24)}
            className="lg:col-span-7 lg:col-start-6"
          >
            <p className="eyebrow mb-4 text-slate-dim">Quan điểm</p>
            <p className="text-lg leading-relaxed text-offwhite sm:text-xl lg:text-2xl">
              &ldquo;Mình tin một ý tưởng chỉ thuyết phục khi nó đứng trên một{" "}
              <span className="accent-underline font-medium text-offwhite">
                sự thật được đọc đúng
              </span>{" "}
              — và data là cách mình đi tìm sự thật đó.&rdquo;
            </p>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          variants={item(reduce ? 0 : 24)}
          className="mt-12 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6"
        >
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
          <motion.button
            variants={item(reduce ? 0 : 14)}
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
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.3em] text-slate-dim">
          Cuộn xuống
        </span>
        <span className="relative flex h-10 w-6 justify-center rounded-full border border-slate-dim/50">
          <span className="animate-scroll-hint absolute top-2 h-2 w-1 rounded-full bg-teal" />
        </span>
      </motion.div>

      {/* Side rotated label */}
      <div className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rotate-90 xl:block">
        <span className="vertical-text text-[0.62rem] uppercase tracking-[0.4em] text-slate-dim">
          Strategic · Planning · Portfolio
        </span>
      </div>

      {/* Corner coordinates — editorial detail */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="pointer-events-none absolute bottom-6 left-5 hidden font-mono text-[0.6rem] uppercase tracking-[0.2em] text-slate-dim sm:left-8 sm:block lg:left-12"
      >
        <span className="text-teal">10.7°N</span> · 106.6°E
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
        className="pointer-events-none absolute bottom-6 right-5 hidden font-mono text-[0.6rem] uppercase tracking-[0.2em] text-slate-dim sm:right-8 sm:block lg:right-12"
      >
        Edition 01 / Portfolio
      </motion.div>
    </section>
  );
}
