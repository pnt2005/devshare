from app.models.comment import Comment
from app.models.post import Post
from app.models.user import User
from app.extensions import db

def create_comment_service(post_id, user_id, content, parent_id=None):
    post = Post.query.get_or_404(post_id)
    comment = Comment(post_id=post.id, user_id=user_id, content=content, parent_id=parent_id)
    db.session.add(comment)
    db.session.commit()
    return comment


def build_comment_tree(comments):
    comment_map = {}
    tree = []

    # Khởi tạo từng comment
    for c in comments:
        comment_map[c.id] = {
            "id": c.id,
            "user": {
                "id": c.user_id,
                "name": c.user.name
            },
            "content": c.content,
            "created_at": c.created_at.isoformat(),
            "replies": []
        }

    # Gắn replies vào parent
    for c in comments:
        if c.parent_id:
            parent = comment_map.get(c.parent_id)
            if parent:
                parent["replies"].append(comment_map[c.id])
        else:
            tree.append(comment_map[c.id])

    return tree


def list_comments_service(post_id):
    comments = Comment.query.filter_by(post_id=post_id).order_by(Comment.created_at).all()
    return build_comment_tree(comments)
