
# Thiết kế Cơ sở Dữ liệu – DevShare Lite

## 🗃️ Loại CSDL sử dụng
Hệ quản trị cơ sở dữ liệu quan hệ: **PostgreSQL**.  

---

## 🔧 Mô hình thực thể – ERD (Entity Relationship Diagram)
<img width="1209" height="707" alt="image" src="https://github.com/user-attachments/assets/208e7bb7-d15e-4261-a833-2e7522528f78" />

---

## 📑 Giải thích các bảng

### `user`
- `id` *(PK, Integer)* – ID người dùng  
- `name` *(String)* – Tên hiển thị  
- `email` *(String)* – Email (duy nhất)  
- `password` *(String)* – Mật khẩu đã mã hóa  
- `avatar_url` *(String)* – Đường dẫn ảnh đại diện  
- `created_at` *(Datetime)* – Thời điểm tạo tài khoản  

---

### `post`
- `id` *(PK, Integer)* – ID bài viết  
- `user_id` *(FK → user.id)* – Người tạo bài viết  
- `title` *(String)* – Tiêu đề  
- `content` *(Text)* – Nội dung Markdown  
- `is_published` *(Boolean)* – Trạng thái công khai  
- `created_at` *(Datetime)* – Ngày tạo  
- `updated_at` *(Datetime)* – Ngày cập nhật  

---

### `comment`
- `id` *(PK, Integer)* – ID bình luận  
- `user_id` *(FK → user.id)* – Người bình luận  
- `post_id` *(FK → post.id)* – Bài viết  
- `parent_id` *(FK → comment.id, nullable)* – Bình luận cha (nếu là reply)  
- `content` *(Text)* – Nội dung bình luận  
- `created_at` *(Datetime)* – Ngày tạo  

---

### `tag`
- `id` *(PK, Integer)* – ID thẻ  
- `name` *(String)* – Tên thẻ (duy nhất)  

---

### `post_tag`
- `post_id` *(FK → post.id)* – ID bài viết  
- `tag_id` *(FK → tag.id)* – ID thẻ  
> *Composite Primary Key*  

---

### `like`
- `id` *(PK, Integer)* – ID lượt like  
- `user_id` *(FK → user.id)* – Người đã like  
- `post_id` *(FK → post.id)* – Bài viết được like  
- `created_at` *(Datetime)* – Thời gian like  

---

### `comment_like`
- `id` *(PK, Integer)* – ID lượt like bình luận  
- `user_id` *(FK → user.id)* – Người đã like  
- `comment_id` *(FK → comment.id)* – Bình luận được like  
- `created_at` *(Datetime)* – Thời gian like  

---

### Mối quan hệ giữa các bảng (Relationships)

- Một `User`:
  - có thể tạo nhiều `Post`
  - có thể viết nhiều `Comment`
  - có thể like nhiều `Post` và `Comment`

- Một `Post`:
  - thuộc về một `User`
  - có thể có nhiều `Comment`
  - có thể có nhiều `Like` (từ người dùng)
  - có thể được gắn nhiều `Tag` (quan hệ nhiều-nhiều thông qua `post_tag`)

- Một `Comment`:
  - thuộc về một `User`
  - thuộc về một `Post`
  - có thể trả lời một `Comment` khác (`parent_id`)
  - có thể có nhiều `Like`

- Một `Tag`:
  - có thể gắn với nhiều `Post` thông qua bảng `post_tag`

- Một `Like`:
  - thuộc về một `User`
  - có thể là Like cho `Post` hoặc cho `Comment` (chia làm bảng `like` và `comment_like` riêng)

- Bảng `post_tag` là bảng phụ để thiết lập quan hệ nhiều-nhiều giữa `Post` và `Tag`.
