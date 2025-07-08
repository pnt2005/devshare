from flask import Flask
from flask_cors import CORS
from app.extensions import db, jwt
from app.routes import register_routes

def create_app(config_class="app.config.config.Config"):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Init extensions
    db.init_app(app)
    jwt.init_app(app)
    CORS(app, supports_credentials=True, origins=["http://localhost:3000"])
    # Register routes
    register_routes(app)

    return app
