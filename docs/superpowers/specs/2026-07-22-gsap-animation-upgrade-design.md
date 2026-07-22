# Thiết kế: Nâng cấp animation portfolio bằng GSAP

- **Ngày**: 2026-07-22
- **Dự án**: portfolio-ivy (Next.js 16 · React 19 · Tailwind v4 · Framer Motion)
- **Trạng thái**: Đã duyệt thiết kế — chuẩn bị lập plan triển khai
- **Hướng đã chọn**: A — "GSAP zones trên native scroll" (không dùng ScrollSmoother)

---

## 1. Mục tiêu

Đưa GSAP vào để tạo những hiệu ứng động độc đáo, đẹp mắt cho 4 vùng: **Hero, Marquee, Case Studies, và các chi tiết scroll toàn cục** — mà **không phá vỡ** các animation/tương tác Framer Motion đang chạy tốt.

Ràng buộc vận hành quan trọng: **code đi thẳng ra production qua Vercel, không chạy thử trên máy local.** Vì vậy mỗi phase phải `bun run build` pass trước khi commit, và ưu tiên phương án ít rủi ro.

---

## 2. Nguyên tắc kiến trúc (coexistence)

**Framer Motion và GSAP cùng tồn tại, phân vai rõ ràng:**

| Hệ | Phụ trách |
|----|-----------|
| **GSAP** | Hero (intro timeline + SplitText + parallax scrub), Marquee (loop theo vận tốc cuộn), Case Studies (reveal/scroll-driven quanh rail), điểm nhấn scroll toàn cục |
| **Framer Motion** (giữ nguyên) | `Reveal`/`RevealStagger`/`RevealItem`, `ScrollProgress`, `Magnetic`/`CursorGlow`, morph `layoutId` của Case Studies overlay, micro-interaction UI |

**Quy tắc bất biến:**

1. **KHÔNG dùng `ScrollSmoother`.** Nó hijack scroll bằng transform → phá `useScroll` của Framer (thanh `ScrollProgress`, parallax Hero cũ), phá link anchor `#work`/`#thinking` và scroll của Command Palette. Native scroll phải được giữ nguyên để hai thư viện đọc chung `window.scrollY` mà không tranh chấp.
2. **KHÔNG chạm vào morph `layoutId`** của Case Studies overlay (shared-element Framer). GSAP chỉ thêm hiệu ứng *xung quanh* rail, không thay cơ chế mở/đóng chi tiết.
3. Một phần tử chỉ do **một** hệ điều khiển tại một thời điểm (tránh Framer và GSAP cùng set `transform` trên cùng node). Khi GSAP tiếp quản Hero intro/parallax, phần đó gỡ khỏi Framer.
4. Mọi hiệu ứng GSAP bọc trong **`gsap.matchMedia()`** để tôn trọng `prefers-reduced-motion` (đúng mandate trong `AGENT.md`).

---

## 3. Hạ tầng

**Dependencies mới:**

- `gsap` (3.13+, toàn bộ plugin đã miễn phí: ScrollTrigger, SplitText, Observer…)
- `@gsap/react` — cung cấp hook `useGSAP()` để tự động cleanup (bắt buộc cho React 19 / Next client component; tránh leak khi re-render/unmount).

**File mới:**

- `src/lib/gsap.ts` — đăng ký plugin **một lần duy nhất**, chỉ chạy phía client. Export `gsap` đã cấu hình + các plugin. Đặt `ScrollTrigger.config`/markers tắt ở production.
- (Tuỳ chọn) `src/lib/gsap-helpers.ts` — helper vòng lặp ngang liền mạch cho Marquee (kiểu `horizontalLoop`).

**Quy ước:**

- Tất cả component dùng GSAP là `"use client"`.
- Dùng `useGSAP(() => {...}, { scope: ref })` với `ref` bọc vùng animate để cleanup gọn theo scope.
- Chỉ animate `transform` và `opacity`. Quản lý `will-change` có chủ đích, gỡ sau khi xong.

---

## 4. Đặc tả hiệu ứng theo vùng

### 4.1 Hero (`HeroSection.tsx`) — GSAP tiếp quản intro + parallax

**Thay thế** stagger intro và parallax `useScroll` của Framer bằng GSAP:

- **Intro timeline** (`gsap.timeline` chạy khi mount): eyebrow → tiêu đề tên → chữ ký "Ivy" → hàng vai trò → quote → CTA, có stagger và easing mượt (tương đương `[0.16, 1, 0.3, 1]`).
- **SplitText** cho `<h1>` "NGUYỄN NGỌC / TƯỜNG VY": tách theo dòng + ký tự, reveal kiểu mask trượt lên (`yPercent` từ 100 → 0 trong khối `overflow-hidden`), stagger theo ký tự. **Bắt buộc `split.revert()` khi cleanup** để DOM trở lại text thật (SEO/accessibility — H1 phải là văn bản đọc được, không phải mảnh vụn).
- **Parallax scrub** bằng `ScrollTrigger` (scrub theo scroll, không pin): tái hiện đúng hành vi cũ — ảnh nền dịch `y` + `scale` nhẹ, khối nội dung trôi lên + giảm opacity, glow teal mờ dần. Thay cho `useTransform` của Framer trong Hero.

