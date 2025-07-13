from flask import Flask
from flask_cors import CORS
from app.extensions import db, jwt
from app.routes import register_routes
import os

def create_app(config_class="app.config.config.Config"):
    app = Flask(__name__)
    app.config.from_object(config_class)

    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    # Init extensions
    db.init_app(app)
    jwt.init_app(app)
    CORS(app, supports_credentials=True, origins=["http://localhost:3000"])
    # Register routes
    register_routes(app)

    return app
