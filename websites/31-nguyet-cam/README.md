# 31 - NGUYỆT CẦM (Art Deco Cabaret Music Night)

Trang web giới thiệu đêm nhạc phòng trà cổ điển được thiết kế theo phong cách **Art Deco** (The "Gatsby" Aesthetic), lấy cảm hứng từ thời kỳ hoàng kim những năm 1920 của các nhà hát kịch và phòng hòa nhạc thính phòng.

---

## 1. Triết lý Thiết Kế & Nhận Diện Art Deco

Phong cách Art Deco đại diện cho sự xa hoa có kiểm soát (**Maximalist Restraint**), đường nét hình học sắc cạnh, tính đối xứng nghi lễ và độ tương phản kịch tính giữa bóng tối và ánh sáng kim loại.

### Các dấu ấn thị giác bắt buộc (Visual Signatures):
- **Trục đối xứng trung tâm (Bilateral Symmetry)**: Mặt tiền nhà hát, tiêu đề chính, cửa vòm sân khấu và sơ đồ bàn đều cân xứng tuyệt đối qua trục giữa.
- **Bảng màu bóng đêm & vàng đồng (Dark Luxury Palette)**:
  - Nền bóng đêm (Obsidian Black): `#111a22`
  - Khối nền phụ (Rich Charcoal): `#16222d`
  - Vàng kim loại đồng thau (Metallic Gold): `#c9a227` / `#d4af37`
  - Chữ kem sâm banh (Champagne Cream): `#f2e7d2` (đạt tương phản > 10:1)
  - Chữ phụ (Pewter Gray): `#94a3b8`
- **Hệ thống Typography**:
  - Tiêu đề: **Marcellus** (Google Font) phông Roman cổ điển, chữ hoa với khoảng giãn ký tự `letter-spacing: 0.12em–0.18em`, `line-height: 1.4` chống cắt dấu tiếng Việt.
  - Thân bài: **Josefin Sans** (Google Font) phông không chân hình học cổ điển, cỡ chữ tối thiểu 16px.
- **Họa tiết & Đường nét hình học**:
  - Vân nền kẻ chéo góc 45° mờ (Diagonal Crosshatch Pattern 3.5%).
  - Vầng hào quang thái dương (Sunburst Radial Gradient) ở khu vực mở đầu và chọn chỗ.
  - Đường phân cách hình quạt (Fan Dividers) và hình thoi xoay 45° (`rotate-45`).
  - Góc bậc thang Ziggurat (Stepped L-bracket corners) trên các thẻ và tấm vé.
  - Khung ảnh đôi (Double-frame images) với hiệu ứng lướt chuột chuyển từ đen trắng nghệ thuật sang màu ấm.
  - Nút bấm kiến trúc: Bo góc tuyệt đối `0px`, chiều cao tối thiểu 48px, hiệu ứng viền vàng phát quang (`box-shadow glow`).

---

## 2. Các Phân Vùng Chức Năng

### I. Mặt tiền nhà hát (Theater Facade / Hero)
- Tiêu đề chính giữa `NGUYỆT CẦM` cùng lời dẫn thính phòng.
- Đôi cột dọc cân xứng viền hai bên màn hình.
- Khung cửa vòm parabol đặc trưng trưng bày ảnh sân khấu thính phòng.
- Nút điều hướng nhanh: "Xem Chương Trình" và "Chọn Vị Trí Ngồi".

### II. Chương trình I–III (Acts I–III)
- Ba hồi nhạc đánh số La Mã (I, II, III).
- Khung ziggurat bậc thang viền kim loại kép.
- Thể hiện rõ tên tiết mục, thể loại âm nhạc, thời lượng và ghi chú nghệ sĩ minh họa hư cấu (`Nghệ sĩ Vĩnh Khang`, `Ca sĩ Mộc Lan`, `Ban nhạc Hoa Niên`).

### III. Không gian thính phòng (Lounge & Cabaret Space)
- Trình bày kiến trúc âm học mộc, đồng thau đúc và vải nhung tiêu âm.
- Cặp ảnh đôi trang nhã thể hiện góc nhìn nhạc cụ và ánh sáng khán phòng.

