"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotionClient } from "./useClientHooks";
import { Compass, Waves, Map, GraduationCap, Briefcase, BookOpen, Calendar } from "lucide-react";
import { Reveal } from "./Reveal";
import { AnimatedCounter } from "./AnimatedCounter";
import { AccentLine } from "./AccentLine";

const FACTS = [
  { k: "Đại học", v: "FPT University", icon: GraduationCap },
  { k: "Ngành", v: "Digital Marketing", icon: BookOpen },
  { k: "Kỳ", v: "Sinh viên năm cuối", icon: Calendar },
  { k: "Thực tập", v: "Planning Intern · FPT Online", icon: Briefcase },
];

const SKILLS: { category: string; items: string[] }[] = [
  {
    category: "Planning",
    items: ["Strategic Planning", "Brief Reading", "Audience Research", "Proposal Building"] },
  {
    category: "Data",
    items: ["Google Analytics", "Excel", "SQL (đang học)", "Looker Studio (đang học)"] },
  {
    category: "Khác",
    items: ["Roadmap Timelines", "Stakeholder Pitching", "A/B Testing", "Content Strategy"] },
];

const SKILL_LEVELS: { name: string; level: number; label: string }[] = [
  { name: "Strategic Planning", level: 85, label: "Thực chiến" },
  { name: "Audience Research", level: 80, label: "Thực chiến" },
  { name: "Google Analytics", level: 65, label: "Đang học" },
  { name: "SQL", level: 40, label: "Đang học" },
];

