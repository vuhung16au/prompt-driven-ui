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

## 📄 Giấy phép

Dự án này được cấp phép theo các điều khoản trong tệp [LICENSE](LICENSE) của dự án.
