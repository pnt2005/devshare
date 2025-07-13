
# Thiết kế Cơ sở Dữ liệu – DevShare Lite

## 🗃️ Loại CSDL sử dụng
Hệ quản trị cơ sở dữ liệu quan hệ: **PostgreSQL**.  

---

## 🔧 Mô hình thực thể – ERD (Entity Relationship Diagram)

<img width="625" height="603" alt="image" src="https://github.com/user-attachments/assets/96151fbf-7689-4fd6-9549-cfb862be20f8" />

---

## 📑 Giải thích các bảng

### 1. `user`
- **id** *(PK, Integer)*: Khóa chính, định danh duy nhất người dùng.
- **name** *(String)*: Tên hiển thị của người dùng.
- **email** *(String, unique)*: Email đăng nhập.
- **password_hash** *(String)*: Mật khẩu được mã hóa.
- **avatar_url** *(String)*: URL ảnh đại diện người dùng.

### 2. `post`
- **id** *(PK, Integer)*: Khóa chính.
- **title** *(String)*: Tiêu đề bài viết.
- **content** *(Text)*: Nội dung chính.
- **excerpt** *(Text)*: Nội dung rút gọn / mô tả ngắn.
- **status** *(String)*: Trạng thái bài viết (`draft`, `published`).
- **user_id** *(FK → user.id)*: Tác giả bài viết.
- **created_at** *(Datetime)*: Thời gian tạo bài viết.

### 3. `comment`
- **id** *(PK, Integer)*: Khóa chính.
- **content** *(Text)*: Nội dung bình luận.
- **user_id** *(FK → user.id)*: Người viết bình luận.
- **post_id** *(FK → post.id)*: Bài viết được bình luận.
- **parent_id** *(FK → comment.id, nullable)*: Bình luận cha (hỗ trợ bình luận lồng nhau).
- **created_at** *(Datetime)*: Thời gian tạo bình luận.

### 4. `tag`
- **id** *(PK, Integer)*: Khóa chính.
- **name** *(String)*: Tên thẻ (tag).

### 5. `post_tag`
- Bảng trung gian phục vụ quan hệ nhiều-nhiều giữa `post` và `tag`.
- **post_id** *(FK → post.id)*  
- **tag_id** *(FK → tag.id)*  

---

## 🔗 Quan hệ giữa các bảng

- Một `user` có thể tạo nhiều `post` và `comment`.
- Một `post` có thể có nhiều `comment`.
- Một `comment` có thể là con của một `comment` khác (quan hệ đệ quy).
- Một `post` có thể gắn nhiều `tag` và ngược lại (many-to-many).
