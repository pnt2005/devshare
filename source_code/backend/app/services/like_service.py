from app.models.like import Like
from app.extensions import db
from sqlalchemy.exc import IntegrityError

def like_post(user_id: int, post_id: int):
    like = Like(user_id=user_id, post_id=post_id)
    db.session.add(like)
    try:
        db.session.commit()
        return {"message": "Post liked successfully."}, 201
    except IntegrityError:
        db.session.rollback()
        return {"error": "You have already liked this post."}, 400


def unlike_post(user_id: int, post_id: int):
    like = Like.query.filter_by(user_id=user_id, post_id=post_id).first()
    if not like:
        return {"error": "You have not liked this post."}, 400

    db.session.delete(like)
    db.session.commit()
    return {"message": "Post unliked successfully."}, 200


def has_liked(user_id: int, post_id: int) -> bool:
    return Like.query.filter_by(user_id=user_id, post_id=post_id).first() is not None


def get_like_count(post_id: int) -> int:
    return Like.query.filter_by(post_id=post_id).count()
