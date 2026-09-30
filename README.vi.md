# Prompt-Driven UI (Giao diện người dùng được điều khiển bằng câu lệnh)

Đọc bằng ngôn ngữ khác: [English](README.md) | [Tiếng Việt](README.vi.md) | [简体中文](README.zh-CN.md)

Bộ sưu tập hơn 100 thiết kế trang web (ý tưởng và các biến thể) được tạo hoàn toàn từ các câu lệnh văn bản (prompts). Khám phá tiềm năng của việc tạo giao diện người dùng (UI) bằng trí tuệ nhân tạo (AI) và xem cách ngôn ngữ tự nhiên được chuyển đổi thành thiết kế web hiện đại như thế nào.

## 🚀 Tổng quan dự án

Mục tiêu của dự án này là chứng minh khả năng của các Mô hình ngôn ngữ lớn (LLMs) và AI tạo sinh trong việc thiết kế các giao diện web có cấu trúc, thẩm mỹ và đa chức năng trực tiếp từ các hướng dẫn bằng văn bản. Bằng cách cung cấp các câu lệnh cụ thể, chúng ta có thể nhanh chóng tạo nguyên mẫu và lặp lại các bố cục, thành phần và phong cách giao diện khác nhau.

## 📁 Cấu trúc thư mục

- `index.html`: Trang web thư viện chính để duyệt và khám phá tất cả các thiết kế đã được tạo.
- `prompts/` & `prompts-en/`: Các câu lệnh văn bản ngôn ngữ tự nhiên được sử dụng để tạo ra các giao diện web tương ứng.
- `websites/` & `websites-en/`: Mã nguồn UI thực tế được tạo ra (HTML, CSS, JS) dựa trên các câu lệnh.
- `thumbs/`: Hình ảnh thu nhỏ của các trang web được tạo, dùng để xem trước trong thư viện.
- `scripts/`: Các tập lệnh tiện ích được sử dụng để xây dựng hoặc quản lý kho lưu trữ.

## ✨ Tính năng chính

- **Hơn 100 Thiết kế từ AI:** Một bộ sưu tập phong phú các ý tưởng giao diện web đa dạng.
- **Ánh xạ Lệnh - Mã nguồn:** Dễ dàng so sánh câu lệnh ngôn ngữ tự nhiên đầu vào với mã nguồn đầu ra tương ứng.
- **Hỗ trợ Đa ngôn ngữ:** Các câu lệnh và kết quả được phân loại bằng tiếng Anh và các ngôn ngữ khác.
- **Mã nguồn mở hoàn toàn:** Tự do khám phá mã nguồn, chỉnh sửa các câu lệnh và thử nghiệm với các tạo tác của riêng bạn.

## 🛠️ Cách sử dụng

Để xem bộ sưu tập, bạn không cần cài đặt gì phức tạp:

1. Sao chép (clone) kho lưu trữ về máy của bạn.
2. Mở trực tiếp tệp `index.html` trong trình duyệt web.
3. Hoặc, để có trải nghiệm tốt nhất, hãy chạy một máy chủ phát triển cục bộ:
   ```bash
   npx http-server
   # hoặc
   python3 -m http.server
   ```

### 🤖 Sử dụng như một Kỹ năng (Skill) cho AI Agent

Cách dễ nhất để tạo thiết kế của riêng bạn là sử dụng kho lưu trữ này làm "Kỹ năng" (Skill) tham khảo cho trợ lý lập trình AI của bạn (như Antigravity, GitHub Copilot, hoặc Cursor).

1. **Tải kho lưu trữ:** Clone repo này về máy cục bộ của bạn.
2. **Hướng dẫn AI Agent của bạn:** Yêu cầu AI tạo một thiết kế web mới bằng cách tham khảo các ví dụ hiện có. Ví dụ:
   > *"Hãy xem 50x2 mẫu trong các thư mục `prompts/` và `websites/`. Dựa trên các ví dụ này, hãy tạo một trang đích mới cho một quán cà phê."*
3. **Thiết lập Kỹ năng vĩnh viễn (Permanent Skill):** Bạn có thể chính thức hóa quy trình này bằng cách tạo một tệp kỹ năng tùy chỉnh (ví dụ: `SKILL.md` hoặc `.cursorrules`) trong không gian làm việc của bạn để hướng dẫn AI:
   - *"Luôn sử dụng kho lưu trữ `prompt-driven-ui` làm tài liệu tham khảo chính để tạo giao diện."*
   - *"Phân tích sự tương quan giữa `prompts/` và `websites/` để hiểu cấu trúc HTML/CSS được ưu tiên trước khi tạo các thiết kế mới."*

## 📄 Giấy phép

Dự án này được cấp phép theo các điều khoản trong tệp [LICENSE](LICENSE) của dự án.
