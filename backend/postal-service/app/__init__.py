from flask import Flask
from flask_cors import CORS
from app.database import db
from app.routes import route_index
from flask_migrate import Migrate
from dotenv import load_dotenv
from py_eureka_client import eureka_client
from app.config.get_windows_host_ip import get_windows_host_ip
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
    win_host_ip = get_windows_host_ip()
    eureka_client.init(eureka_server=f'http://{win_host_ip}:8761/eureka', app_name="postal-service", instance_port=5000, instance_ip="127.0.0.1")
    CORS(app)
    route_index(app)
    return app
    