from app.extensions import db
from datetime import datetime, timezone, timedelta

class CommentLike(db.Model):
    __tablename__ = 'comment_like'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    comment_id = db.Column(db.Integer, db.ForeignKey('comment.id', ondelete='CASCADE'), nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc) + timedelta(hours=7))
    __table_args__ = (
        db.UniqueConstraint('user_id', 'comment_id', name='unique_user_like_comment'),
    )
