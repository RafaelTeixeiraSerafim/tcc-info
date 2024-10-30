from flask import Flask
from flask_cors import CORS
from app.database import db
from app.routes import route_index
from flask_migrate import Migrate
from py_eureka_client import eureka_client
from app.config.get_windows_host_ip import get_windows_host_ip
from app.config.config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    with app.app_context():
        db.create_all()

    migrate = Migrate(app, db)
    migrate.init_app(app, db)
    # if app.config.get("IS_PROD") == "True":
    #     eureka_server_host = app.config.get("EUREKA_SERVER_HOST")
    #     instance_host = app.config.get("INSTANCE_HOST")
    # else:
    #     eureka_server_host = get_windows_host_ip()
    #     instance_host = "localhost"
    # eureka_client.init(eureka_server=f'http://{eureka_server_host}:8761/eureka/', app_name="postal-service", instance_host=instance_host, instance_port=int(app.config.get("FLASK_RUN_PORT")), instance_ip="0.0.0.0")
    CORS(app)
    route_index(app)
    return app
    