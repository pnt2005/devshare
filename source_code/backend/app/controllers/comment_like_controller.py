from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.services.comment_like_service import *

comment_like_bp = Blueprint('comment_likes', __name__, url_prefix='/comment-likes')

@comment_like_bp.route('/<int:comment_id>', methods=['POST'])
@jwt_required()
def like(comment_id):
    user_id = get_jwt_identity()
    return like_comment(user_id, comment_id)

@comment_like_bp.route('/<int:comment_id>', methods=['DELETE'])
@jwt_required()
def unlike(comment_id):
    user_id = get_jwt_identity()
    return unlike_comment(user_id, comment_id)

@comment_like_bp.route('/<int:comment_id>/status', methods=['GET'])
@jwt_required()
def status(comment_id):
    user_id = get_jwt_identity()
    liked = has_liked_comment(user_id, comment_id)
    return jsonify({"liked": liked})

@comment_like_bp.route('/<int:comment_id>/count', methods=['GET'])
def count(comment_id):
    count = get_comment_like_count(comment_id)
    return jsonify({"like_count": count})
