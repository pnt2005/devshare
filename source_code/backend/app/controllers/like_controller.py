from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.services.like_service import like_post, unlike_post, has_liked, get_like_count

like_bp = Blueprint("like", __name__, url_prefix="/likes")

@like_bp.route("/<int:post_id>", methods=["POST"])
@jwt_required()
def like(post_id):
    user_id = get_jwt_identity()
    return like_post(user_id, post_id)


@like_bp.route("/<int:post_id>", methods=["DELETE"])
@jwt_required()
def unlike(post_id):
    user_id = get_jwt_identity()
    return unlike_post(user_id, post_id)


@like_bp.route("/<int:post_id>/status", methods=["GET"])
@jwt_required()
def check_like_status(post_id):
    user_id = get_jwt_identity()
    liked = has_liked(user_id, post_id)
    return jsonify({"liked": liked})


@like_bp.route("/<int:post_id>/count", methods=["GET"])
def like_count(post_id):
    count = get_like_count(post_id)
    return jsonify({"like_count": count})