### IV. Chọn vị trí mẫu (Sample Seating Selection)
- Bố cục bàn đối xứng 3 hàng (Hàng A cận sân khấu, Hàng B trung tâm, Hàng C ban công âm hưởng).
- **Bộ chuyển đổi Suất diễn (Showtime Switcher)**: Cho phép chuyển giữa Suất 19:30 và Suất 21:15; tự động cập nhật tình trạng bàn trống/đã đặt và cảnh báo hủy chọn nếu bàn không tương thích.
- **Góc nhìn mô phỏng (Perspective View Card)**: Hiển thị cự ly, hướng nhìn sân khấu và đặc điểm âm học khi khách chọn bàn.
- **Tùy chọn danh sách cho Mobile**: Danh sách `select` trực quan giúp chọn bàn dễ dàng trên màn hình hẹp mà không cần thao tác zoom/kéo phức tạp.
- **Nút Đặt lại sơ đồ (Reset Seating)**: Trả trạng thái sơ đồ về mặc định.

### V. Tấm vé minh họa (Souvenir Ticket Modal)
- Khung viền bậc thang ziggurat mang phong cách vé nhà hát cổ điển.
- Thể hiện chi tiết: Tên đêm nhạc, Suất diễn, Vị trí bàn, Hạng vị trí và Hướng nhìn khán phòng.
- **Tuân thủ đặc tả an toàn**: Nhãn cảnh báo nổi bật *"Không có giá trị đặt chỗ thật — Bản minh họa thiết kế"* và tuyệt đối **không tạo mã QR giả**.
- Hỗ trợ đóng vé nhanh bằng phím `Escape`, nút `Đóng lại`, bấm ra ngoài nền hoặc nhấn `Đổi lựa chọn` để cuộn về sơ đồ.

---

## 3. Khả Năng Tiếp Cận & Tương Thích (A11y & Responsiveness)

- **Độ tương phản màu (Color Contrast)**: Chữ kem trên nền đen obsidian đạt tỉ lệ > 10:1 (vượt tiêu chuẩn WCAG AAA). Chữ vàng tiêu đề đạt tỉ lệ > 7:1 (chuẩn WCAG AA).
- **Điều hướng bàn phím**: Toàn bộ nút chọn bàn, nút chuyển suất và nút trong modal đều có `focus-visible` với viền đôi màu vàng rõ ràng. Modal hỗ trợ bẫy tiêu điểm (focus trap) và phím `Escape`.
- **Thiết bị di động**: Thử nghiệm tối ưu ở các kích thước 320px, 390px, 768px và 1440px. Trên màn hình dưới 640px, bố cục chuyển sang 1 cột, nút bấm tự động mở rộng toàn chiều ngang, font tiêu đề co giãn linh hoạt (`clamp()`).
- **Giảm chuyển động (Prefers Reduced Motion)**: Đầy đủ media query vô hiệu hóa các chuyển động phức tạp mà vẫn giữ nguyên viền và cấu trúc kim loại nguyên bản.
- **Dự phòng tải ảnh (Fallback)**: Toàn bộ ảnh chụp đều có cơ chế xử lý lỗi `onerror` tự động thay thế bằng biểu tượng kỷ vật Art Deco sang trọng nếu mạng gặp trục trặc.

---

## 4. Cấu Trúc Thư Mục

```
websites/31-nguyet-cam/
├── index.html     # Cấu trúc ngữ nghĩa HTML5 đầy đủ
├── style.css      # Hệ thống CSS Art Deco độc lập
├── script.js      # Xử lý logic tương tác, chuyển suất, chọn bàn và modal
└── README.md      # Tài liệu hướng dẫn chi tiết
```

## 5. Hướng Dẫn Xem Trang

Mở trực tiếp tệp `index.html` trên bất kỳ trình duyệt web hiện đại nào (Chrome, Safari, Firefox, Edge). Dự án sử dụng Vanilla JavaScript và CSS thuần, không yêu cầu cài đặt môi trường Node.js hay bất kỳ câu lệnh build nào.
