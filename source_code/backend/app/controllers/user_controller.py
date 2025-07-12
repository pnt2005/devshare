from flask import Blueprint, request, jsonify
from app.schemas.user_schema import RegisterSchema, LoginSchema, UserInfoSchema
from app.services.user_service import register_user, authenticate_user, refresh_access_token
from app.models.user import User
from flask_jwt_extended import jwt_required, get_jwt_identity

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

    tokens, err = authenticate_user(data['email'], data['password'])
    if err:
        return jsonify({"error": err}), 401
    return jsonify(tokens), 200


@user_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    current_user = get_jwt_identity()
    access_token = refresh_access_token(current_user)
    return jsonify(access_token=access_token), 200


@user_bp.route('/me', methods=['GET'])
@jwt_required()
def get_me():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify(user_info_schema.dump(user))
