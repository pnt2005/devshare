from app.models.user import User
from app.extensions import db

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
