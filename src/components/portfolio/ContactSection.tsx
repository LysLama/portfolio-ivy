"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Download, ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { AccentLine } from "./AccentLine";
import { Magnetic } from "./CursorGlow";

const CONTACTS = [
  {
    icon: Mail,
    label: "Email",
    value: "tuong.vy11022004@gmail.com",
    href: "mailto:tuong.vy11022004@gmail.com",
  },
  {
    icon: Phone,
    label: "Điện thoại",
    value: "0943 451 104",
    href: "tel:0943451104",
  },
  {
    icon: MapPin,
    label: "Địa điểm",
    value: "TP. Hồ Chí Minh",
    href: undefined,
  },
];

export function ContactSection() {
  return (
    <section
      id="contact"
      className="section-anchor relative overflow-hidden border-t border-ocean-line py-24 sm:py-32 lg:py-40"
    >
      {/* Background image */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-15">
        <img
          src="/images/trekking-island.png"
          alt=""
          aria-hidden
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean via-ocean/80 to-ocean" />
      </div>
      <div className="radial-teal pointer-events-none absolute inset-0 -z-10" />

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Eyebrow */}
        <Reveal className="mb-8 flex items-center gap-4">
          <AccentLine className="w-12" color="bg-teal" />
          <span className="eyebrow text-teal">Phần 05 — Liên hệ</span>
        </Reveal>

        {/* Huge title */}
        <Reveal>
          <h2 className="editorial-title text-offwhite">
            <span className="block text-[18vw] leading-[0.85] sm:text-[15vw] lg:text-[13vw] xl:text-[12vw]">
              LET&apos;S
            </span>
            <span className="relative block text-[18vw] leading-[0.85] sm:text-[15vw] lg:text-[13vw] xl:text-[12vw]">
              <span
                className="bg-gradient-to-br from-teal-bright via-teal to-teal/70 bg-clip-text text-transparent"
                style={{
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                TALK
              </span>
              <span className="signature pointer-events-none absolute -right-1 top-[-0.45em] rotate-[-4deg] text-2xl text-offwhite sm:text-4xl lg:text-5xl xl:text-6xl">
                thank you
              </span>
              {/* underline accent */}
              <span className="absolute -bottom-2 left-0 h-1.5 w-24 bg-gradient-to-r from-teal to-transparent sm:w-40" />
            </span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: thank-you message + CTA */}
          <Reveal className="lg:col-span-7">
            <p className="mb-8 text-xl leading-relaxed text-offwhite sm:text-2xl">
              Nếu bạn đã đọc đến đây, cảm ơn bạn đã dành thời gian cho hành trình
              đầu tiên của mình. Mình đang tìm kiếm cơ hội ở vị trí{" "}
              <span className="accent-underline font-medium">
                Strategic Planning
              </span>{" "}
              tại agency hoặc brand — nơi mình được học từ những planner giỏi và
              đóng góp bằng chính cách tư duy trong portfolio này.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Magnetic strength={0.3} radius={120}>
                <a
                  href="mailto:tuong.vy11022004@gmail.com?subject=Portfolio%20%E2%80%94%20C%C6%A1%20h%E1%BB%99i%20Strategic%20Planning"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-br from-teal-bright to-teal px-7 py-4 text-sm font-medium uppercase tracking-[0.16em] text-ocean shadow-[0_8px_30px_-8px_rgba(46,196,182,0.5)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_40px_-8px_rgba(46,196,182,0.7)]"
                >
                  <Mail className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" />
                  <span className="relative z-10">Gửi email cho mình</span>
                  <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  {/* glossy sweep */}
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </a>
              </Magnetic>
              <Magnetic strength={0.25} radius={100}>
                <a
                  href="/cv-nguyen-ngoc-tuong-vy.pdf"
                  download="CV-Nguyen-Ngoc-Tuong-Vy.pdf"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-teal/50 bg-ocean-soft px-7 py-4 text-sm font-medium uppercase tracking-[0.16em] text-offwhite transition-all duration-300 hover:-translate-y-0.5 hover:border-teal hover:bg-teal/10 hover:shadow-[0_8px_30px_-8px_rgba(46,196,182,0.3)]"
                >
                  <Download className="h-4 w-4 text-teal transition-transform duration-300 group-hover:translate-y-0.5 group-hover:scale-110" />
                  Tải CV (PDF)
                  {/* bottom sweep accent */}
                  <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-teal transition-all duration-500 group-hover:w-full" />
                </a>
              </Magnetic>
            </div>
          </Reveal>

          {/* Right: contact list */}
          <Reveal className="lg:col-span-5" delay={0.1}>
            <ul className="space-y-3">
              {CONTACTS.map((c) => {
                const Icon = c.icon;
                const inner = (
                  <div className="group flex items-center gap-5 rounded-lg border border-ocean-line bg-ocean-soft p-6 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:border-teal/50 hover:shadow-[0_12px_40px_-16px_rgba(46,196,182,0.3)]">
                    <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-teal/40 bg-ocean text-teal transition-all duration-300 group-hover:scale-110 group-hover:bg-teal group-hover:text-ocean group-hover:shadow-[0_0_20px_-4px_rgba(46,196,182,0.6)]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="eyebrow mb-1 text-slate-dim">{c.label}</p>
                      <p className="break-all text-lg text-offwhite transition-colors duration-300 group-hover:text-teal">
                        {c.value}
                      </p>
                    </div>
                    {c.href && (
                      <ArrowUpRight className="h-5 w-5 flex-shrink-0 text-slate transition-all duration-300 group-hover:text-teal group-hover:translate-x-1 group-hover:-translate-y-1" />
                    )}
                  </div>
                );
                return (
                  <li key={c.label}>
                    {c.href ? (
                      <a href={c.href} className="block">
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
