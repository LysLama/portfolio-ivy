"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search } from "lucide-react";

const SECTIONS = [
  { id: "intro", label: "Intro", num: "01" },
  { id: "thinking", label: "How I Think", num: "02" },
  { id: "work", label: "Case Studies", num: "03" },
  { id: "heading", label: "Where I'm Heading", num: "04" },
  { id: "contact", label: "Let's Talk", num: "05" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("intro");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = SECTIONS.map((s) => s.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
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

  // Close mobile drawer on Escape (from KeyboardShortcuts)
  useEffect(() => {
    const onEsc = () => setOpen(false);
    window.addEventListener("portfolio:escape", onEsc);
    return () => window.removeEventListener("portfolio:escape", onEsc);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "glass py-3" : "py-5"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-12">
          {/* Brand */}
          <button
            onClick={() => go("intro")}
            className="group flex items-center gap-3"
            aria-label="Về đầu trang"
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-teal/40 bg-ocean-soft">
              <span className="font-anton text-base text-teal">V</span>
              <span className="absolute inset-0 rounded-full border border-teal/0 transition-all duration-500 group-hover:scale-110 group-hover:border-teal/60" />
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="font-anton text-[0.7rem] uppercase tracking-[0.18em] text-offwhite">
                Ivy
              </span>
              <span className="text-[0.6rem] uppercase tracking-[0.22em] text-slate">
                Fresher Planner
              </span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {SECTIONS.map((s) => {
              const isActive = active === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => go(s.id)}
                  className={`group relative flex items-center gap-2 px-3.5 py-2 text-xs uppercase tracking-[0.18em] transition-colors duration-300 ${
                    isActive ? "text-offwhite" : "text-slate hover:text-offwhite"
                  }`}
                >
                  <span
                    className={`font-anton text-[0.7rem] transition-colors duration-300 ${
                      isActive ? "text-teal" : "text-slate-dim group-hover:text-teal"
                    }`}
                  >
                    {s.num}
                  </span>
                  <span>{s.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-3.5 right-3.5 h-px bg-teal"
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            {/* Command palette trigger */}
            <button
              onClick={() =>
                window.dispatchEvent(
                  new KeyboardEvent("keydown", {
                    key: "k",
                    metaKey: true,
                    ctrlKey: navigator.platform.toLowerCase().includes("win"),
                    bubbles: true,
                  })
                )
              }
              className="hidden items-center gap-2 rounded-md border border-ocean-line bg-ocean-soft/60 px-2.5 py-1.5 text-[0.65rem] uppercase tracking-[0.16em] text-slate transition-all duration-300 hover:border-teal/50 hover:text-offwhite xl:inline-flex"
              aria-label="Mở command palette (Ctrl+K)"
            >
              <Search className="h-3 w-3 text-teal" />
              <span className="hidden 2xl:inline">Tìm kiếm</span>
              <kbd className="rounded border border-ocean-line bg-ocean px-1 py-0.5 font-mono text-[0.55rem] text-slate-dim">
                ⌘K
              </kbd>
            </button>
            <button
              onClick={() => go("contact")}
              className="hidden items-center gap-2 rounded-full border border-teal/50 px-4 py-2 text-xs uppercase tracking-[0.18em] text-teal transition-all duration-300 hover:bg-teal hover:text-ocean md:inline-flex"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal" />
              Available
            </button>
            <button
              onClick={() => setOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-teal/30 bg-ocean-soft/60 text-offwhite transition-all duration-300 hover:border-teal hover:text-teal lg:hidden"
              aria-label="Mở menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-ocean/80 backdrop-blur-md"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col justify-between border-l border-teal/20 bg-ocean-soft px-6 py-8"
            >
              <div>
                <div className="mb-10 flex items-center justify-between">
                  <span className="font-anton text-sm uppercase tracking-[0.2em] text-teal">
                    Menu
                  </span>
                  <button
                    onClick={() => setOpen(false)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-teal/30 text-offwhite transition-colors hover:border-teal hover:text-teal"
                    aria-label="Đóng menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <ul className="space-y-2">
                  {SECTIONS.map((s, i) => (
                    <motion.li
                      key={s.id}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.07, duration: 0.5 }}
                    >
                      <button
                        onClick={() => go(s.id)}
                        className="group flex w-full items-baseline gap-4 border-b border-ocean-line py-4 text-left"
                      >
                        <span className="font-anton text-xs text-teal">
                          {s.num}
                        </span>
                        <span className="font-anton text-2xl uppercase leading-none text-offwhite transition-colors group-hover:text-teal">
                          {s.label}
                        </span>
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.2em] text-slate">
                  Liên hệ
                </p>
                <a
                  href="mailto:tuong.vy11022004@gmail.com"
                  className="block break-all text-sm text-offwhite hover:text-teal"
                >
                  tuong.vy11022004@gmail.com
                </a>
                <a
                  href="tel:0943451104"
                  className="block text-sm text-offwhite hover:text-teal"
                >
                  0943 451 104
                </a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
