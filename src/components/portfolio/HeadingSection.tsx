"use client";

import { motion } from "framer-motion";
import { useReducedMotionClient } from "./useClientHooks";
import { Database, Brain, BarChart3, Target } from "lucide-react";
import { Reveal, RevealStagger, RevealItem } from "./Reveal";

const LIMITS = [
  {
    n: "01",
    title: "Mới đọc được dữ liệu người khác chuẩn bị sẵn",
    body: "Chưa tự khai thác được dữ liệu thô. Khi cần số liệu độc giả, mình phụ thuộc vào báo cáo có sẵn thay vì tự truy vấn được điều mình muốn biết." },
  {
    n: "02",
    title: "Phân tích phản hồi bằng trực giác và Excel cơ bản",
    body: "Nếu mẫu không phải 40 người mà là 4.000 người, cách làm đó sẽ không còn dùng được." },
  {
    n: "03",
    title: "Đề xuất mới dừng ở \"chỉ số dự kiến\"",
    body: "Mình chưa từng tự thiết kế một khung đo lường hoàn chỉnh để chứng minh chiến dịch hiệu quả đến đâu và vì sao." },
];

const QUARTERS = [
  {
    q: "Q1",
    period: "Tháng 1–3",
    title: "Học cách tổ chức vận hành — và học im lặng đúng lúc",
    work: {
      goal: "Hiểu trọn quy trình từ brief đến proposal của công ty",
      detail:
        "Cách các anh chị senior debrief khách hàng, cách một brief được mổ xẻ, chuẩn chất lượng của một bản đề xuất được duyệt. Chỉ tiêu: tham gia hỗ trợ tối thiểu 3 proposal với vai trò research và chuẩn bị dữ liệu đầu vào, và sau mỗi dự án chủ động xin một buổi feedback 15 phút." },
    data: {
      goal: "Hệ thống lại nền tảng + học SQL cơ bản",
      detail:
        "Hệ thống lại nền tảng đã có từ chứng chỉ Google Data Analytics và bắt đầu học SQL cơ bản — đủ để tự truy vấn thay vì chờ số liệu được xuất sẵn." } },
  {
    q: "Q2",
    period: "Tháng 4–6",
    title: "Nhận phần việc riêng đầu tiên",
    work: {
      goal: "Được tin tưởng giao trọn một phần trong proposal lớn",
      detail:
        "Phần phân tích thị trường và chân dung khách hàng — và làm phần đó tốt đến mức senior không phải sửa cấu trúc, chỉ góp ý chi tiết." },
    data: {
      goal: "Học GA4 bài bản + Looker Studio",
      detail:
        "Học GA4 một cách bài bản (không chỉ đọc dashboard mà hiểu cách sự kiện được đo) và bắt đầu dùng Looker Studio để trực quan hóa — mục tiêu cuối quý là tự dựng được một dashboard theo dõi hiệu quả nội dung cho một dự án thật của team, dù nhỏ." } },
  {
    q: "Q3",
    period: "Tháng 7–9",
    title: "Đưa dữ liệu vào bàn planning",
    work: {
      goal: "Chủ động đề xuất một phân tích mà team chưa ai làm",
      detail:
        "Ví dụ phân tích hành vi tệp độc giả theo ngành hàng để việc chọn kênh trong proposal có căn cứ hơn, hoặc tổng hợp dữ liệu các chiến dịch cũ thành benchmark nội bộ cho team tham chiếu." },
    data: {
      goal: "Học thống kê ứng dụng ở mức thực chiến",
      detail:
        "Đọc hiểu ý nghĩa mẫu, biết khi nào một chênh lệch là thật và khi nào chỉ là nhiễu — chính là điều mình thiếu khi phân tích 40 phản hồi InBlue." } },
  {
    q: "Q4",
    period: "Tháng 10–12",
    title: "Đi trọn một vòng có đo lường",
    work: {
      goal: "Tham gia dự án từ brief đến báo cáo kết quả",
      detail:
        "Phụ trách thiết kế khung đo lường ngay từ đầu — xác định chỉ số nào chứng minh mục tiêu nào, đo bằng công cụ gì, đọc kết quả ra sao. Kết thúc dự án, tự viết một bản \"learning report\" cho team: điều gì hiệu quả, điều gì không, và dữ liệu gợi ý gì cho chiến dịch sau." },
    data: {
      goal: "Khép vòng lặp đề xuất → đo lường → học",
      detail:
        "Nếu làm được điều này, mình đã chứng minh được đúng con người mình muốn trở thành — planner khép được vòng lặp đề xuất → thực thi → đo lường → học." } },
];