**Giữ nguyên (Framer):** 3 orbs nền chuyển động vô hạn (không liên quan scroll), `Magnetic` bọc CTA.

**Reduced-motion:** không SplitText animation (chỉ fade toàn khối), không parallax; nội dung hiển thị tĩnh, đầy đủ.

### 4.2 Marquee (`Marquee.tsx`) — GSAP loop theo vận tốc cuộn

- Thay CSS `animation: marquee` bằng vòng lặp GSAP vô cực **liền mạch** (helper `horizontalLoop`).
- **Tốc độ & hướng biến thiên theo vận tốc cuộn**: dùng velocity của ScrollTrigger để làm marquee tăng tốc khi cuộn nhanh và **đảo chiều theo chiều cuộn** (cuộn xuống chạy một chiều, cuộn lên đảo lại), rồi giãn về tốc độ nền khi ngừng cuộn.
- Giữ **hover-to-pause** (tween timeScale về 0 khi hover).
- **Reduced-motion:** chạy chậm đều một chiều, không phản ứng vận tốc.

### 4.3 Case Studies (`CaseStudiesSection.tsx`) — scroll-driven quanh rail

**Không đụng** rail native `snap-x overflow-x-auto` (giữ UX cuộn ngang + click mở), **không đụng** morph `layoutId` overlay.

**Phạm vi đã chốt (an toàn, vẫn ấn tượng):**

- **Header pin nhẹ + scrub-reveal**: 3 dòng tiêu đề editorial ("Ba dự án / Ba bài học / Ba con số") reveal lần lượt theo scroll khi section vào khung hình (ScrollTrigger, `once` hợp lý).
- **Stagger reveal card theo scroll**: các card của rail nổi lên tuần tự (ScrollTrigger batch / stagger) khi rail lộ ra, thay cho wrapper `Reveal` đơn hiện tại — biên độ tinh tế, `transform`+`opacity`.
- **Reduced-motion:** bỏ mọi chuyển động, hiển thị đầy đủ ngay.

**Stretch (KHÔNG nằm trong phạm vi cam kết, chỉ triển khai nếu bạn xác nhận riêng ở bước plan):** biến section thành *pinned horizontal scroll gallery* (cuộn dọc → dịch rail ngang). Có tính "wow" cao nhưng thay đổi UX cuộn ngang native + rủi ro trên mobile/touch → mặc định **không làm** trong đợt này.

### 4.4 Chi tiết scroll toàn cục

- Vài điểm nhấn tiết chế do GSAP + ScrollTrigger: số thứ tự phần / tick vạch "vẽ" vào, divider `scaleX` khi vào khung hình.
- Nguyên tắc: **giữ tiết chế**, không phải phần tử nào cũng chuyển động. Phần lớn reveal thường vẫn để `Reveal` (Framer).

---

## 5. Lộ trình triển khai (mỗi phase = build verify → 1 commit)

Khớp workflow deploy-thẳng: sau mỗi phase, chạy `bun run build`; chỉ commit khi build pass.

| Phase | Nội dung | Verify |
|-------|----------|--------|
| **0** | `bun add gsap @gsap/react` + `src/lib/gsap.ts` (đăng ký plugin, cấu hình) | `bun run build` |
| **1** | Hero: intro timeline + SplitText + parallax scrub (gỡ scroll Framer khỏi Hero) | `bun run build` |
| **2** | Marquee: loop GSAP theo vận tốc cuộn | `bun run build` |
| **3** | Case Studies: header scrub-reveal + stagger card (không đụng morph) | `bun run build` |
| **4** | Chi tiết scroll toàn cục (tick/divider/số phần) | `bun run build` |

Mỗi commit là một bước độc lập, revert được nếu Vercel deploy có vấn đề.

---

## 6. Hiệu năng & an toàn

- Chỉ animate `transform`/`opacity`; không animate layout props.
- `useGSAP` scope → cleanup tự động; **`SplitText.revert()`** khi unmount để giữ text thật.
- ScrollTrigger markers tắt ở production; cân nhắc `ScrollTrigger.refresh()` sau khi font/ảnh load để tránh sai vị trí trigger.
- Kiểm chứng mỗi phase bằng `bun run build` (bắt lỗi TS/bundling) trước khi commit — vì `next.config.ts` đang bật `ignoreBuildErrors`, cần chú ý build có thể pass dù có lỗi type; vẫn đọc kỹ log.
- Tôn trọng `prefers-reduced-motion` ở mọi hiệu ứng qua `gsap.matchMedia()`.

---

## 7. Ngoài phạm vi (YAGNI)

- ScrollSmoother / smooth-scroll toàn trang.
- Gỡ bỏ Framer Motion.
- Thay đổi nội dung, bố cục, màu sắc, hay copywriting.
- Pinned horizontal scroll gallery cho Case Studies (chỉ là stretch tuỳ chọn).
