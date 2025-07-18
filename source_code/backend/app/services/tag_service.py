from app.models.tag import Tag
from app.models.post import Post
from app.extensions import db

def get_all_tags():
    tags = Tag.query.all()
    result = []

    for tag in tags:
        count = (
            db.session.query(Post)
            .join(Post.tag)
            .filter(Tag.id == tag.id, Post.status == 'published')
            .count()
        )
        if (count > 0): {
            result.append({
                'id': tag.id,
                'name': tag.name,
                'postCount': count
            })
        }

    return result


def get_posts_by_tag_service(name: str, page: int = 1, per_page: int = 2):
    tag = Tag.query.filter_by(name=name).first_or_404()
    query = tag.post.filter_by(status='published').order_by(Post.created_at.desc())

    pagination = query.paginate(page=page, per_page=per_page)
    posts = [post.to_dict() for post in pagination.items]

    return {
        'posts': posts,
        'total_pages': pagination.pages,
        'current_page': pagination.page
    }