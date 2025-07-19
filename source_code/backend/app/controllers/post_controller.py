from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.schemas.post_schema import PostSchema
from app.schemas.comment_schema import CommentSchema
from marshmallow import ValidationError
from app.services.post_service import (
    PostValidationError,
    create_post_service,
    get_posts_by_user,
    list_posts_like_count_service,
    list_posts_service,
    get_post_service,
    update_post_service,
    delete_post_service,
    search_posts_service,
    get_drafts_service
)
from app.services.comment_service import (
    create_comment_service,
    list_comments_service
)

#blueprint
post_bp = Blueprint('posts', __name__)

#schema
post_schema = PostSchema()
comment_schema = CommentSchema()

#create post
@post_bp.route('/posts', methods=['POST'])
@jwt_required()
def create_post():
    data = request.get_json()
    user_id = int(get_jwt_identity())

    try:
        validated_data = post_schema.load(data)
        post = create_post_service(validated_data, user_id)
    except ValidationError as err:
        return jsonify(err.messages), 422
    except PostValidationError as e:
            return jsonify({"error": e.message}), e.status_code

    return jsonify({"id": post.id, "title": post.title}), 201

#list posts with pagination
@post_bp.route('/posts', methods=['GET'])
def list_posts():
    page = request.args.get('page', 1, type=int)
    return jsonify(list_posts_service(page))

#get one post
@post_bp.route('/posts/<int:id>', methods=['GET'])
def get_post(id):
    result = get_post_service(id)
    if isinstance(result, tuple):
        return jsonify(result[0]), result[1]
    return jsonify(result)

#update post
@post_bp.route('/posts/<int:id>', methods=['PUT'])
@jwt_required()
def update_post(id):
    user_id = int(get_jwt_identity())
    data = request.get_json()
    result = update_post_service(id, user_id, data)
    if isinstance(result, tuple):
        return jsonify(result[0]), result[1]
    return jsonify(result)

#delete post
@post_bp.route('/posts/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_post(id):
    user_id = int(get_jwt_identity())
    result = delete_post_service(id, user_id)
    if isinstance(result, tuple):
        return jsonify(result[0]), result[1]
    return jsonify(result)

#search post with pagination
@post_bp.route('/posts/search', methods=['GET'])
def search_posts():
    query = request.args.get('query', '', type=str)
    page = request.args.get('page', 1, type=int)
    return jsonify(search_posts_service(query, page))

#get drafts
@post_bp.route('/posts/drafts', methods=['GET'])
@jwt_required()
def get_drafts():
    user_id = get_jwt_identity()
    page = request.args.get("page", default=1, type=int)
    return jsonify(get_drafts_service(user_id, page))

#create comment on post
@post_bp.route('/posts/<int:post_id>/comments', methods=['POST'])
@jwt_required()
def comment_post(post_id):
    data = request.get_json()
    user_id = int(get_jwt_identity())

    try:
        validated_data = comment_schema.load(data)
    except ValidationError as err:
        return jsonify(err.messages), 422
    
    content = validated_data['content']
    parent_id = validated_data.get('parent_id')

    comment = create_comment_service(post_id, user_id, content, parent_id)
    return jsonify({"id": comment.id, "content": comment.content}), 201

#list comments on post
@post_bp.route('/posts/<int:post_id>/comments', methods=['GET'])
def list_comments(post_id):
    comments = list_comments_service(post_id)
    return jsonify(comments)

#list posts and drafts of user
@post_bp.route("/posts/user/<int:user_id>", methods=["GET"])
def get_user_posts(user_id):
    result = get_posts_by_user(user_id)
    return jsonify(result)

#list posts with pagination
@post_bp.route('/posts/like', methods=['GET'])
def list_posts_like_count():
    page = request.args.get('page', 1, type=int)
    return jsonify(list_posts_like_count_service(page))
