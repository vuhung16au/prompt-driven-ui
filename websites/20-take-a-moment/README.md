# Thảo An — Dành Một Khoảng Dịu Lại

Dự án thiết kế website trải nghiệm theo phong cách **Botanical / Organic Serif**, tái hiện không gian tĩnh tại, ấm áp và kết nối sâu sắc với tự nhiên.

---

## 1. Bản sắc thị giác & Hệ thống Tokens (Botanical Design System)

- **Triết lý thiết kế:** "Một lời tụng ca kỹ thuật số gửi đến thiên nhiên" — nhịp độ chậm rãi, thư thái, đường nét bo vòm kiến trúc Roman Arch mềm mại thay vì góc vuông sắc lạnh.
- **Bảng màu thuần tự nhiên (Earthbound Palette):**
  - **Nền chính:** `#F9F8F4` (Alabaster / Giấy gạo ấm áp) kết hợp `#F3F6F0` (Alabaster ngả xanh dịu).
  - **Mực văn bản chính:** `#1F2B22` (Xanh rừng già sẫm — Deep Forest Green, tương phản > 11:1).
  - **Màu nhấn Sage:** `#5F7359` (Lá xô thơm, tinh chỉnh độ tương phản đạt chuẩn WCAG AA/AAA).
  - **Màu nhấn Moss:** `#273D2C` (Rêu sẫm cho các nút chính và trạng thái active).
  - **Màu đất nung (Terracotta):** `#B6573C` (Tạo điểm nhấn tương tác và các cảnh báo đổi giờ).
  - **Màu Clay & Stone:** `#D5C7B7` & `#E5E0D6` (Viền đá thanh mảnh 1px và nền thẻ êm dịu).
- **Paper Grain Texture (Bắt buộc):** Lớp phủ kết cấu hạt giấy SVG fractal noise toàn màn hình (`opacity: 0.018`, `pointer-events: none`) biến bề mặt kỹ thuật số thành cảm giác giấy ấm xúc giác.
- **Hệ thống kiểu chữ (Typography):**
  - **Tiêu đề:** `Playfair Display` (Serif chuyển tiếp tương phản cao), sử dụng các cụm từ nghiêng (*dịu lại*, *nhu cầu*, *lắng đọng*) tạo chất thơ biên tập.
  - **Thân bài:** `Source Sans 3` (Humanist sans-serif) với cỡ chữ tối thiểu 16–17px, line-height 1.65–1.75, độ rộng 45–70 ký tự.
  - **Kiểm định dấu Tiếng Việt:** Đã kiểm thử trọn vẹn bộ dấu thanh Tiếng Việt (`rồi, bằng, đến, ấm, ồ, ề, ấ`) đảm bảo không bị đứt gãy hoặc xén dấu.
- **Hình ảnh vòm (Arched Roman Frames):** Tỷ lệ vòm `220px 220px 48px 48px` kết hợp hình ảnh thật được sinh trực tiếp theo đúng nhận diện spa/wellness mộc mạc, không dùng gradient thay thế ảnh.

---

## 2. Kiểm nghiệm các trường hợp chấp nhận đặc tả (Acceptance Criteria)

1. **Đổi dịch vụ có slot cũ không hợp lệ phải yêu cầu chọn lại:**
   - Khi chuyển từ dịch vụ ngắn (30 phút, slot lẻ 09:30) sang dịch vụ dài (90 hoặc 120 phút), hệ thống tự động kiểm tra tính hợp lệ.
   - Nếu slot cũ không còn khả dụng, hệ thống hủy chọn slot, vô hiệu hóa nút xác nhận và hiển thị thông báo cảnh báo rõ ràng (`#slot-reset-alert`): *"Bạn đã đổi sang [Dịch vụ mới]. Khung giờ cũ không còn khả dụng hoặc không đủ thời lượng cho dịch vụ này. Vui lòng chọn lại khung giờ phù hợp bên dưới."*
2. **Nhãn lịch mẫu xuất hiện trước thao tác xác nhận:**
   - Phía trên nút xác nhận có nhãn giải thích nổi bật: *"Nhãn lịch minh họa: Chức năng thử nghiệm mô phỏng giao diện, không lưu trữ thông tin thực, không tạo đơn đặt hẹn và không có phí phát sinh."*
   - Nút bấm hiển thị rõ mục tiêu: *"Xác nhận lịch minh họa"*.
3. **Nút/nhãn không chìm vào màu sage:**
   - Mọi nút, nhãn và văn bản đều được kiểm tra độ tương phản: nền chữ luôn đạt từ 4.5:1 trở lên (chữ trắng trên nền Moss green `#273D2C`, chữ Forest Green `#1F2B22` trên nền Alabaster/Sage nhạt).
4. **Không cho xác nhận khi chưa có giờ; có sửa lựa chọn:**
   - Nút xác nhận bị vô hiệu hóa (`disabled="true"`) kèm dòng chú thích hướng dẫn cụ thể các mục còn thiếu (chưa chọn dịch vụ / chưa chọn giờ).
   - Khi bấm xác nhận, mở modal dialog tóm tắt đầy đủ dịch vụ, ngày, giờ, kèm nút *"Chọn lại từ đầu"* hoặc *"Hoàn tất"*.
5. **Dịch vụ đã chọn được giữ trên cùng panel:**
   - Khối summary ở đầu Lịch minh họa hiển thị tên buổi, thời lượng, mô tả và nút *"Thay đổi buổi"* chuyển mượt mà về danh sách dịch vụ.
6. **Mục "Trước khi tới" & Ghi chú mong muốn:**
   - Danh sách checklist chuẩn bị 4 bước trực quan.
   - Form ghi chú có nút *"Xem yêu cầu mẫu"* hiển thị nội dung gợi ý kèm nút *"Dùng mẫu này vào ô ghi chú"*.

---

## 3. Khả năng tương thích & Tiếp cận (Responsive & Accessibility)

- **Responsive Viewports:**
  - `390px` (Điện thoại): Lưới chuyển sang 1 cột, ảnh xếp bên dưới nội dung, vòm ảnh co giãn tự nhiên từ 240px–300px, lịch slot hiển thị 2 cột thoáng đãng, menu hamburger drawer toàn màn hình hỗ trợ phím `Escape`. Vùng bấm tối thiểu 44–48px.
  - `768px` (Máy tính bảng): Lưới dịch vụ và lịch trình chuyển sang bố cục 2–3 cột so le tự nhiên (`card-stagger`).
  - `1200px+` (Desktop): Độ thoáng rộng lớn, lề cân xứng, bố cục editorial cao cấp.
- **Tiếp cận (A11y):**
  - Điều hướng bằng phím Tab đầy đủ, viền `focus-visible` tương phản 2px rõ nét.
  - Hỗ trợ `prefers-reduced-motion: reduce`: tắt toàn bộ chuyển động lá rơi và hiệu ứng trượt, bảo toàn tuyệt đối 100% nội dung.

---

## 4. Cách chạy dự án

Trang web được xây dựng bằng Vanilla HTML5, CSS3 hiện đại (CSS Variables) và JavaScript chuẩn, không đòi hỏi bất kỳ công cụ build hay thư viện cồng kềnh nào:
1. Mở trực tiếp tệp `index.html` bằng trình duyệt web bất kỳ (Chrome, Safari, Firefox, Edge).
2. Hoặc khởi chạy máy chủ tĩnh cục bộ:
   ```bash
   npx serve .
   # hoặc
   python3 -m http.server 8080
   ```