export function AboutSection() {
  const reduce = useReducedMotionClient();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"] });
  // Photo parallax: moves slower than scroll, -30px to +30px
  const photoY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-20, 20]);
  const photoScale = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [1, 1, 1] : [1.08, 1, 1.08]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-anchor relative overflow-hidden border-t border-ocean-line py-24 sm:py-32 lg:py-40"
    >
      {/* Section label */}
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <Reveal className="mb-16 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-3 text-teal">About me</p>
            <h2 className="editorial-title text-5xl !leading-[1.2] text-offwhite sm:text-7xl lg:text-8xl">
              <span className="block">Planner bằng</span>
              <span className="mt-3 block sm:mt-4">
                <span className="text-slate">trực giác</span>{" "}
                <span className="text-teal">+</span>{" "}
                <span className="relative text-teal-bright">
                  data
                  <span className="absolute bottom-1 left-0 right-0 h-1 bg-teal-bright" />
                </span>
              </span>
            </h2>
          </div>
          <span className="hidden font-anton text-7xl leading-none text-ocean-line lg:block">
            01
          </span>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Portrait / photo */}
          <Reveal className="lg:col-span-5" y={36}>
            <div className="img-zoom vignette relative aspect-[4/5] overflow-hidden rounded-md border border-ocean-line">
              <motion.img
                src="/images/me.jpg"
                alt="Chân dung Nguyễn Ngọc Tường Vy"
                className="h-[110%] w-full object-cover"
                style={{ y: photoY, scale: photoScale }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ocean/80 via-transparent to-transparent" />
              {/* Floating caption */}
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <p className="signature text-2xl text-teal">biển &amp; núi</p>
                  <p className="text-xs uppercase tracking-[0.22em] text-offwhite/80">
                    ngoài giờ làm việc
                  </p>
                </div>
                <Compass className="h-6 w-6 animate-float-slow text-teal" />
              </div>
            </div>

            {/* Facts strip under photo */}
            <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-ocean-line bg-ocean-line">
              {FACTS.map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.k}
                    className="group bg-ocean-soft p-4 transition-colors duration-300 hover:bg-ocean"
                  >
                    <dt className="mb-2 flex items-center gap-2">
                      <Icon className="h-3.5 w-3.5 text-teal transition-transform duration-300 group-hover:scale-110" />
                      <span className="eyebrow text-slate-dim">{f.k}</span>
                    </dt>
                    <dd className="text-sm text-offwhite">{f.v}</dd>
                  </div>
                );
              })}
            </dl>
          </Reveal>

          {/* Text content */}
          <div className="lg:col-span-7 lg:pl-6">
            <Reveal>
              <p className="mb-6 text-xl leading-relaxed text-offwhite sm:text-2xl">
                Mình là sinh viên năm cuối ngành Digital Marketing tại FPT
                University, vừa hoàn thành kỳ thực tập vị trí{" "}
                <span className="accent-underline font-medium">
                  Planning Intern tại FPT Online
                </span>
                .
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mb-6 leading-relaxed text-slate">
                Mình đến với planning từ một thói quen: trước khi tin vào bất kỳ
                ý tưởng nào, mình muốn biết nó đứng trên điều gì. Ở FPT Online,
                thói quen đó trở thành công việc hằng ngày — nhận brief từ khách
                hàng, đào vào dữ liệu độc giả và bối cảnh ngành hàng, rồi chuyển
                những gì tìm được thành một bản đề xuất mà khách hàng nhìn vào
                thấy chính bài toán của họ được giải.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mb-6 leading-relaxed text-slate">
                Ba dự án trong portfolio này là những bước đi đầu tiên của mình:
                hai proposal hợp tác thương hiệu cho{" "}
                <span className="text-offwhite">Tech Awards</span> và{" "}
                <span className="text-offwhite">Car Awards 2025</span> tại FPT
                Online, và một sản phẩm khởi nghiệp mình theo từ nghiên cứu thị
                trường đến{" "}
                <span className="font-medium text-teal">19 khách hàng trả phí</span>{" "}
                đầu tiên. Mình kể lại chúng đúng như những gì đã diễn ra — cả
                những quyết định mình tự hào lẫn những phản hồi khiến mình phải
                làm lại từ đầu, vì mình nghĩ cách một người sửa sai nói nhiều về
                họ hơn là thành quả cuối cùng.
              </p>
            </Reveal>

            {/* Stats / achievements row */}
            <Reveal delay={0.2}>
              <div className="my-8 grid grid-cols-3 gap-px overflow-hidden rounded-md border border-ocean-line bg-ocean-line">
                {[
                  { v: "3", label: "Dự án thực tế" },
                  { v: "2", label: "Pitch với nhãn hàng" },
                  { v: "19", label: "Khách trả phí" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="group bg-ocean-soft p-4 text-center transition-colors duration-300 hover:bg-ocean"
                  >
                    <p className="font-anton text-4xl text-teal transition-transform duration-300 group-hover:scale-105">
                      <AnimatedCounter value={s.v} />
                    </p>
                    <p className="mt-1 text-[0.6rem] uppercase tracking-[0.16em] text-slate">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Skills / competency tags */}
            <Reveal delay={0.22}>
              <div className="my-8">
                <div className="mb-4 flex items-center gap-3">
                  <span className="eyebrow text-teal">— Năng lực</span>
                  <AccentLine className="flex-1" />
                </div>
                <div className="space-y-4">
                  {SKILLS.map((group) => (
                    <div key={group.category} className="flex flex-wrap items-center gap-2.5">
                      <span className="mr-1 font-anton text-xs uppercase tracking-[0.16em] text-slate-dim">
                        {group.category}
                      </span>
                      {group.items.map((skill) => (
                        <span
                          key={skill}
                          className="group/chip inline-flex items-center rounded-full border border-ocean-line bg-ocean-soft px-3 py-1.5 text-xs text-offwhite transition-all duration-300 hover:-translate-y-0.5 hover:border-teal/50 hover:bg-teal/10 hover:text-teal"
                        >
                          <span className="mr-1.5 h-1 w-1 rounded-full bg-teal/60 transition-colors duration-300 group-hover/chip:bg-teal" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Skill proficiency matrix */}
            <Reveal delay={0.24}>
              <div className="my-8 rounded-md border border-ocean-line bg-ocean-soft/50 p-5">
                <div className="mb-4 flex items-center gap-3">
                  <span className="eyebrow text-teal">— Mức độ</span>
                  <AccentLine className="flex-1" />
                </div>
                <div className="space-y-3">
                  {SKILL_LEVELS.map((s) => (
                    <div key={s.name} className="group/skill">
                      <div className="mb-1.5 flex items-center justify-between gap-3">
                        <span className="text-sm text-offwhite">{s.name}</span>
                        <span className="flex items-center gap-2">
                          <span
                            className={`font-mono text-[0.6rem] uppercase tracking-[0.16em] ${
                              s.level >= 70 ? "text-teal" : "text-slate-dim"
                            }`}
                          >
                            {s.label}
                          </span>
                          <span className="font-anton text-sm text-teal">{s.level}</span>
                        </span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-ocean-line">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-teal to-teal-bright"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${s.level}%` }}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="group relative mt-10 overflow-hidden rounded-md border border-teal/40 bg-gradient-to-br from-teal/[0.08] via-teal/[0.03] to-transparent p-7 shadow-[0_18px_60px_-30px_rgba(46,196,182,0.35)]">
                {/* top accent line */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal/60 to-transparent" />
                {/* large decorative wave */}
                <div className="pointer-events-none absolute -right-8 -top-8 opacity-15 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6">
                  <Waves className="h-36 w-36 text-teal" />
                </div>
                <div className="relative">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal/20 text-teal">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-teal" />
                    </span>
                    <span className="eyebrow text-teal">— Ngoài giờ</span>
                    <AccentLine className="ml-auto flex-1" color="bg-teal/20" />
                  </div>
                  <p className="text-lg italic leading-relaxed text-offwhite sm:text-xl">
                    Ngoài giờ làm việc, mình thuộc về biển — những hòn đảo, những
                    chuyến trekking dài. Với mình, trekking và planning giống nhau
                    ở một điểm:{" "}
                    <span className="font-medium not-italic text-teal">
                      muốn đến đích thì phải đọc đúng bản đồ trước khi bước đi.
                    </span>
                  </p>
                  <div className="mt-5 flex items-center gap-3 border-t border-teal/20 pt-4">
                    <Map className="h-4 w-4 flex-shrink-0 text-teal" />
                    <span className="script text-xl text-teal">
                      Đọc đúng bản đồ trước khi bước đi
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
