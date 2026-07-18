"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotionClient } from "./useClientHooks";
import { ArrowUpRight, Quote, FileText, AlertTriangle, Lightbulb, GraduationCap } from "lucide-react";
import { CASE_STUDIES } from "./case-studies-data";
import { Reveal } from "./Reveal";
import { AnimatedCounter } from "./AnimatedCounter";

const SECTION_ICONS = [FileText, AlertTriangle, Lightbulb, GraduationCap];

export function CaseStudiesSection() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotionClient();
  const cs = CASE_STUDIES[active];

  return (
    <section
      id="work"
      className="section-anchor relative overflow-hidden border-t border-ocean-line py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-16 grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <p className="eyebrow mb-3 text-teal">Phần 03 — Case studies</p>
            <h2 className="editorial-title text-5xl !leading-[1.08] text-offwhite sm:text-7xl lg:text-[6.5rem]">
              <span className="block">Ba dự án</span>
              <span className="block text-slate">Ba bài học</span>
              <span className="block text-teal">Ba con số</span>
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-4 lg:pt-12" delay={0.1}>
            <p className="leading-relaxed text-slate">
              Mình kể lại ba dự án đúng như những gì đã diễn ra — cả những quyết
              định mình tự hào lẫn những phản hồi khiến mình phải làm lại từ đầu.
            </p>
          </Reveal>
        </div>

        {/* Case selector tabs */}
        <Reveal delay={0.15}>
          <div className="mb-12 grid gap-3 sm:grid-cols-3">
            {CASE_STUDIES.map((c, i) => {
              const isActive = i === active;
              return (
                <button
                  key={c.id}
                  onClick={() => setActive(i)}
                  className={`group relative overflow-hidden rounded-lg border p-5 text-left transition-all duration-500 hover:-translate-y-1 ${
                    isActive
                      ? "border-teal bg-gradient-to-br from-teal/15 to-teal/[0.03] shadow-[0_16px_50px_-20px_rgba(46,196,182,0.55)]"
                      : "border-ocean-line bg-ocean-soft hover:border-teal/50 hover:bg-ocean hover:shadow-[0_8px_30px_-16px_rgba(46,196,182,0.25)]"
                  }`}
                >
                  {/* top accent line for active */}
                  {isActive && (
                    <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-teal to-transparent" />
                  )}
                  {/* hover sweep accent (inactive only) */}
                  {!isActive && (
                    <span className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-0 bg-teal transition-all duration-500 group-hover:w-full" />
                  )}
                  <div className="mb-2 flex items-center justify-between">
                    <span
                      className={`relative font-anton text-3xl transition-all duration-300 ${
                        isActive
                          ? "text-teal"
                          : "text-slate-dim group-hover:text-teal"
                      }`}
                    >
                      {c.num}
                      {isActive && (
                        <span className="absolute -right-3 -top-1 h-1.5 w-1.5 animate-pulse rounded-full bg-teal" />
                      )}
                    </span>
                    <span
                      className={`flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[0.55rem] uppercase tracking-[0.18em] transition-all duration-300 ${
                        isActive
                          ? "border-teal/40 bg-teal/10 text-teal"
                          : "border-ocean-line text-slate-dim group-hover:border-teal/30 group-hover:text-slate"
                      }`}
                    >
                      {isActive && (
                        <span className="h-1 w-1 animate-pulse rounded-full bg-teal" />
                      )}
                      {c.company}
                    </span>
                  </div>
                  <p
                    className={`font-anton text-lg uppercase leading-tight transition-colors duration-300 ${
                      isActive ? "text-offwhite" : "text-slate group-hover:text-offwhite"
                    }`}
                  >
                    {c.title.split(" × ")[0].split(":")[0]}
                  </p>
                  {isActive && (
                    <motion.span
                      layoutId="case-active-bar"
                      className="absolute bottom-0 left-0 h-[3px] w-full bg-teal"
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Active case study detail */}
        <AnimatePresence mode="wait">
          <motion.article
            key={cs.id}
            initial={{ opacity: 0, y: reduce ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-10 lg:grid-cols-12 lg:gap-12"
          >
            {/* Left: image + meta */}
            <div className="lg:col-span-5">
              <div className="sticky top-24 space-y-6">
                <div className="img-zoom vignette relative aspect-square overflow-hidden rounded-md border border-ocean-line">
                  <img
                    src={cs.image}
                    alt={cs.imageAlt}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ocean/85 via-ocean/10 to-transparent" />
                  <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-teal/50 bg-ocean/70 font-anton text-lg text-teal backdrop-blur-sm">
                    {cs.num}
                  </div>
                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-[0.6rem] uppercase tracking-[0.22em] text-teal">
                      {cs.tag}
                    </p>
                    <p className="font-anton text-2xl uppercase leading-tight text-offwhite sm:text-3xl">
                      {cs.title.split(" × ")[0].split(":")[0]}
                    </p>
                  </div>
                </div>

                {/* Meta card */}
                <div className="rounded-md border border-ocean-line bg-ocean-soft p-5">
                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between gap-4 border-b border-ocean-line pb-3">
                      <dt className="eyebrow text-slate-dim">Vai trò</dt>
                      <dd className="text-right text-offwhite">{cs.role}</dd>
                    </div>
                    <div className="flex justify-between gap-4 border-b border-ocean-line pb-3">
                      <dt className="eyebrow text-slate-dim">Công ty</dt>
                      <dd className="text-right text-offwhite">{cs.company}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="eyebrow text-slate-dim">Năm</dt>
                      <dd className="text-right text-offwhite">{cs.year}</dd>
                    </div>
                  </dl>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-ocean-line bg-ocean-line">
                  {cs.metrics.map((m) => (
                    <div
                      key={`${cs.id}-${m.label}`}
                      className="group bg-ocean-soft p-4 transition-colors duration-300 hover:bg-ocean"
                    >
                      <p className="font-anton text-3xl text-teal transition-transform duration-300 group-hover:scale-105">
                        <AnimatedCounter value={m.value} />
                      </p>
                      <p className="mt-1 text-[0.65rem] uppercase tracking-[0.18em] text-slate">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: full content */}
            <div className="lg:col-span-7">
              <div className="mb-6 flex items-center gap-4">
                <span className="font-anton text-6xl leading-none text-teal/30 sm:text-7xl">
                  {cs.num}
                </span>
                <div className="h-px flex-1 bg-ocean-line" />
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-slate-dim">
                  Case {active + 1}/3
                </span>
              </div>
              <h3 className="mb-2 font-anton text-3xl uppercase leading-none text-offwhite sm:text-4xl lg:text-5xl">
                {cs.title}
              </h3>
              <p className="mb-10 text-lg text-slate">{cs.subtitle}</p>

              <div className="space-y-px">
                {cs.sections.map((s, i) => {
                  const Icon = SECTION_ICONS[i] ?? FileText;
                  return (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.08, duration: 0.55 }}
                    className="group relative border-t border-ocean-line py-7 transition-colors duration-300 hover:bg-ocean-soft/40"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-teal/40 text-teal transition-all duration-300 group-hover:bg-teal group-hover:text-ocean">
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <span className="font-anton text-xs text-teal">
                        0{i + 1}
                      </span>
                      <span className="eyebrow text-slate-dim">{s.label}</span>
                      <span className="ml-auto h-px w-0 bg-teal transition-all duration-500 group-hover:w-12" />
                    </div>
                    <h4 className="mb-3 text-xl font-medium text-offwhite sm:text-2xl">
                      {s.title}
                    </h4>
                    <p className="leading-relaxed text-slate">{s.body}</p>
                  </motion.div>
                  );
                })}
                <div className="border-t border-ocean-line" />
              </div>

              {/* Result highlight */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="group relative mt-10 overflow-hidden rounded-md border border-teal/50 bg-gradient-to-br from-teal/[0.12] via-teal/[0.04] to-transparent p-7 shadow-[0_18px_60px_-30px_rgba(46,196,182,0.4)]"
              >
                {/* top accent line */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal to-transparent" />
                {/* large decorative quote */}
                <Quote className="absolute -right-3 -top-3 h-24 w-24 text-teal/15 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6" />
                <div className="relative">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal/20 text-teal">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-teal" />
                    </span>
                    <p className="eyebrow text-teal">Kết quả</p>
                    <span className="ml-auto h-px flex-1 bg-teal/20" />
                  </div>
                  <p className="text-lg leading-relaxed text-offwhite sm:text-xl">
                    {cs.result}
                  </p>
                  {cs.highlight && (
                    <div className="mt-5 flex items-center gap-3 border-t border-teal/20 pt-4">
                      <span className="font-anton text-2xl text-teal">→</span>
                      <p className="signature text-2xl text-teal sm:text-3xl">
                        {cs.highlight}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Next case CTA */}
              {active < CASE_STUDIES.length - 1 && (
                <button
                  onClick={() => setActive(active + 1)}
                  className="group mt-10 flex w-full items-center justify-between rounded-md border border-ocean-line p-5 transition-colors hover:border-teal/50 hover:bg-ocean-soft"
                >
                  <span className="text-sm uppercase tracking-[0.18em] text-slate group-hover:text-offwhite">
                    Case tiếp theo
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="font-anton text-xl uppercase text-offwhite">
                      {CASE_STUDIES[active + 1].title.split(" × ")[0].split(":")[0]}
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-teal transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </button>
              )}
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  );
}