export function HeadingSection() {
  const reduce = useReducedMotionClient();

  return (
    <section
      id="heading"
      className="section-anchor relative overflow-hidden border-t border-ocean-line bg-ocean-soft py-24 sm:py-32 lg:py-40"
    >
      {/* Background data viz image */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]">
        <img
          src="/images/roadmap-data.png"
          alt=""
          aria-hidden
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-20 grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <p className="eyebrow mb-3 text-teal">Phần 04 — Where I'm heading</p>
            <h2 className="editorial-title text-5xl !leading-[1.02] text-offwhite sm:text-7xl lg:text-[6.5rem]">
              <span className="block">Vì sao là</span>
              <span className="block text-teal">Business</span>
              <span className="inline-flex items-end gap-4">
                Analytics
                <span className="script relative -bottom-2 rotate-[10deg] whitespace-nowrap text-2xl text-teal sm:text-3xl">
                  không phải lối rẽ
                </span>
              </span>
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-4 lg:pt-16" delay={0.1}>
            <p className="leading-relaxed text-slate">
              Qua ba dự án trên, mình nhận ra một điểm chung: mọi quyết định
              planning tốt nhất của mình đều bắt đầu từ một con số được đọc đúng.
            </p>
          </Reveal>
        </div>

        {/* The three limits */}
        <RevealStagger className="mb-24 grid gap-5 md:grid-cols-3" stagger={0.1}>
          {LIMITS.map((l) => (
            <RevealItem key={l.n}>
              <div className="card-glow group h-full rounded-md border border-ocean-line bg-ocean p-7">
                <div className="mb-5 flex items-center justify-between">
                  <span className="num-outline font-anton text-5xl transition-all duration-500 group-hover:text-teal group-hover:[-webkit-text-stroke:0]">
                    {l.n}
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-teal/40 text-teal">
                    <Target className="h-4 w-4" />
                  </span>
                </div>
                <h3 className="mb-3 text-lg font-medium leading-snug text-offwhite">
                  {l.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate">{l.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>

        {/* The answer — BA */}
        <Reveal className="mb-24">
          <div className="group relative overflow-hidden rounded-lg border border-teal/40 bg-gradient-to-br from-teal/[0.1] via-teal/[0.04] to-transparent p-8 shadow-[0_24px_70px_-30px_rgba(46,196,182,0.4)] sm:p-12 lg:p-16">
            {/* top accent line */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal to-transparent" />
            {/* decorative database icon */}
            <div className="pointer-events-none absolute -right-10 -top-10 opacity-10 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6">
              <Database className="h-48 w-48 text-teal" />
            </div>
            <div className="relative grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal/20 text-teal">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-teal" />
                  </span>
                  <p className="eyebrow text-teal">Câu trả lời</p>
                  <span className="ml-auto h-px flex-1 bg-teal/20" />
                </div>
                <p className="text-xl leading-relaxed text-offwhite sm:text-2xl">
                  Business Analytics với mình là câu trả lời cho đúng ba giới hạn
                  đó. Mình không học BA để trở thành analyst ngồi tách biệt với
                  đội creative — mình học BA để trở thành planner mà{" "}
                  <span className="accent-underline font-medium">
                    mỗi đề xuất đưa ra đều có một tầng dữ liệu vững bên dưới
                  </span>
                  , và mỗi chiến dịch kết thúc đều để lại bài học đo được cho
                  chiến dịch sau.
                </p>
              </div>
              <div className="relative lg:col-span-5 lg:border-l lg:border-teal/20 lg:pl-8">
                {/* quote mark accent */}
                <span className="signature absolute -left-2 -top-4 text-5xl text-teal/20 lg:-left-1">
                  &ldquo;
                </span>
                <div className="flex items-start gap-3">
                  <Brain className="mt-1 h-6 w-6 flex-shrink-0 text-teal" />
                  <p className="text-lg italic leading-relaxed text-offwhite">
                    Hình dung của mình về bản thân: một planner mà khi cả phòng
                    họp đang tranh luận bằng cảm giác, có thể mở dữ liệu ra và{" "}
                    <span className="font-medium not-italic text-teal">
                      chỉ vào nơi câu trả lời đang nằm.
                    </span>
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-2 border-t border-teal/15 pt-3">
                  <span className="h-1 w-1 rounded-full bg-teal" />
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-slate-dim">
                    / vision
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 12-month roadmap */}
        <Reveal className="mb-12">
          <div className="flex flex-col gap-4 border-t border-teal/40 pt-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow mb-2 text-teal">Lộ trình 12 tháng</p>
              <h3 className="editorial-title text-4xl text-offwhite sm:text-5xl lg:text-6xl">
                Năm đầu tiên
              </h3>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-slate">
              Mỗi quý gồm một mục tiêu công việc và một mục tiêu năng lực dữ
              liệu chạy song song. Mình tin một junior không nên chỉ hứa{" "}
              <span className="text-offwhite">"sẽ cố gắng học hỏi"</span> — nên
              nói rõ mình định học gì, đóng góp gì, theo trình tự nào.
            </p>
          </div>
        </Reveal>

        {/* Timeline */}
        <div className="relative">
          {/* vertical line */}
          <div className="pointer-events-none absolute left-6 top-0 h-full w-px bg-gradient-to-b from-teal via-ocean-line to-transparent lg:left-1/2 lg:-translate-x-1/2" />

          <div className="space-y-12 lg:space-y-16">
            {QUARTERS.map((q, i) => {
              const isRight = i % 2 === 1;
              const progress = (i + 1) * 25; // 25, 50, 75, 100
              return (
                <Reveal key={q.q} delay={i * 0.05}>
                  <div
                    className={`group relative grid gap-6 pl-16 lg:grid-cols-2 lg:gap-16 lg:pl-0 ${
                      isRight ? "lg:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    {/* Node dot — larger with quarter label */}
                    <div className="absolute left-6 top-3 z-10 -translate-x-1/2 lg:left-1/2">
                      <span className="relative flex h-10 w-10 items-center justify-center">
                        <span className="absolute h-10 w-10 animate-ping rounded-full bg-teal/20" />
                        <span className="absolute h-10 w-10 rounded-full border border-teal/40" />
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal ring-[5px] ring-ocean-soft">
                          <span className="font-anton text-[0.65rem] text-ocean">
                            {q.q.replace("Q", "")}
                          </span>
                        </span>
                      </span>
                    </div>

                    {/* Quarter header card */}
                    <div className={isRight ? "lg:pl-12" : "lg:pr-12 lg:text-right"}>
                      <p className="signature text-3xl text-teal">{q.period}</p>
                      <h4 className="mt-1 font-anton text-6xl uppercase leading-none text-offwhite sm:text-7xl">
                        {q.q}
                      </h4>
                      <p className="mt-3 text-lg font-medium leading-snug text-offwhite">
                        {q.title}
                      </p>
                      {/* progress bar */}
                      <div className="mt-5">
                        <div className="mb-1.5 flex items-center justify-between gap-2 text-[0.6rem] uppercase tracking-[0.2em] text-slate-dim">
                          <span>Tiến độ năm</span>
                          <span className="font-anton text-teal">{progress}%</span>
                        </div>
                        <div className="h-1 overflow-hidden rounded-full bg-ocean-line">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-teal to-teal-bright"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${progress}%` }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Goals: work + data */}
                    <div className={isRight ? "lg:pr-12" : "lg:pl-12"}>
                      <div className="space-y-4">
                        {/* Work goal */}
                        <div className="card-glow rounded-md border border-ocean-line bg-ocean p-5">
                          <div className="mb-2 flex items-center gap-2">
                            <BarChart3 className="h-4 w-4 text-teal" />
                            <span className="eyebrow text-teal">
                              Mục tiêu công việc
                            </span>
                          </div>
                          <p className="mb-2 font-medium text-offwhite">
                            {q.work.goal}
                          </p>
                          <p className="text-sm leading-relaxed text-slate">
                            {q.work.detail}
                          </p>
                        </div>
                        {/* Data goal */}
                        <div className="card-glow rounded-md border border-teal/30 bg-teal/[0.06] p-5">
                          <div className="mb-2 flex items-center gap-2">
                            <Database className="h-4 w-4 text-teal" />
                            <span className="eyebrow text-teal">
                              Mục tiêu năng lực dữ liệu
                            </span>
                          </div>
                          <p className="mb-2 font-medium text-offwhite">
                            {q.data.goal}
                          </p>
                          <p className="text-sm leading-relaxed text-slate">
                            {q.data.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Success metric quote */}
        <Reveal className="mt-20">
          <div className="relative overflow-hidden rounded-md border border-ocean-line bg-ocean p-8 text-center sm:p-12">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal to-transparent" />
            <p className="eyebrow mb-4 text-teal">Sau 12 tháng — thước đo thành công</p>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-offwhite sm:text-2xl">
              Thước đo thành công của mình không phải chức danh, mà là một câu
              hỏi: khi team cần một bản kế hoạch vừa có ý tưởng vừa có căn cứ,{" "}
              <span className="accent-underline font-medium">
                mình có nằm trong những cái tên đầu tiên được nghĩ đến không.
              </span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
