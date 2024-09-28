from flask import Flask
from flask_cors import CORS
from app.database import db
from app.routes import route_index
from flask_migrate import Migrate
from dotenv import load_dotenv
import os

load_dotenv()

def create_app():
    app = Flask(__name__)
    env_config = os.getenv("APP_SETTINGS", "app.config.config.DevelopmentConfig")
    app.config.from_object(env_config)
    db.init_app(app)
    with app.app_context():
        db.create_all()

    migrate = Migrate(app, db)
    migrate.init_app(app, db)
    CORS(app)
    route_index(app)
    return app