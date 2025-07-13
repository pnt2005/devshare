from datetime import timedelta
import os

class Config:
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:postgres@172.24.167.166:5433/devshare'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'your-secret'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=15)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=7)
    UPLOAD_FOLDER = os.path.join(os.getcwd(), 'app', 'static', 'uploads')
    MAX_CONTENT_LENGTH = 2 * 1024 * 1024  # 2MB
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}