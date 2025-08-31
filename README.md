
# DevShare Lite

## 🧑‍💻 Author Information

- **University**: University of Information Technology – VNUHCM (UIT)  
- **Student ID**: 23521459 
- **Full Name**: Phan Nam Thanh 

---

## 📌 Project Overview

**DevShare Lite** is an online forum where users can share knowledge, post questions about technical issues, and participate in discussions through answers and comments.
The goal is to build a small community focused on exchanging information in the IT field.

**Main Features:**
- **User Authentication:**  
  Register, login, and logout with email and password

- **Post Management:**  
  Create, edit, delete posts (supports Markdown, tags)
  Save posts as draft or publish them
  Display posts with pagination, search, tag filtering, and sorting by likes

- **View & Interact with Posts:**  
  View post details, comment, reply to comments
  Like posts and comments

- **User Profile Page:**  
  Display basic information, avatar, and user’s posts (drafts & published) 

- **Markdown Editor:**  
  Write posts using Markdown syntax

---

## 🛠️ Technologies Used
### Frontend:
- **Next.js + React**
- **TypeScript**
- **Tailwind CSS**
- **@uiw/react-md-editor**: Markdown editor
- **axios**: For HTTP requests to backend

### Backend:
- **Flask**
- **Flask-JWT-Extended**: JWT authentication
- **Flask-SQLAlchemy**: ORM 
- **Flask-Marshmallow**: Input validation schemas
- **PostgreSQL**

---

## 📁 Project Structure
```
source_code/
│
├── frontend/                                # Frontend (Next.js + TypeScript)
│   ├── app/                                 # Next.js 13+ App Router
│   │   ├── (auth)/                          # Authentication pages
│   │   │   ├── login/                       # Login page
│   │   │   ├── register/                    # Register page
│   │   │   └── layout.tsx                   # Auth layout
│   │   ├── (main)/                          # Main pages after login
│   │   │   ├── drafts/                      # Draft posts
│   │   │   ├── posts/                       # Public posts
│   │   │   ├── profile/                     # User profile
│   │   │   ├── search/                      # Post search
│   │   │   ├── tags/                        # Tags list
│   │   │   └── layout.tsx                   # Shared main layout
│   │   ├── favicon.ico  
│   │   ├── globals.css  
│   │   ├── layout.tsx                       # Root layout  
│   │   └── page.tsx                         # Homepage  
│   │
│   ├── components/                          # Reusable components
│   │   ├── auth/                            # Authentication components
│   │   ├── comment/                         # Comments management
│   │   ├── common/                          # Pagination, TimeDisplay
│   │   ├── layout/                          # Sidebar, Navbar, ...
│   │   ├── like/                            # Like buttons
│   │   ├── post/                            # PostCard, PostDetail, ...
│   │   └── user/                            # Avatar, ...
│   │
│   ├── contexts/                            # React Context (UserContext, ...)
│   ├── utils/                               # API configs, cookie helpers
│   ├── public/                              # Images, icons, favicon
│   ├── middleware.ts                        # Route authentication middleware
│
├── backend/                                 # Backend (Flask + SQLAlchemy)
│   ├── app/                                 # Main Flask app
│   │   ├── config/                          # App configs (db, JWT, env, ...)
│   │   ├── controllers/                     # Route definitions & logic
│   │   ├── models/                          # ORM models (User, Post, Like, ...)
│   │   ├── schemas/                         # Marshmallow schemas
│   │   ├── services/                        # Business logic
│   │   ├── static/                          # Static files (avatars, ...)
│   │   ├── extensions.py                    # Init db, jwt, ma, ...
│   │   ├── routes.py                        # API blueprints
│   │   └── __init__.py                      # Flask app factory
│   │
│   ├── requirements.txt                     # Python dependencies
│   ├── run.py                               # Flask server entry point

```

---

## ⚙️ Installation & Run Guide
### 1. Clone repository:
```bash
git clone https://github.com/pnt2005/devshare.git
cd devshare/source_code
```

---

### 2. Setup & Run Backend (Flask)

**Requirements: Python 3.10+**

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Trên Windows: venv\Scripts\activate

pip install -r requirements.txt

# Create a .env file (if not exists) and configure environment variables such as: SECRET_KEY, DATABASE_URL

# Initialize the database

# Run the server
python3 run.py
```

> Backend will run at `http://localhost:5000`

---

### 3. Setup & Run Frontend (Next.js):

**Requirements: Node.js 18+**

```bash
cd ../frontend
npm install
npm run dev
```

> Frontend will run at `http://localhost:3000`
