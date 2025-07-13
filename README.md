
# DevShare Lite

## 🧑‍💻 Thông tin tác giả

- **Trường**: Trường Đại học Công nghệ Thông tin – ĐHQG TP.HCM (UIT)  
- **MSSV**: 23521459 
- **Họ tên**: Phan Nam Thanh 

---

## 📌 Tổng quan dự án

**DevShare Lite** là một nền tảng diễn đàn chia sẻ kiến thức dành cho cộng đồng lập trình viên. Người dùng có thể đăng bài viết với trình soạn thảo Markdown, tương tác qua bình luận, tìm kiếm và phân trang bài viết. Hệ thống hỗ trợ phân quyền, xác thực người dùng và quản lý bài viết.

**Chức năng chính:**
- Đăng ký / Đăng nhập / Đăng xuất người dùng  
- Đăng bài viết (draft / published) với trình soạn thảo Markdown  
- Hiển thị danh sách bài viết có phân trang, tìm kiếm  
- Xem chi tiết bài viết, bình luận   
- Quản lý bài viết  
- Cập nhật avatar  

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
├── frontend/                  # Frontend Next.js project
│   ├── app/                   # App Router pages & layout
│   ├── components/            # Các component tái sử dụng
│   ├── contexts/              # Context Provider (UserContext)
│   ├── utils/                 # Cấu hình API, cookies...
│   ├── public/                # Hình ảnh, favicon
│
├── backend/                   # Backend Flask project
│   ├── app/                   # Thư mục chính chứa logic ứng dụng
│   │   ├── config/            # Cấu hình môi trường và ứng dụng
│   │   ├── controllers/       # Định nghĩa routes
│   │   ├── models/            # Định nghĩa các model dữ liệu (ORM)
│   │   ├── schemas/           # Xác thực và serialize dữ liệu đầu vào/ra
│   │   ├── services/          # Business logic
│   │   ├── static/            # File tĩnh chứa ảnh avatar
│   │   ├── __init__.py        # Khởi tạo Flask app
│   │   ├── extensions.py      # Khởi tạo extensions như db, jwt, marshmallow
│   │   └── routes.py          # Định nghĩa các blueprint của API
│   ├── requirements.txt       # Thư viện Python cần thiết
│   ├── run.py                 # Điểm khởi chạy Flask app
│   └── .env                   # File cấu hình biến môi trường

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
