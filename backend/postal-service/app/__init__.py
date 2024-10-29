from flask import Flask
from flask_cors import CORS
from app.database import db
from app.routes import route_index
from flask_migrate import Migrate
from dotenv import load_dotenv
from py_eureka_client import eureka_client
from app.config.get_windows_host_ip import get_windows_host_ip
from app.config.config import Config
import os

def create_app():
    app = Flask(__name__)
    # env_config = os.getenv("APP_SETTINGS", "app.config.config.Config")
    app.config.from_object(Config)
    db.init_app(app)
    with app.app_context():
        db.create_all()

    migrate = Migrate(app, db)
    migrate.init_app(app, db)
    if app.config.get("IS_PROD") == "True":
        host = app.config.get("EUREKA_SERVER_HOST")
    else:
        host = get_windows_host_ip()
    eureka_client.init(eureka_server=f'http://{host}:8761/eureka', app_name="postal-service", instance_port=5000, instance_ip="127.0.0.1")
    CORS(app)
    route_index(app)
    return app
    