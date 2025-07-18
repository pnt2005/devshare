from sqlalchemy import func
from app.models.post import Post
from app.extensions import db
from app.models.tag import Tag
from app.services.utils import is_content_flagged
from app.models.like import Like

def create_post_service(data, user_id):
    tag_names = data.pop('tag', [])
    content = data.get('content', '')

    #check content
    if is_content_flagged(content):
        return {"error": "Content is not suitable"}, 400
    #check title
    if is_content_flagged(data["title"]):
        return {"error": "Title is not suitable"}, 400

    post = Post(**data, user_id=user_id)
    post.excerpt = content[:150] if len(content) > 150 else content

    for name in tag_names:
        tag = Tag.query.filter_by(name=name).first()
        if not tag:
            tag = Tag(name=name)
            db.session.add(tag)
        post.tag.append(tag)

    db.session.add(post)
    db.session.commit()
    return post

#list post with pagination
def list_posts_service(page, per_page=2):
    posts = Post.query.filter_by(status='published') \
                      .order_by(Post.id.desc()) \
                      .paginate(page=page, per_page=per_page, error_out=False)
    return {
        "page": page,
        "total": posts.total,
        "total_pages": posts.pages,
        "posts": [p.to_dict() for p in posts.items]
    }

#get one post
def get_post_service(post_id):
    post = Post.query.get_or_404(post_id)
    # if post.status != 'published':
    #     return {"error": "Post not published"}, 403
    return post.to_dict()

#update post
def update_post_service(post_id, user_id, data):
    post = Post.query.get_or_404(post_id)
    if post.user_id != user_id:
        return {"error": "Permission denied"}, 403

    if "content" in data:
        #check content
        if is_content_flagged(data["content"]):
            return {"error": "Content is not suitable"}, 400
        post.content = data["content"]
    if "title" in data:
        #check title
        if is_content_flagged(data["title"]):
            return {"error": "Title is not suitable"}, 400
        post.title = data["title"]
    if "status" in data and data["status"] in ["draft", "published"]:
        post.status = data["status"]

    db.session.commit()
    return {"msg": "Post updated"}

#delete post
def delete_post_service(post_id, user_id):
    post = Post.query.get_or_404(post_id)
    if post.user_id != user_id:
        return {"error": "Permission denied"}, 403

    db.session.delete(post)
    db.session.commit()
    return {"msg": "Post deleted"}

#search post with pagination
def search_posts_service(query, page=1, per_page=2):
    posts = Post.query.filter(
        Post.status == 'published',
        (Post.title.ilike(f"%{query}%") | Post.content.ilike(f"%{query}%"))
    ).order_by(Post.id.desc()).paginate(page=page, per_page=per_page, error_out=False)

    return {
        "query": query,
        "page": page,
        "total_posts": posts.total,
        "total_pages": posts.pages,
        "posts": [p.to_dict() for p in posts.items]
    }

#get drafts
def get_drafts_service(user_id, page=1, limit=2):
    query = Post.query.filter_by(user_id=user_id, status='draft').order_by(Post.created_at.desc())
    pagination = query.paginate(page=page, per_page=limit, error_out=False)
    
    return {
        "posts": [p.to_dict() for p in pagination.items],
        "total_pages": pagination.pages,
        "current_page": pagination.page,
    }


#get posts and drafts by user
def get_posts_by_user(user_id: int):
    published_posts = Post.query.filter_by(user_id=user_id, status='published').order_by(Post.created_at.desc()).all()
    draft_posts = Post.query.filter_by(user_id=user_id, status='draft').order_by(Post.created_at.desc()).all()
    return {
        "published": [post.to_dict() for post in published_posts],
        "drafts": [post.to_dict() for post in draft_posts]
    }

#list posts by like_count desc with pagination
def list_posts_like_count_service(page, per_page=2):
    posts = (
        db.session.query(Post, func.count(Like.id).label("like_count"))
        .outerjoin(Like, Post.id == Like.post_id)
        .filter(Post.status == "published")
        .group_by(Post.id)
        .order_by(func.count(Like.id).desc())
        .paginate(page=page, per_page=per_page, error_out=False)
    )
    return {
        "page": page,
        "total_posts": posts.total,
        "total_pages": posts.pages,
        "posts": [
            {
                **post.to_dict(),
                "like_count": like_count
            }
            for post, like_count in posts.items
        ]
    }