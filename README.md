# Portfolio — Nguyễn Ngọc Tường Vy

Website portfolio một trang (single-page) cho **Nguyễn Ngọc Tường Vy — Fresher Strategic Planner**.
Giao diện editorial tối (dark), nhiều hiệu ứng cuộn/chuyển động, tối ưu SEO & Open Graph, hỗ trợ tiếng Việt.

> *"Một planner tin rằng ý tưởng chỉ thuyết phục khi đứng trên sự thật được đọc đúng. Data là cách mình đi tìm sự thật đó."*

---

## 🧱 Công nghệ

| Nhóm | Công nghệ |
|------|-----------|
| Framework | **Next.js 16** (App Router, `output: "standalone"`) |
| UI | **React 19**, **TypeScript 5** |
| Styling | **Tailwind CSS v4**, **shadcn/ui** (Radix UI), `tailwindcss-animate` |
| Animation | **Framer Motion** |
| Fonts | Anton, Caveat, Dancing Script, Inter (Google Fonts, có subset `vietnamese`) |
| Data layer | **Prisma 6** + **SQLite** (scaffold — nội dung portfolio hiện là tĩnh) |
| Runtime / package manager | **Bun** |
| Khác | `next-auth`, `next-intl`, `next-themes`, `recharts`, `sonner`, `zod`, `zustand`, `react-hook-form` |

---

## 📁 Cấu trúc thư mục

```
portfolio-ivy/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout: fonts, metadata SEO/OG, Toaster
│   │   ├── page.tsx            # Trang chính — lắp ráp toàn bộ section
│   │   ├── globals.css         # Theme tokens, biến CSS, màu (ocean/teal/offwhite…)
│   │   └── api/route.ts        # API mẫu (GET → hello world)
│   ├── components/
│   │   ├── portfolio/          # Các section & hiệu ứng của portfolio
│   │   │   ├── HeroSection, AboutSection, ThinkingSection,
│   │   │   ├── CaseStudiesSection, HeadingSection, ContactSection, Footer
│   │   │   ├── Header, Marquee, CursorGlow, CommandPalette,
│   │   │   ├── KeyboardShortcuts, ScrollProgress, ReadingProgress,
│   │   │   ├── SectionIndicator, BackToTop, PageLoader, Reveal, AnimatedCounter
│   │   │   └── case-studies-data.ts   # Nội dung các case study (data)
│   │   └── ui/                 # Component shadcn/ui (button, card, dialog…)
│   ├── hooks/                  # use-mobile, use-toast
│   └── lib/                    # db.ts (Prisma client), utils.ts (cn helper)
├── prisma/schema.prisma        # Model User & Post (SQLite)
├── public/                     # Ảnh, logo, CV (PDF), og-image, robots.txt
├── download/                   # Bản HTML của CV & OG image
├── AGENT.md                    # Guideline UI/UX (accessibility, animation, perf…)
├── next.config.ts              # standalone, ignoreBuildErrors, reactStrictMode off
├── tailwind.config.ts
└── package.json
```

Trang được lắp ráp trong [src/app/page.tsx](src/app/page.tsx) theo thứ tự:
**Hero → About → Marquee → Thinking → Case Studies → Heading → Contact → Footer**,
kèm các lớp phủ tương tác (CursorGlow, CommandPalette, ScrollProgress, KeyboardShortcuts…).

---

## 🚀 Bắt đầu

### 1. Yêu cầu

- **Bun** ≥ 1.3 (khuyến nghị — dự án dùng `bun.lock` và server standalone chạy bằng Bun)
  Hoặc Node.js ≥ 18 nếu dùng npm (`package-lock.json` có sẵn).

### 2. Cài đặt

```bash
# Bằng Bun (khuyến nghị)
bun install

# Hoặc npm
npm install
```

### 3. Biến môi trường

Prisma cần biến `DATABASE_URL`. Tạo file `.env` ở gốc dự án:

```bash
# .env
DATABASE_URL="file:./dev.db"
```

