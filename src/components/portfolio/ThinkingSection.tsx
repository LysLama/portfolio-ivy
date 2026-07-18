"use client";

import { motion } from "framer-motion";
import { useReducedMotionClient } from "./useClientHooks";
import { FileText, Search, Crosshair, Presentation, LineChart } from "lucide-react";
import { Reveal } from "./Reveal";

const STEPS = [
  {
    n: "01",
    icon: FileText,
    title: "Đọc brief hai lần",
    lead: "Lần đầu để hiểu khách hàng nói gì. Lần hai để tìm điều khách hàng chưa nói — nỗi lo thật sự thường nằm giữa các dòng chữ.",
    example:
      "Với Lynk & Co, brief nói \"ra mắt sản phẩm\", nhưng bài toán thật là vượt qua định kiến về xuất xứ." },
  {
    n: "02",
    icon: Search,
    title: "Đào dữ liệu và bối cảnh",
    lead: "Tệp độc giả là ai, hành vi ra sao, đối thủ đang làm gì, thị trường đang nói gì về ngành hàng này.",
    example:
      "Mình không bắt đầu nghĩ ý tưởng khi chưa trả lời xong các câu hỏi này." },
  {
    n: "03",
    icon: Crosshair,
    title: "Tìm điểm khớp",
    lead: "Insight với mình không phải điều gì bay bổng — nó là giao điểm giữa cái khách hàng cần, cái người dùng quan tâm, và cái nền tảng đang có sẵn.",
    example:
      "Việc của planner là nhìn ra giao điểm đó trước người khác." },
  {
    n: "04",
    icon: Presentation,
    title: "Đề xuất sao cho khách hàng thấy chính mình",
    lead: "Proposal không phải để khoe chương trình của mình, mà để khách hàng nhìn vào thấy bài toán của họ được giải — quyền lợi rõ ràng, timeline logic, con số cụ thể.",
    example:
      "Bài học lớn nhất từ kỳ thực tập." },
  {
    n: "05",
    icon: LineChart,
    title: "Đo lường và học lại",
    lead: "Mọi kế hoạch đều là một giả định cho đến khi thị trường lên tiếng. Đo, đọc phản hồi — kể cả phản hồi tiêu cực — và điều chỉnh.",
    example: "InBlue dạy mình bước này bằng cách khó nhất." },
];

export function ThinkingSection() {
  const reduce = useReducedMotionClient();

  return (
    <section
      id="thinking"
      className="section-anchor relative overflow-hidden border-t border-ocean-line bg-ocean-soft py-24 sm:py-32 lg:py-40"
    >
      {/* Decorative background line */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-ocean-line to-transparent" />

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Section header */}
        <div className="mb-20 grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow mb-3 text-teal">Phần 02 — How I think</p>
            <h2 className="editorial-title text-5xl !leading-[1.2] text-offwhite sm:text-7xl lg:text-[6.5rem]">
              <span className="block">Cách mình</span>
              <span className="mt-3 inline-flex items-end gap-4 sm:mt-4">
                tư duy
                <span className="script relative -bottom-2 rotate-[10deg] text-3xl text-teal sm:text-4xl">
                  5 bước
                </span>
              </span>
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:pt-10" delay={0.1}>
            <p className="text-lg leading-relaxed text-slate">
              Mỗi planner có một cách làm việc riêng. Đây là quy trình 5 bước
              mình đã tự đúc kết qua các dự án — và vẫn đang tiếp tục mài giũa.
            </p>
          </Reveal>
        </div>

        {/* Journey map — horizontal connected path (desktop) / vertical compact (mobile) */}
        <div className="relative">
          {/* Horizontal connector line through node centers (desktop) */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-7 hidden h-[2px] bg-gradient-to-r from-teal/20 via-teal/60 to-teal/20 lg:block"
          />
          {/* Vertical connector line (mobile) */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-6 left-[27px] top-6 w-[2px] bg-gradient-to-b from-teal/20 via-teal/50 to-teal/20 lg:hidden"
          />

          <ol className="grid gap-10 lg:grid-cols-5 lg:gap-4">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.n} delay={i * 0.08}>
                  <motion.li
                    whileHover={reduce ? undefined : { y: -6 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative flex items-start gap-5 lg:flex-col lg:items-start lg:gap-0"
                  >
                    {/* Node badge — sits on the connector line */}
                    <div className="relative z-10 flex-shrink-0 lg:mb-6">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-teal/40 bg-ocean text-teal transition-all duration-500 group-hover:border-teal group-hover:bg-teal group-hover:text-ocean group-hover:shadow-[0_0_28px_-4px_rgba(46,196,182,0.6)]">
                        <Icon className="h-5 w-5" />
                      </span>
                      {/* step number chip */}
                      <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-ocean-line bg-ocean-soft font-anton text-[0.7rem] text-teal">
                        {step.n}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 lg:pr-2">
                      <h3 className="mb-2.5 font-anton text-xl uppercase leading-tight text-offwhite transition-colors duration-300 group-hover:text-teal sm:text-2xl lg:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mb-3 text-sm leading-relaxed text-slate">
                        {step.lead}
                      </p>
                      <p className="flex items-start gap-2 text-xs italic text-slate-dim">
                        <span className="mt-1.5 h-px w-4 flex-shrink-0 bg-teal/60" />
                        <span>{step.example}</span>
                      </p>
                    </div>
                  </motion.li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
