from app.controllers.post_controller import post_bp
from app.controllers.user_controller import user_bp

def register_routes(app):
    app.register_blueprint(post_bp)
    app.register_blueprint(user_bp)
