# Hero name video

Đặt video trekking cho hiệu ứng "video-text" ở tên Hero vào thư mục này, **đúng tên**:

| File | Bắt buộc? | Ghi chú |
|------|-----------|---------|
| `hero-name.mp4` | ✅ **Bắt buộc** | H.264 / yuv420p, muted, ~6–10s loop, 720–1080p, `+faststart`. Nguồn chính. |
| `hero-name.webm` | ⬜ Tuỳ chọn | VP9, nhẹ hơn cho trình duyệt hỗ trợ. Nếu có sẽ được ưu tiên. |
| `hero-name-poster.jpg` | ⬜ Nên có | 1 frame đại diện — hiện lúc video đang tải. |

Component `VideoText` trỏ sẵn tới `/videos/hero-name.mp4` (+ `.webm` + poster).
**Chưa có file cũng không sao** — tên sẽ hiển thị màu teal như cũ (fallback), khi bạn upload đúng tên là hiệu ứng video tự lên.

## Gợi ý tối ưu bằng ffmpeg (nếu cần)
```bash
# MP4 chuẩn web (autoplay ổn định, không tiếng)
ffmpeg -i input.mov -an -vf "scale=-2:1080" -c:v libx264 -pix_fmt yuv420p -crf 24 -movflags +faststart hero-name.mp4
# WebM (tuỳ chọn, nhẹ hơn)
ffmpeg -i input.mov -an -vf "scale=-2:1080" -c:v libvpx-vp9 -crf 34 -b:v 0 hero-name.webm
# Poster
ffmpeg -i hero-name.mp4 -vframes 1 -q:v 3 hero-name-poster.jpg
```
