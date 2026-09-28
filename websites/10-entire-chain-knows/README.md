# Chuỗi Khối - Mô phỏng tương tác

Dự án này là một trang web mô phỏng cách thức hoạt động của chuỗi khối (blockchain) thông qua một mô hình tương tác đơn giản, được thiết kế theo phong cách "Bitcoin DeFi" Aesthetic.

## Tính năng
- Trực quan hóa cấu trúc khối (block) và liên kết (link) bằng CSS và giao diện Web3.
- Thay đổi dữ liệu trong một khối sẽ làm thay đổi mã băm (hash) của nó.
- Chức năng kiểm chứng cho phép người dùng thấy được liên kết bị đứt gãy khi mã băm không còn khớp với bản ghi của khối tiếp theo.
- Khôi phục trạng thái ban đầu dễ dàng.
- Giải thích các thuật ngữ cơ bản: Khối, Liên kết, Kiểm chứng.

## Công nghệ sử dụng
- **HTML5** có tính ngữ nghĩa (semantic).
- **Tailwind CSS** (thông qua CDN) để xử lý bố cục và phong cách thiết kế nhanh chóng.
- **CSS tùy chỉnh** cho các hiệu ứng ánh sáng (glow), khối kính (glass morphism) và hoạt ảnh (animation) mạng lưới.
- **Vanilla JavaScript** để quản lý trạng thái tương tác (`original` -> `edited` -> `checked`).

## Thiết kế theo chuẩn
- Hỗ trợ tốt trên thiết bị di động (Responsive 390px, 768px, 1440px).
- Giao diện Dark mode (True Void) chuẩn mực với nhấn màu Bitcoin Orange.
- Đảm bảo trợ năng (Accessibility) qua `focus-visible`, hỗ trợ `prefers-reduced-motion` và thứ tự tab phím hợp lý.
- Độ tương phản đạt chuẩn.

## Cách chạy dự án
Chỉ cần mở tệp `index.html` trong trình duyệt web của bạn, không cần cài đặt thêm gói phần mềm hay máy chủ phức tạp.
