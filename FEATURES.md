# 📌 Features.md

## 🧩 Các chức năng chính của sản phẩm

### 1. 🔐 Xác thực Người dùng
- Đăng ký tài khoản mới (sử dụng email và mật khẩu).
- Đăng nhập vào hệ thống.
- Đăng xuất khỏi hệ thống.

📸 *Ảnh minh họa:*  
![](./screenshots/auth/register.png)
![](./screenshots/auth/login.png)

---

### 2. 📝 Quản lý Bài viết (Posts)
- Người dùng đã đăng nhập có thể:
  - Tạo bài viết mới với tiêu đề, nội dung (Markdown cơ bản), và gắn thẻ (tags).
  - Lưu bài viết ở trạng thái **Draft** hoặc **Publish** công khai.
  - Xem danh sách bài viết (có phân trang).
  - Xem chi tiết một bài viết.
  - Chỉnh sửa hoặc xóa bài viết của mình.

📸 *Ảnh minh họa:*  
![](./screenshots/posts/create/create.png)
![](./screenshots/posts/list/latest.png)
![](./screenshots/posts/detail/detail.png)
![](./screenshots/posts/detail/edit.png)
---

### 3. 💬 Bình luận
- Người dùng đã đăng nhập có thể:
  - Bình luận dưới mỗi bài viết.
  - Trả lời các bình luận khác (hỗ trợ bình luận lồng nhau).

📸 *Ảnh minh họa:*  
![](./screenshots/posts/detail/comment,reply,like.png)
---

### 4. 🔎 Tìm kiếm Cơ bản
- Tìm kiếm bài viết hoặc câu hỏi theo **tiêu đề** hoặc **nội dung**.

📸 *Ảnh minh họa:*  
![](./screenshots/posts/list/search.png)

---

### 5. 🙍‍♂️ Trang Cá nhân Người dùng (User Profile)
- Hiển thị thông tin cơ bản (tên, email).
- Danh sách bài viết đã đăng.
- Danh sách bài viết đang ở trạng thái Draft.

📸 *Ảnh minh họa:*  
![](./screenshots/profile/profile.png)

---

## ✨ Các chức năng nâng cao đã thực hiện (ngoài yêu cầu tối thiểu)

- Sử dụng OpenAI Moderation để kiểm duyệt nội dung bài viết
![](./screenshots/errors/create%20post.png)
- Lọc bài viết mới nhất và nhiều like nhất
![](./screenshots/posts/list/latest.png)
![](./screenshots/posts/list/most_liked.png)
- Tính năng **Like** bài viết và bình luận.
![](./screenshots/posts/list/most_liked.png)
![](./screenshots/posts/detail/comment,reply,like.png)
- Lọc theo tag.
![](./screenshots/tags/list.png)
![](./screenshots/tags/detail.png)
- Hiển thị lỗi thân thiện bằng Toast (Frontend UX)
![](./screenshots/errors/comment.png)
- Update avatar.
![](./screenshots/profile/update_avatar.png)
![](./screenshots/profile/avatar_updated.png)

---

## 🧩 Các vấn đề gặp phải và giải pháp

| Vấn đề | Giải pháp |
|--------|-----------|
| JWT không tự đính kèm khi gửi request | Thêm **interceptor Axios** để tự động gắn Authorization header cho mỗi request |
| Cần duy trì đăng nhập lâu dài mà không ảnh hưởng bảo mật | Sử dụng **Access Token + Refresh Token**|
| Người dùng vào route bảo vệ mà chưa đăng nhập | Sử dụng **middleware Next.js** để kiểm tra đăng nhập và tự động redirect đến trang login |
| Hiển thị reply bình luận lồng nhau | Dùng **đệ quy** để hiển thị các comment con lồng nhau |

---

## 🛑 Các giới hạn đã biết

- Chưa có phân quyền quản trị (admin).
- Chưa có hệ thống thông báo (notifications).
- Chưa có tính năng follow người dùng khác.
- UI mobile mới ở mức cơ bản.

---

## 🚀 Định hướng tương lai

- Thêm phân quyền người dùng (admin).
- Hệ thống thông báo tương tác (bình luận, like, trả lời...).
- Biểu đồ phân tích số liệu bài viết và hoạt động người dùng.
- Tích hợp AI:
  - Gợi ý tiêu đề, tags cho bài viết.
  - Phân tích chất lượng nội dung và hỗ trợ viết bài tốt hơn.
