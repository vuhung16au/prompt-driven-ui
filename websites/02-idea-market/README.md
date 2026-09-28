# Chợ Ý Tưởng

Dự án thiết kế giao diện theo phong cách **Maximalism**, tuân thủ các nguyên tắc thiết kế được đặt ra trong bài tập.

## Tính năng
- Bố cục lưới phá vỡ (broken grid) với các thành phần bất đối xứng.
- Sử dụng màu sắc mạnh mẽ (5 accent colors), chữ lớn có bóng (text shadow xếp lớp), và viền đứt đoạn.
- Tính năng **Khám phá gian hàng** với bộ lọc không làm mới trang.
- Tính năng **Lịch trình** cho phép lưu tối đa 4 sự kiện, phát hiện trùng giờ và hiển thị cảnh báo (không xóa lịch cũ khi thay đổi bộ lọc).

## Cấu trúc tệp
- `index.html`: Cấu trúc HTML ngữ nghĩa, phân bố các vùng chức năng rõ ràng.
- `style.css`: Các biến CSS, hiệu ứng bóng, màu, typography và animation.
- `script.js`: Xử lý logic lọc sự kiện, lưu lịch trình và phát hiện trùng giờ.

## Cách chạy
Mở tệp `index.html` trong trình duyệt web. Không yêu cầu máy chủ do dữ liệu được giả lập trong `script.js`.
