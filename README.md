
# DevShare Lite

## 🧑‍💻 Thông tin tác giả

- **Trường**: Trường Đại học Công nghệ Thông tin – ĐHQG TP.HCM (UIT)  
- **MSSV**: 23521459 
- **Họ tên**: Phan Nam Thanh 

---

## 📌 Tổng quan dự án

**DevShare Lite** là một diễn đàn trực tuyến nơi người dùng có thể đăng tải các bài viết chia sẻ kiến thức, đặt câu hỏi về các vấn đề kỹ thuật, và tham gia trả lời, bình luận. Mục tiêu là xây dựng một cộng đồng nhỏ, tập trung vào việc trao đổi thông tin trong lĩnh vực CNTT	

**Chức năng chính:**
- **Xác thực người dùng:**  
  Đăng ký, đăng nhập, đăng xuất bằng email và mật khẩu

- **Quản lý bài viết:**  
  Tạo, chỉnh sửa, xóa bài viết (hỗ trợ Markdown, tags)  
  Lưu bài viết ở trạng thái nháp hoặc công khai  
  Hiển thị danh sách bài viết có phân trang, tìm kiếm, lọc theo tag, sắp xếp theo lượt thích

- **Xem và tương tác với bài viết:**  
  Xem chi tiết bài viết, bình luận, trả lời bình luận  
  Thích bài viết và bình luận  

- **Trang cá nhân người dùng:**  
  Hiển thị thông tin cơ bản, avatar, danh sách bài viết đã đăng và nháp  

- **Trình soạn thảo Markdown:**  
  Soạn thảo nội dung bài viết bằng cú pháp Markdown  


---

## 🛠️ Công nghệ sử dụng

### Frontend:
- **Next.js + React**
- **TypeScript**
- **Tailwind CSS**
- **@uiw/react-md-editor**: Trình soạn thảo Markdown.
- **axios**: Giao tiếp với backend qua HTTP.

### Backend:
- **Flask**
- **Flask-JWT-Extended**: Xác thực người dùng bằng JWT.
- **Flask-SQLAlchemy**: ORM 
- **Flask-Marshmallow**: Validation schema cho dữ liệu đầu vào.
- **PostgreSQL**

---

## 📁 Cấu trúc thư mục dự án

```
source_code/
│
├── frontend/                                # Frontend (Next.js + TypeScript)
│   │
│   ├── app/                                 # Cấu trúc App Router của Next.js 13+
│   │   │
│   │   ├── (auth)/                          # Nhóm các trang xác thực người dùng
│   │   │   ├── login/                       # Trang đăng nhập
│   │   │   ├── register/                    # Trang đăng ký
│   │   │   └── layout.tsx                   # Layout riêng cho nhóm auth
│   │   │
│   │   ├── (main)/                          # Nhóm các trang chính sau đăng nhập
│   │   │   ├── drafts/                      # Danh sách bài viết nháp
│   │   │   ├── posts/                       # Danh sách bài viết công khai
│   │   │   ├── profile/                     # Trang cá nhân người dùng
│   │   │   ├── search/                      # Trang tìm kiếm bài viết
│   │   │   ├── tags/                        # Danh sách tag
│   │   │   └── layout.tsx                   # Layout dùng chung cho nhóm main
│   │   │
│   │   ├── favicon.ico                      # Biểu tượng trang
│   │   ├── globals.css                      # CSS toàn cục
│   │   ├── layout.tsx                       # Layout gốc của toàn ứng dụng
│   │   └── page.tsx                         # Trang chủ
│   │
│   ├── components/                          # Các thành phần (component) tái sử dụng
│   │   ├── auth/                            # Các component liên quan đến xác thực
│   │   ├── comment/                         # Hiển thị và quản lý bình luận
│   │   ├── common/                          # Pagination, TimeDisplay
│   │   ├── layout/                          # Sidebar, Navbar,...
│   │   ├── like/                            # Component like bài viết, bình luận
│   │   ├── post/                            # PostCard, PostDetail,...
│   │   └── user/                            # Avatar,...
│   │
│   ├── contexts/                            # React Context (UserContext,...)
│   ├── utils/                               # Cấu hình API, xử lý cookie,...
│   ├── public/                              # Ảnh, icon, favicon,...
│   ├── middleware.ts                        # Middleware kiểm tra xác thực route
│
├── backend/                                 # Backend (Flask + SQLAlchemy)
│   │
│   ├── app/                                 # Code chính của Flask app
│   │   ├── config/                          # Cấu hình app: database, JWT, env,...
│   │   ├── controllers/                     # Định nghĩa route và xử lý logic
│   │   ├── models/                          # Các model dữ liệu ORM (User, Post, Like,...)
│   │   ├── schemas/                         # Serialize và validate dữ liệu (Marshmallow)
│   │   ├── services/                        # Tầng logic nghiệp vụ (business logic)
│   │   ├── static/                          # File tĩnh như ảnh avatar,...
│   │   ├── extensions.py                    # Khởi tạo db, jwt, ma,...
│   │   ├── routes.py                        # Đăng ký blueprint API
│   │   └── __init__.py                      # Tạo Flask app
│   │
│   ├── requirements.txt                     # Danh sách thư viện Python cần cài
│   ├── run.py                               # Điểm bắt đầu chạy Flask server
```

---

## ⚙️ Hướng dẫn cài đặt và khởi chạy dự án

### 1. Clone repository:
```bash
git clone https://github.com/pnt2005/devshare.git
cd devshare/source_code
```

---

### 2. Cài đặt và chạy Backend (Flask):

**Yêu cầu: Python 3.10+**

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Trên Windows: venv\Scripts\activate

pip install -r requirements.txt

# Tạo file .env (nếu chưa có) và cấu hình biến môi trường như SECRET_KEY, DATABASE_URL

# Khởi tạo database

# Chạy server
python3 run.py
```

> Mặc định backend chạy ở `http://localhost:5000`

---

### 3. Cài đặt và chạy Frontend (Next.js):

**Yêu cầu: Node.js 18+**

```bash
cd ../frontend
npm install
npm run dev
```

> Frontend sẽ chạy ở `http://localhost:3000`
