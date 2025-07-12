from app.models.user import User
from app.extensions import db
from flask_jwt_extended import create_access_token, create_refresh_token

def register_user(data):
    if User.query.filter_by(email=data['email']).first():
        return None, "Email already exists"
    if User.query.filter_by(name=data['name']).first():
        return None, "Username already exists"

    user = User(name=data['name'], email=data['email'])
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