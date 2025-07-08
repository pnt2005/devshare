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

def list_comments_service(post_id):
    comments = Comment.query.filter_by(post_id=post_id).order_by(Comment.id.desc()).all()
    return [
        {
            "id": c.id,
            "user": {
                "id": c.user_id,
                "name": c.user.name
            },
            "content": c.content
        } for c in comments
    ]
