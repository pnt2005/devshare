from app.extensions import db
from datetime import datetime, timezone, timedelta

post_tags = db.Table('post_tag',
    db.Column('post_id', db.Integer, db.ForeignKey('post.id'), primary_key=True),
    db.Column('tag_id', db.Integer, db.ForeignKey('tag.id'), primary_key=True)
)

class Post(db.Model):
    __tablename__ = 'post'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150))
    content = db.Column(db.Text)
    excerpt = db.Column(db.String(150))
    status = db.Column(db.String(10))  # draft, published
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User', backref='posts')
    tag = db.relationship('Tag', secondary=post_tags, backref=db.backref('post', lazy='dynamic'))
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc) + timedelta(hours=7))
    like = db.relationship("Like", backref="post", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "content": self.content,
            "excerpt": self.excerpt,
            "status": self.status,
            "created_at": self.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            "tag": [tag.name for tag in self.tag],
            "user": {
                "id": self.user_id,
                "name": self.user.name,
                "avatar_url": self.user.avatar_url
            }
        }