> Lưu ý: nội dung portfolio hiện tại là **tĩnh** (nằm trong `case-studies-data.ts` và các component), nên bạn có thể chạy site mà chưa cần database. Chỉ cần thiết lập DB khi làm việc với Prisma.

### 4. Khởi tạo database (tuỳ chọn)

```bash
bun run db:generate   # sinh Prisma Client
bun run db:push       # tạo schema vào SQLite
```

### 5. Chạy dev

```bash
bun run dev
```

Mở http://localhost:3000 — server chạy ở cổng **3000** và log được ghi vào `dev.log`.

---

## 📜 Các script

| Lệnh | Mô tả |
|------|-------|
| `bun run dev` | Chạy dev server ở cổng 3000 (ghi log ra `dev.log`) |
| `bun run build` | Build production (standalone) + copy `static/` và `public/` vào output |
| `bun run start` | Chạy server production từ bản standalone bằng Bun (ghi `server.log`) |
| `bun run lint` | Chạy ESLint |
| `bun run db:push` | Đồng bộ schema Prisma vào SQLite |
| `bun run db:generate` | Sinh Prisma Client |
| `bun run db:migrate` | Tạo & chạy migration (dev) |
| `bun run db:reset` | Reset database |

### Build & chạy production

```bash
bun run build
bun run start
```

`next.config.ts` bật `output: "standalone"` nên bước `build` sẽ tự copy `.next/static` và `public/` vào `.next/standalone/` để deploy độc lập.

---

## ⌨️ Tính năng tương tác

- **Command Palette** — mở nhanh bằng phím tắt (⌘/Ctrl + K) để điều hướng.
- **Keyboard Shortcuts** — di chuyển giữa các section bằng bàn phím.
- **Cursor Glow**, **Marquee**, **Reveal**, **AnimatedCounter** — hiệu ứng chuyển động.
- **Scroll / Reading Progress**, **Section Indicator**, **Back To Top** — hỗ trợ điều hướng khi cuộn.
- Tuân thủ guideline accessibility & performance trong [AGENT.md](AGENT.md) (focus rings, `prefers-reduced-motion`, hit target ≥24px, tối ưu re-render…).

---

## ✏️ Tuỳ biến nội dung

| Muốn sửa | File |
|----------|------|
| Case study (dự án) | [src/components/portfolio/case-studies-data.ts](src/components/portfolio/case-studies-data.ts) |
| Thông tin cá nhân / giới thiệu | [src/components/portfolio/AboutSection.tsx](src/components/portfolio/AboutSection.tsx), [HeroSection.tsx](src/components/portfolio/HeroSection.tsx) |
| Liên hệ | [src/components/portfolio/ContactSection.tsx](src/components/portfolio/ContactSection.tsx) |
| SEO / Open Graph | [src/app/layout.tsx](src/app/layout.tsx) (`metadata`) |
| Màu sắc / theme | [src/app/globals.css](src/app/globals.css) (biến `--ocean`, `--teal`, `--offwhite`…) |
| Ảnh, CV, og-image | thư mục [public/](public/) |

---

## 🗄️ Database (Prisma)

Schema hiện có 2 model mẫu trong [prisma/schema.prisma](prisma/schema.prisma):

- `User` — id, email, name, timestamps
- `Post` — id, title, content, published, authorId, timestamps

Đây là scaffold khởi tạo; portfolio chưa gắn dữ liệu động vào giao diện. Prisma Client được khởi tạo tại [src/lib/db.ts](src/lib/db.ts) (dạng singleton, an toàn khi hot-reload).

---

## 📝 Ghi chú

- `next.config.ts` đặt `typescript.ignoreBuildErrors: true` và `reactStrictMode: false` — build sẽ không dừng vì lỗi type. Cân nhắc bật lại khi cần độ nghiêm ngặt cao hơn.
- File nhạy cảm (`.env`, `*.db`, `*.log`, `AGENT.md`, thư mục agent…) đã được `.gitignore` bỏ qua.
- Ngôn ngữ mặc định của trang là tiếng Việt (`<html lang="vi">`).
