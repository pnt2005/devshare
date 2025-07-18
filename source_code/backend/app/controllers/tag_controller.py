from flask import Blueprint, jsonify, request
from app.services.tag_service import get_all_tags, get_posts_by_tag_service

tag_bp = Blueprint('tags', __name__)

@tag_bp.route('/tags', methods=['GET'])
def tags_list():
    return jsonify(get_all_tags())


@tag_bp.route('/tags/<name>', methods=['GET'])
def posts_by_tag(name):
    page = int(request.args.get('page', 1))
    return jsonify(get_posts_by_tag_service(name, page))
