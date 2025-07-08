from flask import Blueprint, request, jsonify
from app.schemas.user_schema import RegisterSchema, LoginSchema, UserInfoSchema
from app.services.user_service import register_user
from app.models.user import User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

user_bp = Blueprint('users', __name__)
register_schema = RegisterSchema()
login_schema = LoginSchema()
user_info_schema = UserInfoSchema()

@user_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    errors = register_schema.validate(data)
    if errors:
        return jsonify(errors), 400

    user, err = register_user(data)
    if err:
        return jsonify({"error": err}), 400

    return jsonify(user_info_schema.dump(user)), 201


@user_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    errors = login_schema.validate(data)
    if errors:
        return jsonify(errors), 400

    user = User.query.filter_by(email=data['email']).first()
    if user and user.check_password(data['password']):
        access_token = create_access_token(identity=str(user.id))
        return jsonify(access_token=access_token), 200

    return jsonify({"error": "Invalid credentials"}), 401


@user_bp.route('/me', methods=['GET'])
@jwt_required()
def get_me():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify(user_info_schema.dump(user))
