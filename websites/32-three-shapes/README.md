# 32 - Ba Hình (Three Shapes) | Xưởng Thực Hành Bố Cục Bauhaus

Trang web giới thiệu xưởng thực hành bố cục hình học Bauhaus, được thiết kế và xây dựng theo phong cách **Constructivist Modernism** (Hiện đại kiến tạo) với triết lý cốt lõi *"Hình thức theo sau công năng"* (Form follows function).

## 1. Triết lý & Hệ thống Thiết kế Bauhaus (Design Tokens)

- **Màu sắc nguyên bản (Primary Color Blocking)**:
  - Đỏ Bauhaus (`--color-red`): `#D02020`
  - Xanh dương Bauhaus (`--color-blue`): `#1040C0`
  - Vàng Bauhaus (`--color-yellow`): `#F0C020`
  - Đen mực (`--color-black` / `--color-fg`): `#121212`
  - Trắng tinh (`--color-white`): `#FFFFFF`
  - Nền toan / Ngà (`--color-bg` / `--color-ivory`): `#F0F0F0` / `#F4F1EA`
  - Nền nội dung accordion mở (`--color-accordion-exp`): `#FFF9C4`
- **Hình học thuần khiết (Geometric Purity)**:
  - Chỉ sử dụng hình tròn, hình vuông và hình tam giác.
  - Bo góc nhị phân tuyệt đối: Hoặc `0px` (vuông vức góc cạnh) hoặc `50%` (tròn đều). Tuyệt đối không bo góc mềm làm mất chất Bauhaus.
- **Đường viền & Đổ bóng (Borders & Hard Offset Shadows)**:
  - Đường viền đen đặc 2px (di động) và 4px (máy tính).
  - Bóng đổ cứng (hard offset shadows): `4px 4px 0 0 #121212`, `6px 6px 0 0 #121212`, `8px 8px 0 0 #121212` (không dùng bóng mờ gradient hay gaussian blur).
  - Hiệu ứng cơ học: Nút bấm lún cơ học `translate(2px, 2px)` và nhả bóng đổ khi kích hoạt.
- **Kiểu chữ (Typography)**:
  - Phông chữ: `Outfit` (Google Fonts sans-serif hình học).
  - Tiêu đề: Đậm nét (weight 900), viết hoa toàn bộ, độ giãn dòng sát (leading 0.92 - 0.95), khoảng cách chữ hẹp.
  - Thân bài: Cỡ chữ 16px - 18px (line-height 1.6), đảm bảo không cắt dấu tiếng Việt với chiều cao dòng tối thiểu 1.35 - 1.4 cho các nhãn in hoa.

## 2. Tính năng chính trên trang

1. **Poster Hero Khóa Grid**:
   - Tiêu đề H1: "BA HÌNH. NHIỀU CÁCH NHÌN." cùng lời dẫn và nút kêu gọi hành động "Thử một bố cục".
   - Bảng tranh minh họa bên phải kết hợp đĩa tròn vàng mờ, thoi đỏ 45° và tam giác đen trung tâm.
2. **Khu vực tương tác "Thử 3 Bố Cục"**:
   - Ba preset bố cục hình học: **Cân bằng**, **Lệch tâm**, **Nhịp lặp**.
   - Chuyển đổi trạng thái mượt mà bằng transition cơ học 300ms (tự động tắt khi người dùng bật `prefers-reduced-motion`).
   - Nút đặt lại vị trí gốc (Reset) và xoay góc khối vuông để thử nghiệm tương tác.
   - Bảng phân tích động cập nhật ý nghĩa thị giác của từng thế bố cục.
3. **Chương trình "Bạn sẽ làm gì"**:
   - Bố cục lưới bất đối xứng 2+1 theo đúng đặc tả Bauhaus.
   - Ba chặng: Quan sát & phân tích, Cắt ghép tay thực tế, So sánh & tinh chỉnh.
   - Nêu rõ vật liệu thủ công và sản phẩm bàn giao (03 bản poster A3) mà không tạo thành tích ảo.
4. **Bộ sưu tập "Tác phẩm thực hành"**:
   - 4 tác phẩm hình học nguyên bản bằng SVG/CSS thuần: Lực nén, Lưỡi cắt, Đồng tâm, Phân cực.
   - Tích hợp Modal xem chi tiết và giải thích nguyên lý tổ chức không gian.
5. **Chọn buổi mẫu & Đăng ký mô phỏng**:
   - Lựa chọn giữa 2 khung giờ mẫu (Sáng Thứ Bảy / Chiều Chủ Nhật, đều 180 phút).
   - Biểu mẫu cập nhật tức thì buổi đã chọn, có kiểm tra lỗi hợp lệ (validation) cho Tên và Email.
   - Modal hiển thị thông tin đăng ký với nhãn cảnh báo dữ liệu mẫu minh họa rõ ràng.
6. **Hỏi đáp thường gặp (Accordion chuẩn Bauhaus)**:
   - Trạng thái đóng: Nền trắng, viền đen 4px, bóng đổ 4px.
   - Trạng thái mở: Tiêu đề chuyển màu đỏ Bauhaus chữ trắng, thân câu trả lời nền vàng nhạt viền đen, mũi tên quay 180°.

## 3. Khả năng truy cập (A11y) & Responsive

- Độ tương phản chữ và nền vượt chuẩn WCAG AA (tối thiểu 4.5:1).
- Hỗ trợ đầy đủ điều hướng bằng bàn phím (Tab, Enter, Escape đóng modal).
- Có liên kết "Chuyển đến nội dung chính" (Skip-to-content).
- Kích thước vùng bấm tối thiểu 48px trên mọi thiết bị di động.
- Không phát sinh thanh cuộn ngang ở các kích thước màn hình từ 320px đến 1440px+.

## 4. Cấu trúc thư mục

```
websites/32-three-shapes/
├── index.html     # Cấu trúc ngữ nghĩa HTML5 đầy đủ
├── style.css      # Hệ thống CSS Bauhaus hoàn chỉnh, responsive và hiệu ứng
├── script.js      # Mã điều khiển tương tác preset, modal, accordion và kiểm lỗi form
└── README.md      # Tài liệu tổng quan dự án và đặc tả thiết kế
```
