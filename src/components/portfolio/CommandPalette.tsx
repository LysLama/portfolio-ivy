"use client";

import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  CornerDownLeft,
  ArrowUp,
  ArrowDown,
  FileText,
  Mail,
  Download,
  Home,
  X,
  Clock,
} from "lucide-react";

type Command = {
  id: string;
  label: string;
  hint?: string;
  icon: React.ComponentType<{ className?: string }>;
  group: "Navigate" | "Actions";
  keywords?: string;
  run: () => void;
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Open/close on Cmd+K / Ctrl+K, close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => {
          if (!o) {
            // reset state when opening
            setQuery("");
            setActive(0);
          }
          return !o;
        });
        return;
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Focus input when opening
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [open]);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const commands: Command[] = useMemo(
    () => [
      { id: "nav-intro", label: "Intro — Tôi là ai", icon: Home, group: "Navigate", keywords: "hero 1 intro about me", run: () => go("intro") },
      { id: "nav-about", label: "About me", icon: Home, group: "Navigate", keywords: "about 2 bio", run: () => go("about") },
      { id: "nav-thinking", label: "How I Think — 5 bước", icon: Home, group: "Navigate", keywords: "thinking 3 process how think", run: () => go("thinking") },
      { id: "nav-work", label: "Case Studies — 3 dự án", icon: Home, group: "Navigate", keywords: "work 4 cases lynk toshiba inblue", run: () => go("work") },
      { id: "nav-heading", label: "Where I'm Heading — Business Analytics", icon: Home, group: "Navigate", keywords: "heading 5 roadmap analytics ba", run: () => go("heading") },
      { id: "nav-contact", label: "Let's Talk — Liên hệ", icon: Home, group: "Navigate", keywords: "contact 6 talk email", run: () => go("contact") },
      { id: "act-top", label: "Về đầu trang", hint: "T", icon: ArrowUp, group: "Actions", keywords: "top home back scroll", run: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
      { id: "act-bottom", label: "Xuống cuối trang", icon: ArrowDown, group: "Actions", keywords: "bottom end contact", run: () => go("contact") },
      { id: "act-email", label: "Gửi email cho Vy", icon: Mail, group: "Actions", keywords: "email mail contact", run: () => (window.location.href = "mailto:tuong.vy11022004@gmail.com?subject=Portfolio — Cơ hội Strategic Planning") },
      { id: "act-cv", label: "Tải CV (PDF)", icon: Download, group: "Actions", keywords: "cv resume pdf download", run: () => window.open("/cv-nguyen-ngoc-tuong-vy.pdf", "_blank") },
    ],
    []
  );

  // Recent commands persisted in localStorage (max 3, most-recent-first)
  const [recentIds, setRecentIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem("vy-cmd-recent");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const recordRecent = useCallback((id: string) => {
    setRecentIds((prev) => {
      const next = [id, ...prev.filter((x) => x !== id)].slice(0, 3);
      try {
        localStorage.setItem("vy-cmd-recent", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);
  const recentCommands = useMemo(
    () =>
      recentIds
        .map((id) => commands.find((c) => c.id === id))
        .filter((c): c is Command => Boolean(c)),
    [recentIds, commands]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.keywords?.toLowerCase().includes(q) ||
        c.group.toLowerCase().includes(q)
    );
  }, [query, commands]);

  // group commands — when no query, show "Recent" group first (if any), then Navigate, then Actions
  const grouped = useMemo(() => {
    const g: Record<string, Command[]> = {};
    const q = query.trim().toLowerCase();
    if (!q && recentCommands.length > 0) {
      g["Recent"] = recentCommands;
    }
    filtered.forEach((c) => {
      // skip commands already shown in Recent
      if (!q && recentCommands.some((r) => r.id === c.id)) return;
      (g[c.group] = g[c.group] || []).push(c);
    });
    return g;
  }, [filtered, query, recentCommands]);

  // flat list for keyboard nav (matches render order)
  const flatForNav = useMemo(() => {
    const q = query.trim().toLowerCase();
    const out: Command[] = [];
    if (!q && recentCommands.length > 0) out.push(...recentCommands);
    filtered.forEach((c) => {
      if (!q && recentCommands.some((r) => r.id === c.id)) return;
      out.push(c);
    });
    return out;
  }, [filtered, query, recentCommands]);

  // safeActive uses flatForNav length
  const safeActive = flatForNav.length === 0 ? 0 : Math.min(active, flatForNav.length - 1);

  // Keep active index in range when filtered list shrinks (no setState-in-effect)
  const onQueryChange = (v: string) => {
    setQuery(v);
    setActive(0);
  };

  // keyboard nav within palette (uses flatForNav which includes recent group)
  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, flatForNav.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cmd = flatForNav[safeActive];
      if (cmd) {
        cmd.run();
        recordRecent(cmd.id);
        setOpen(false);
      }
    }
  };

  // scroll active item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${safeActive}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [safeActive]);

  let runningIdx = -1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[120] flex items-start justify-center px-4 pt-[12vh] sm:pt-[16vh]"
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-ocean/80 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />
          {/* palette */}
          <motion.div
            initial={{ scale: 0.96, y: -10, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: -10, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl overflow-hidden rounded-xl border border-teal/30 bg-ocean-soft shadow-[0_24px_80px_-20px_rgba(0,0,0,0.7)]"
            role="dialog"
            aria-label="Command palette"
          >
            {/* input row */}
            <div className="flex items-center gap-3 border-b border-ocean-line px-4 py-3.5">
              <Search className="h-4 w-4 flex-shrink-0 text-teal" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Tìm section, hành động... (vd: case, email, cv)"
                className="flex-1 bg-transparent text-sm text-offwhite placeholder:text-slate-dim focus:outline-none"
              />
              <button
                onClick={() => setOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-md border border-ocean-line text-slate transition-colors hover:border-teal hover:text-teal"
                aria-label="Đóng"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* results */}
            <div ref={listRef} className="max-h-[50vh] overflow-y-auto py-2">
              {flatForNav.length === 0 && (
                <div className="px-4 py-8 text-center text-sm text-slate-dim">
                  Không tìm thấy lệnh nào cho &ldquo;{query}&rdquo;
                </div>
              )}
              {Object.entries(grouped).map(([group, items]) => (
                <div key={group} className="mb-1">
                  <p className="flex items-center gap-1.5 px-4 py-1.5 text-[0.6rem] uppercase tracking-[0.22em] text-slate-dim">
                    {group === "Recent" && <Clock className="h-3 w-3 text-teal" />}
                    {group}
                  </p>
                  {items.map((c) => {
                    runningIdx += 1;
                    const idx = runningIdx;
                    const isActive = idx === safeActive;
                    const Icon = c.icon;
                    return (
                      <button
                        key={c.id}
                        data-idx={idx}
                        onMouseEnter={() => setActive(idx)}
                        onClick={() => {
                          c.run();
                          recordRecent(c.id);
                          setOpen(false);
                        }}
                        className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors duration-150 ${
                          isActive ? "bg-teal/10 text-offwhite" : "text-slate hover:bg-ocean"
                        }`}
                      >
                        <span
                          className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md border transition-colors ${
                            isActive
                              ? "border-teal/50 bg-teal/10 text-teal"
                              : "border-ocean-line text-slate-dim"
                          }`}
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                        <span className="flex-1 text-sm">{c.label}</span>
                        {c.hint && (
                          <kbd className="rounded border border-ocean-line bg-ocean px-1.5 py-0.5 font-mono text-[0.6rem] uppercase text-slate-dim">
                            {c.hint}
                          </kbd>
                        )}
                        {isActive && (
                          <CornerDownLeft className="h-3.5 w-3.5 text-teal" />
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* footer */}
            <div className="flex items-center justify-between gap-3 border-t border-ocean-line bg-ocean/60 px-4 py-2.5 text-[0.6rem] uppercase tracking-[0.2em] text-slate-dim">
              <span className="flex items-center gap-2">
                <FileText className="h-3 w-3 text-teal" />
                Vy Nguyen · Portfolio
              </span>
              <span className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-ocean-line bg-ocean-soft px-1 py-0.5 text-teal">↑</kbd>
                  <kbd className="rounded border border-ocean-line bg-ocean-soft px-1 py-0.5 text-teal">↓</kbd>
                  chọn
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-ocean-line bg-ocean-soft px-1 py-0.5 text-teal">↵</kbd>
                  chạy
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-ocean-line bg-ocean-soft px-1 py-0.5 text-teal">esc</kbd>
                  đóng
                </span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
