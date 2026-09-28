# 22 — Ngũ (Thiết kế từ điều kiện thực tế)

Website hồ sơ thực hành kiến trúc cải tạo nhà hẹp tại đô thị Việt Nam, được thiết kế và xây dựng theo chuẩn mực **Swiss Minimalist (International Typographic Style)**.

---

## 1. Giới thiệu dự án

- **Đơn vị:** Ngũ Architecture Studio.
- **Tiêu đề chính (H1):** Ngũ. Thiết kế từ điều kiện thực tế.
- **Lời dẫn:** Hồ sơ cải tạo nhà hẹp, được trình bày qua hiện trạng, lựa chọn và không gian sau cùng.
- **Hành động chính:** Xem hồ sơ công trình.
- **Mục tiêu:** Trình bày phương pháp giải quyết hai rào cản điển hình của nhà ống đô thị (thiếu ánh sáng tự nhiên và lối đi chật do thang chắn) thông qua các quyết định can thiệp thực tế: giải phóng trục thông tầng vi khí hậu và dạt biên hệ thang thép.

---

## 2. Đặc tả phong cách Swiss Minimalist (DNA thiết kế)

1. **Hệ màu nghiêm ngặt (Strict Palette):**
   - Nền canvas xám ngà `#f2f2f0`, bề mặt tương phản trắng `#ffffff` và các dải nền nhịp điệu xám `#e8e8e5`.
   - Chữ và mực đen thuần khiết `#000000` đạt tỷ lệ tương phản tối đa (21:1).
   - Màu đỏ tín hiệu Thụy Sĩ `#d5342b` (Swiss Red): Sử dụng cực kỳ tiết chế cho số thứ tự (01, 02...), thẻ phân loại và tín hiệu tương tác chính. Tuyệt đối không dùng làm màu trang trí tràn lan.
2. **Hình học vuông vức (Zero Radius):**
   - `border-radius: 0px` trên toàn bộ thành phần (nút, khung ảnh, ô nhập, hộp thoại).
   - Đường viền đen đặc (2px, 4px) hiển lộ rõ bộ khung lưới cấu trúc.
3. **Độ sâu qua chất liệu thay vì bóng đổ (Flat Depth via CSS Patterns):**
   - Hoàn toàn không sử dụng drop shadow.
   - Chiều sâu thị giác được tạo bởi 4 lớp hoa văn CSS:
     - Lưới 24×24px (`.swiss-grid-pattern`).
     - Ma trận điểm 16×16px (`.swiss-dots`).
     - Đường kẻ chéo 45 độ (`.swiss-diagonal`).
     - Hạt nhiễu vi mô mô phỏng bề mặt giấy in bản vẽ (`.swiss-noise`).
4. **Kiểu chữ Grotesque (Typography as Interface):**
   - Sử dụng phông chữ `Inter`, độ tương phản mạnh giữa tiêu đề cực lớn (Black 900) và thân bài dễ đọc (18px, Regular 400).
   - Nhãn và chỉ mục viết hoa, dãn cách chữ rộng (`letter-spacing: 0.1em - 0.2em`), `line-height >= 1.4` tránh cắt dấu tiếng Việt.
   - Số liệu dạng tabular (`font-variant-numeric: tabular-nums`).
5. **Chuyển động cơ học, dứt khoát (Snappy Transitions):**
   - Thời gian phản hồi 120ms – 180ms, không dùng hiệu ứng nảy (spring/bounce).
   - Nút đổi màu lập tức (Black → Swiss Red).

---

## 3. Các vùng nội dung & Chức năng tương tác

### 01. Luận điểm (Main Thesis)
- Bố cục lưới 12 cột bất đối xứng: Cột trái (4 cột) nêu nguyên lý cốt lõi ("Nhà hẹp không phải biệt thự thu nhỏ"), cột phải (8 cột) hiển thị không gian thông tầng thực tế (`thesis_interior_1790520199249.jpg`) kèm thông số hiện trạng.

### 02. Danh mục công trình (Project Directory)
- 3 hàng công trình minh họa:
  - **Mã N-01:** Nhà phố Hàng Bông (Nhà ở) — Cải tạo giếng trời đón nắng đông nam.
  - **Mã W-01:** Xưởng sáng tạo Yên Phụ (Không gian làm việc) — Chuyển đổi nhà ống thành studio mở.
  - **Mã N-02:** Nhà hẹp Kim Mã (Nhà ở) — Tái cấu trúc thang lệch tầng & mặt tiền lam kim loại.
- Bộ lọc theo nhóm: `Tất cả` / `Nhà ở` / `Không gian làm việc`.
- Hộp thoại chi tiết `<dialog>` chuẩn HTML5: Nhấn vào hàng bất kỳ để mở hồ sơ phân tích vật liệu, phạm vi và quyết định cấu trúc.
- Trạng thái trống (Empty State) và nút khôi phục bộ lọc khi không có kết quả.

