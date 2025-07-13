from app.models.user import User
from app.extensions import db
from flask_jwt_extended import create_access_token, create_refresh_token
from flask import current_app
import os
import uuid

def register_user(data):
    if User.query.filter_by(email=data['email']).first():
        return None, "Email already exists"
    if User.query.filter_by(name=data['name']).first():
        return None, "Username already exists"

    user = User(name=data['name'], email=data['email'], avatar_url="http://localhost:5000/static/default-avatar.jpg")
    user.set_password(data['password'])

    db.session.add(user)
    db.session.commit()
    return user, None


def authenticate_user(email, password):
    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        access_token = create_access_token(identity=str(user.id))
        refresh_token = create_refresh_token(identity=str(user.id))
        return {
            "access_token": access_token,
            "refresh_token": refresh_token
        }, None
    return None, "Invalid credentials"


def refresh_access_token(identity):
    new_access_token = create_access_token(identity=identity)
    return new_access_token


def allowed_file(filename):
    allowed = current_app.config['ALLOWED_EXTENSIONS']
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed

def save_avatar_file(file_storage):
    ext = file_storage.filename.rsplit('.', 1)[1].lower()
    filename = f"{uuid.uuid4()}.{ext}"
    filepath = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
    file_storage.save(filepath)
    return f"http://localhost:5000/static/uploads/{filename}"

def update_user_avatar(user_id, file_storage):
    if not file_storage or not allowed_file(file_storage.filename):
        raise ValueError("Invalid file")

    avatar_url = save_avatar_file(file_storage)

    user = User.query.get(user_id)
    user.avatar_url = avatar_url
    db.session.commit()

    return avatar_url