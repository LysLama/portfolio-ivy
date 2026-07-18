"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Mail, Phone, MapPin, Heart, Github, Linkedin, FileText } from "lucide-react";

const SOCIALS = [
  { icon: Mail, label: "Email", href: "mailto:tuong.vy11022004@gmail.com" },
  { icon: Phone, label: "Phone", href: "tel:0943451104" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: FileText, label: "CV", href: "/cv-nguyen-ngoc-tuong-vy.pdf" },
];

const NAV = [
  { id: "intro", label: "Intro" },
  { id: "thinking", label: "How I Think" },
  { id: "work", label: "Case Studies" },
  { id: "heading", label: "Where I'm Heading" },
  { id: "contact", label: "Let's Talk" },
];

export function Footer() {
  const [activeSection, setActiveSection] = useState<string>("");

  // Scroll-spy: track which section is currently in view
  useEffect(() => {
    const ids = NAV.map((n) => n.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <footer className="relative overflow-hidden border-t border-ocean-line bg-ocean px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
      {/* subtle top gradient line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal/60 to-transparent" />
      {/* faint radial glow bottom-left */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(46,196,182,0.15), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-[1400px]">
        {/* Top row: brand block + nav + socials */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Brand block */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-teal/40 bg-ocean-soft">
                <span className="font-anton text-lg text-teal">V</span>
                <span className="absolute inset-0 rounded-full border border-teal/0 transition-all duration-500 hover:scale-110 hover:border-teal/40" />
              </span>
              <div className="leading-tight">
                <p className="font-anton text-base uppercase tracking-[0.18em] text-offwhite">
                  Ivy
                </p>
                <p className="text-[0.62rem] uppercase tracking-[0.22em] text-slate">
                  Fresher Planner · Portfolio 2026
                </p>
              </div>
            </div>
            <p className="signature mt-5 text-2xl text-teal">thank you</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate">
              Cảm ơn bạn đã đọc đến đây. Mình đang tìm cơ hội Strategic Planning
              — nơi mình được học từ những planner giỏi.
            </p>
          </div>

          {/* Nav */}
          <div className="lg:col-span-3">
            <p className="eyebrow mb-4 text-slate-dim">— Điều hướng</p>
            <ul className="space-y-2.5">
              {NAV.map((n) => {
                const isActive = activeSection === n.id;
                return (
                  <li key={n.id}>
                    <button
                      onClick={() => go(n.id)}
                      aria-current={isActive ? "true" : undefined}
                      className={`group flex items-center gap-3 text-sm transition-colors duration-300 ${
                        isActive ? "text-teal" : "text-slate hover:text-offwhite"
                      }`}
                    >
                      <span
                        className={`h-px transition-all duration-300 ${
                          isActive
                            ? "w-8 bg-teal"
                            : "w-4 bg-slate-dim group-hover:w-7 group-hover:bg-teal"
                        }`}
                      />
                      {n.label}
                      {isActive && (
                        <span className="ml-auto h-1.5 w-1.5 animate-pulse rounded-full bg-teal" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Socials + location */}
          <div className="lg:col-span-4">
            <p className="eyebrow mb-4 text-slate-dim">— Kết nối</p>
            <div className="mb-5 flex flex-wrap gap-2.5">
              {SOCIALS.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="group flex h-11 w-11 items-center justify-center rounded-full border border-ocean-line bg-ocean-soft text-slate transition-all duration-300 hover:-translate-y-0.5 hover:border-teal hover:bg-teal hover:text-ocean"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
            <div className="space-y-1.5 text-sm text-slate">
              <a
                href="mailto:tuong.vy11022004@gmail.com"
                className="flex items-center gap-2 break-all transition-colors hover:text-offwhite"
              >
                <Mail className="h-3.5 w-3.5 flex-shrink-0 text-teal" />
                tuong.vy11022004@gmail.com
              </a>
              <a
                href="tel:0943451104"
                className="flex items-center gap-2 transition-colors hover:text-offwhite"
              >
                <Phone className="h-3.5 w-3.5 flex-shrink-0 text-teal" />
                0943 451 104
              </a>
              <p className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-teal" />
                TP. Hồ Chí Minh · 10.7°N 106.6°E
              </p>
            </div>
          </div>
        </div>

        {/* Hairline divider */}
        <div className="hairline my-10" />

        {/* Bottom row: copyright + back to top */}
        <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
          <p className="flex flex-wrap items-center gap-1.5 text-[0.65rem] uppercase tracking-[0.2em] text-slate-dim">
            © 2026 Nguyễn Ngọc Tường Vy
            <span className="hidden sm:inline">·</span>
            <span className="flex items-center gap-1.5">
              Built with
              <Heart className="h-3 w-3 text-teal" fill="currentColor" />
              data &amp; the sea
            </span>
          </p>

          {/* mini keyboard hint */}
          <p className="hidden items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-slate-dim md:flex">
            <kbd className="rounded border border-ocean-line bg-ocean-soft px-1.5 py-0.5 text-teal">1</kbd>
            –
            <kbd className="rounded border border-ocean-line bg-ocean-soft px-1.5 py-0.5 text-teal">6</kbd>
            để chuyển section
          </p>

          <button
            onClick={toTop}
            className="group flex items-center gap-2 rounded-full border border-ocean-line px-4 py-2 text-xs uppercase tracking-[0.18em] text-slate transition-all duration-300 hover:border-teal hover:text-teal"
          >
            Lên đầu trang
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </footer>
  );
}
