from app.controllers.post_controller import post_bp
from app.controllers.user_controller import user_bp
from app.controllers.like_controller import like_bp
from app.controllers.comment_like_controller import comment_like_bp
from app.controllers.tag_controller import tag_bp


def register_routes(app):
    app.register_blueprint(post_bp)
    app.register_blueprint(user_bp)
    app.register_blueprint(like_bp)
    app.register_blueprint(comment_like_bp)
    app.register_blueprint(tag_bp)