### 03. Hiện trạng & Quyết định (Conditions & Decisions)
- Bố cục 4/8: Cột trái đặt câu hỏi cốt lõi, nêu 2 hiện trạng (thiếu sáng, lối đi chật) và 2 quyết định tương ứng (trục thông tầng, thang thép dạt biên).
- Cột phải là bản vẽ mặt bằng kiến trúc (`floor_plan_1790520278194.jpg`) với chú giải ký hiệu mặt bằng A, B, C.

### 04. Trước và Sau (Before & After)
- Hai khung ảnh cùng tỷ lệ (`before_img_1790520294885.jpg` và `after_img_1790520308244.jpg`).
- **Nút điều khiển ngoài khung ảnh:**
  - `[ 1. HIỆN TRẠNG TRƯỚC CẢI TẠO ]`
  - `[ 2. KHÔNG GIAN SAU HOÀN THIỆN ]`
  - `[ 3. SO SÁNH SONG SONG ]`
- Thanh trượt điều chỉnh tỷ lệ kèm nhãn trạng thái hiển thị cố định, giải quyết triệt để yêu cầu không chỉ dựa vào slider kéo.

### 05. Trao đổi dự án (Project Inquiry)
- Biểu mẫu thẳng thớm trên lưới 12 cột, không bo góc: Thu thập vị trí, diện tích sơ bộ, nhu cầu cốt lõi và thông tin liên hệ.
- Xử lý dữ liệu chuẩn mực: Thông báo minh bạch bản thử nghiệm giao diện (không gửi tin giả mạo đến máy chủ bên ngoài), hướng dẫn liên hệ trực tiếp qua email hoặc hotline.

---

## 4. Nghiệm thu kỹ thuật & Tiêu chí đặc biệt

| Tiêu chí nghiệm thu | Trạng thái | Minh chứng kỹ thuật |
|---------------------|------------|---------------------|
| **1. Baseline chỉ mục & heading thẳng hàng** | ĐẠT | Sử dụng `display: flex; align-items: baseline;` trên `.section-header`. |
| **2. Nút thao tác thay cho kéo before/after** | ĐẠT | Có 3 nút bấm cơ học chuyên biệt ngoài ảnh, nhãn trạng thái hiển thị liên tục. |
| **3. Nhận diện lưới & typography trước hình trang trí** | ĐẠT | Bảng công trình làm nổi bật mã số mono `[N-01]`, tiêu đề in hoa, viền đen 2px/4px định hình cấu trúc trước ảnh thumbnail. |
| **4. Dự phòng tải ảnh lỗi (Image Fallback)** | ĐẠT | Bắt sự kiện `onerror`, ẩn ảnh vỡ và hiển thị khung viền đứt nét với mã số và thông báo "ẢNH MINH HỌA ĐANG CẬP NHẬT". |
| **5. Khả năng truy cập (A11Y)** | ĐẠT | Độ tương phản >= 4.5:1 (phần lớn 21:1), hỗ trợ điều hướng bàn phím, vòng focus đỏ 2px (`:focus-visible`), thẻ ARIA đầy đủ. |
| **6. Tôn trọng Reduced Motion** | ĐẠT | Media query `@media (prefers-reduced-motion: reduce)` triệt tiêu toàn bộ thời gian transition. |
| **7. Responsive 320px, 390px, 768px, 1440px** | ĐẠT | Tái định nghĩa `grid-template-columns` thành 6 cột (tablet) và 2 cột (mobile). Khối nội dung span 2, không cuộn ngang. |

---

## 5. Cấu trúc thư mục

```
websites/22-ngu/
├── index.html                     # Mã nguồn HTML5 ngữ nghĩa
├── style.css                      # Hệ thống thiết kế Swiss Minimalist thuần CSS3
├── script.js                      # Tương tác bộ lọc, modal, trước/sau và form
├── README.md                      # Tài liệu nghiệm thu dự án
├── hero_architecture_1790520186908.jpg
├── thesis_interior_1790520199249.jpg
├── thumb_n01_1790520210407.jpg
├── thumb_w01_1790520224360.jpg
├── thumb_n02_1790520262345.jpg
├── floor_plan_1790520278194.jpg
├── before_img_1790520294885.jpg
└── after_img_1790520308244.jpg
```

---

## 6. Hướng dẫn chạy thử nghiệm

Mở trực tiếp tệp `index.html` trên bất kỳ trình duyệt hiện đại nào (Chrome, Firefox, Safari, Edge), hoặc sử dụng máy chủ tĩnh:

```bash
cd websites/22-ngu
python3 -m http.server 8000
```
Truy cập: `http://localhost:8000`
