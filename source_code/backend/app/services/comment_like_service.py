from app.models.comment_like import CommentLike
from sqlalchemy.exc import IntegrityError
from app.extensions import db

def like_comment(user_id, comment_id):
    like = CommentLike(user_id=user_id, comment_id=comment_id)
    db.session.add(like)
    try:
        db.session.commit()
        return {"message": "Comment liked."}, 201
    except IntegrityError:
        db.session.rollback()
        return {"error": "Already liked this comment."}, 400

def unlike_comment(user_id, comment_id):
    like = CommentLike.query.filter_by(user_id=user_id, comment_id=comment_id).first()
    if like:
        db.session.delete(like)
        db.session.commit()
        return {"message": "Comment unliked."}, 200
    return {"error": "You have not liked this comment."}, 400

def has_liked_comment(user_id, comment_id):
    return CommentLike.query.filter_by(user_id=user_id, comment_id=comment_id).first() is not None

def get_comment_like_count(comment_id):
    return CommentLike.query.filter_by(comment_id=comment_id).count()
