"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotionClient } from "./useClientHooks";
import {
  ArrowUpRight,
  Quote,
  FileText,
  AlertTriangle,
  Lightbulb,
  GraduationCap,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { CASE_STUDIES } from "./case-studies-data";
import { AnimatedCounter } from "./AnimatedCounter";

const SECTION_ICONS = [FileText, AlertTriangle, Lightbulb, GraduationCap];

const shortTitle = (t: string) => t.split(" × ")[0].split(":")[0];

export function CaseStudiesSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const reduce = useReducedMotionClient();
  const sectionRef = useRef<HTMLElement>(null);

  const openIndex = CASE_STUDIES.findIndex((c) => c.id === openId);
  const cs = openIndex >= 0 ? CASE_STUDIES[openIndex] : null;

  // Scroll-driven reveal for the header lines and card rail. Deliberately does
  // NOT touch the Framer `layoutId` morph — cards animate on entrance only and
  // clearProps afterwards so no inline transform is left to skew the FLIP calc.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".cs-head-line", {
          y: 34,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".cs-header", start: "top 82%", once: true },
        });
        gsap.from(".cs-card", {
          y: 44,
          autoAlpha: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          clearProps: "all",
          scrollTrigger: { trigger: ".cs-rail", start: "top 85%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  // Lock body scroll + Esc / arrow-key navigation while a case is open
  useEffect(() => {
    if (!openId) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
      if (e.key === "ArrowRight" && openIndex < CASE_STUDIES.length - 1)
        setOpenId(CASE_STUDIES[openIndex + 1].id);
      if (e.key === "ArrowLeft" && openIndex > 0)
        setOpenId(CASE_STUDIES[openIndex - 1].id);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [openId, openIndex]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="section-anchor relative overflow-hidden border-t border-ocean-line py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="cs-header mb-16 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="cs-head-line eyebrow mb-3 text-teal">Phần 03 — Project</p>
            <h2 className="editorial-title text-5xl !leading-[1.08] text-offwhite sm:text-7xl lg:text-[6.5rem]">
              <span className="cs-head-line block">Ba dự án</span>
              <span className="cs-head-line block text-slate">Ba bài học</span>
              <span className="cs-head-line block text-teal">Ba con số</span>
            </h2>
          </div>
          <div className="cs-head-line lg:col-span-4 lg:pt-12">
            <p className="leading-relaxed text-slate">
              Mình kể lại ba dự án đúng như những gì đã diễn ra — cả những quyết
              định mình tự hào lẫn những phản hồi khiến mình phải làm lại từ đầu.
            </p>
            <p className="mt-4 flex items-center gap-2 text-sm text-slate-dim">
              <span className="h-px w-6 bg-teal/60" />
              Chạm vào một dự án để đọc chi tiết
            </p>
          </div>
        </div>

        {/* Horizontal card rail */}
        <div
          className="cs-rail -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 [scrollbar-width:thin]"
          role="list"
        >
            {CASE_STUDIES.map((c, i) => {
              const primaryMetric = c.metrics[c.metrics.length - 1];
              return (
                <motion.button
                  layoutId={`case-card-${c.id}`}
                  key={c.id}
                  role="listitem"
                  onClick={() => setOpenId(c.id)}
                  whileHover={reduce ? undefined : { y: -8 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={reduce ? undefined : { willChange: "transform" }}
                  className="cs-card group relative flex w-[80vw] max-w-[380px] flex-shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-ocean-line bg-ocean-soft text-left transition-colors duration-400 hover:border-teal/55 hover:shadow-[0_24px_60px_-28px_rgba(46,196,182,0.45)] sm:w-[46vw] lg:w-[calc((100%-2.5rem)/3)]"
                  aria-label={`Mở chi tiết dự án ${shortTitle(c.title)}`}
                >
                  {/* Image */}
                  <motion.div
                    layoutId={`case-image-${c.id}`}
                    className="img-zoom relative aspect-[4/3] overflow-hidden"
                  >
                    <img
                      src={c.image}
                      alt={c.imageAlt}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ocean/90 via-ocean/25 to-transparent" />
                    <motion.span
                      layoutId={`case-num-${c.id}`}
                      className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-teal/50 bg-ocean/85 font-anton text-lg text-teal"
                    >
                      {c.num}
                    </motion.span>
                    <span className="absolute right-4 top-4 rounded-full border border-teal/40 bg-ocean/85 px-2.5 py-1 text-[0.55rem] uppercase tracking-[0.18em] text-teal">
                      {c.company}
                    </span>
                  </motion.div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-5">
                    <p className="mb-1.5 text-[0.6rem] uppercase tracking-[0.22em] text-teal">
                      {c.tag}
                    </p>
                    <motion.h3
                      layoutId={`case-title-${c.id}`}
                      className="mb-3 font-anton text-2xl uppercase leading-tight text-offwhite"
                    >
                      {shortTitle(c.title)}
                    </motion.h3>
                    <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-slate">
                      {c.subtitle}
                    </p>

                    <div className="mt-auto flex items-end justify-between border-t border-ocean-line pt-4">
                      <div>
                        <p className="font-anton text-3xl text-teal">
                          {primaryMetric.value}
                        </p>
                        <p className="text-[0.6rem] uppercase tracking-[0.18em] text-slate-dim">
                          {primaryMetric.label}
                        </p>
                      </div>
                      <span className="flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-slate transition-colors group-hover:text-teal">
                        Chi tiết
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
        </div>
      </div>

      {/* Expanded detail overlay — morphs from the clicked card */}
      <AnimatePresence>
        {cs && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpenId(null)}
              className="fixed inset-0 z-[90] bg-ocean/80 backdrop-blur-md"
            />

            {/* Scroll container */}
            <div className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain">
              <div className="flex min-h-full items-start justify-center p-4 sm:p-6 lg:p-10">
                <motion.article
                  layoutId={`case-card-${cs.id}`}
                  className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-teal/30 bg-ocean-soft shadow-[0_40px_120px_-40px_rgba(46,196,182,0.4)]"
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Hero image */}
                  <motion.div
                    layoutId={`case-image-${cs.id}`}
                    className="relative aspect-[16/9] overflow-hidden sm:aspect-[2/1]"
                  >
                    <img
                      src={cs.image}
                      alt={cs.imageAlt}
                      className={`h-full w-full ${
                        cs.imageFit === "contain" ? "object-contain" : "object-cover"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ocean via-ocean/40 to-transparent" />
                    <motion.span
                      layoutId={`case-num-${cs.id}`}
                      className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-teal/50 bg-ocean/70 font-anton text-xl text-teal backdrop-blur-sm"
                    >
                      {cs.num}
                    </motion.span>

                    {/* Close */}
                    <button
                      onClick={() => setOpenId(null)}
                      aria-label="Đóng chi tiết"
                      className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-offwhite/20 bg-ocean/60 text-offwhite backdrop-blur-sm transition-all duration-300 hover:border-teal hover:text-teal"
                    >
                      <X className="h-5 w-5" />
                    </button>

                    {/* Title block over image */}
                    <div className="absolute bottom-5 left-5 right-5">
                      <p className="mb-1 text-[0.6rem] uppercase tracking-[0.22em] text-teal">
                        {cs.tag}
                      </p>
                      <motion.h3
                        layoutId={`case-title-${cs.id}`}
                        className="font-anton text-3xl uppercase leading-none text-offwhite sm:text-5xl"
                      >
                        {shortTitle(cs.title)}
                      </motion.h3>
                    </div>
                  </motion.div>

                  {/* Detail body — fades in after morph */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25, duration: 0.4 }}
                    className="p-6 sm:p-9 lg:p-12"
                  >
                    <p className="mb-8 text-lg text-slate">{cs.subtitle}</p>

                    {/* Meta + metrics */}
                    <div className="mb-10 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-lg border border-ocean-line bg-ocean p-5">
                        <dl className="space-y-3 text-sm">
                          <div className="flex justify-between gap-4 border-b border-ocean-line pb-3">
                            <dt className="eyebrow text-slate-dim">Vai trò</dt>
                            <dd className="text-right text-offwhite">{cs.role}</dd>
                          </div>
                          <div className="flex justify-between gap-4 border-b border-ocean-line pb-3">
                            <dt className="eyebrow text-slate-dim">Công ty</dt>
                            <dd className="text-right text-offwhite">
                              {cs.company}
                            </dd>
                          </div>
                          <div className="flex justify-between gap-4">
                            <dt className="eyebrow text-slate-dim">Năm</dt>
                            <dd className="text-right text-offwhite">{cs.year}</dd>
                          </div>
                        </dl>
                      </div>
                      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-ocean-line bg-ocean-line">
                        {cs.metrics.map((m) => (
                          <div
                            key={`${cs.id}-${m.label}`}
                            className="group bg-ocean p-4 transition-colors duration-300 hover:bg-ocean-soft"
                          >
                            <p className="font-anton text-2xl text-teal transition-transform duration-300 group-hover:scale-105">
                              <AnimatedCounter value={m.value} />
                            </p>
                            <p className="mt-1 text-[0.6rem] uppercase tracking-[0.16em] text-slate">
                              {m.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Sections */}
                    <div className="space-y-px">
                      {cs.sections.map((s, i) => {
                        const Icon = SECTION_ICONS[i] ?? FileText;
                        return (
                          <div
                            key={s.label}
                            className="group relative border-t border-ocean-line py-7 transition-colors duration-300 hover:bg-ocean/40"
                          >
                            <div className="mb-3 flex items-center gap-3">
                              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-teal/40 text-teal transition-all duration-300 group-hover:bg-teal group-hover:text-ocean">
                                <Icon className="h-3.5 w-3.5" />
                              </span>
                              <span className="font-anton text-xs text-teal">
                                0{i + 1}
                              </span>
                              <span className="eyebrow text-slate-dim">
                                {s.label}
                              </span>
                              <span className="ml-auto h-px w-0 bg-teal transition-all duration-500 group-hover:w-12" />
                            </div>
                            <h4 className="mb-3 text-xl font-medium text-offwhite sm:text-2xl">
                              {s.title}
                            </h4>
                            <p className="leading-relaxed text-slate">{s.body}</p>
                          </div>
                        );
                      })}
                      <div className="border-t border-ocean-line" />
                    </div>

                    {/* Result */}
                    <div className="group relative mt-10 overflow-hidden rounded-lg border border-teal/50 bg-gradient-to-br from-teal/[0.12] via-teal/[0.04] to-transparent p-7 shadow-[0_18px_60px_-30px_rgba(46,196,182,0.4)]">
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal to-transparent" />
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
                            <p className="script text-2xl text-teal sm:text-3xl">
                              {cs.highlight}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Prev / Next nav */}
                    <div className="mt-10 flex items-center justify-between gap-4">
                      <button
                        onClick={() =>
                          openIndex > 0 &&
                          setOpenId(CASE_STUDIES[openIndex - 1].id)
                        }
                        disabled={openIndex === 0}
                        className="group flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-slate transition-colors hover:text-teal disabled:pointer-events-none disabled:opacity-30"
                      >
                        <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Trước
                      </button>
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-slate-dim">
                        Case {openIndex + 1} / {CASE_STUDIES.length}
                      </span>
                      <button
                        onClick={() =>
                          openIndex < CASE_STUDIES.length - 1 &&
                          setOpenId(CASE_STUDIES[openIndex + 1].id)
                        }
                        disabled={openIndex === CASE_STUDIES.length - 1}
                        className="group flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-slate transition-colors hover:text-teal disabled:pointer-events-none disabled:opacity-30"
                      >
                        Tiếp
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </motion.div>
                </motion.article>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
