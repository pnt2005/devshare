from app.models.post import Post
from app.extensions import db
from app.models.tag import Tag
from app.models.user import User

#create post
def create_post_service(data, user_id):
    tag_names = data.pop('tag', [])
    post = Post(**data, user_id=user_id)

    content = data['content']
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
def list_posts_service(page, per_page=1):
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

    if "title" in data:
        post.title = data["title"]
    if "content" in data:
        post.content = data["content"]
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
def search_posts_service(query, page=1, per_page=1):
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
def get_drafts_service(user_id):
    drafts = Post.query.filter_by(user_id=user_id, status='draft').order_by(Post.created_at.desc()).all()
    return {
        "posts": [p.to_dict() for p in drafts]
    }

#get posts and drafts by user
def get_posts_by_user(user_id: int):
    published_posts = Post.query.filter_by(user_id=user_id, status='published').order_by(Post.created_at.desc()).all()
    draft_posts = Post.query.filter_by(user_id=user_id, status='draft').order_by(Post.created_at.desc()).all()
    return {
        "published": [post.to_dict() for post in published_posts],
        "drafts": [post.to_dict() for post in draft_posts]
    }