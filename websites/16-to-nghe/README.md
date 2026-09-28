# TỜ NGHỀ

Dự án thiết kế trang web landing theo phong cách **Newsprint**, lấy cảm hứng từ các trang báo giấy cổ điển. 

## Đặc điểm nổi bật (Newsprint)
- **Bố cục dạng lưới báo**: Sử dụng cấu trúc lưới cột nghiêm ngặt, chia thành các tỷ lệ 6/3/3 trên desktop.
- **Không có bo góc (0px radius)**: Mọi thành phần đều vuông vức, sắc sảo.
- **Viền chung (Collapsed borders)**: Tránh viền kép bằng cách chia sẻ các đường kẻ 1px hoặc 4px giữa các khối.
- **Typographic Hierarchy**: Sự tương phản mạnh mẽ giữa `Playfair Display` (tiêu đề siêu lớn) và `Lora` (thân bài dễ đọc).
- **Màu sắc tối giản**: Nền giấy ngà (`#F9F9F7`), mực đen (`#111111`) và màu nhấn đỏ (`#CC0000`).

## Tính năng đã hoàn thiện
1. **Trang nhất & Chuyên mục**: Hiển thị bài viết dẫn đầu và các bài phụ theo chuyên mục (Thiết kế / Người làm / Công cụ).
2. **Chế độ đọc bài**: Xem chi tiết một bài viết với định dạng báo chí (Drop cap, pull quote). Giữ vị trí cuộn khi quay lại trang chủ.
3. **Chuyển đổi số báo**: Thay đổi qua lại giữa các "Edition" (Vol. 1 và Vol. 2) và cập nhật dữ liệu tương ứng ngay lập tức.
4. **Form đăng ký thử nghiệm**: Trình bày như phiếu đăng ký báo giấy, xử lý giao diện không kết nối backend thật (bảo mật dữ liệu demo).
5. **Responsive**: Chuyển từ lưới 12 cột (desktop) sang 1 cột (mobile) theo thứ tự ưu tiên đọc.

## Cách chạy
Đơn giản chỉ cần mở tệp `index.html` trong bất kỳ trình duyệt web hiện đại nào. Dự án sử dụng Tailwind CSS qua CDN và Vanilla JS, không cần cài đặt Node.js hay build step.

## Thông tin thêm
- Mã nguồn chỉ điều chỉnh giao diện (UI/UX) và luồng dữ liệu mẫu.
- Để sử dụng trong môi trường production, cần thay thế dữ liệu tĩnh trong `script.js` thành các API calls tương ứng.
