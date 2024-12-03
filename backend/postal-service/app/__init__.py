from flask import Flask
from flask_cors import CORS
from app.database import db
from app.routes import route_index
from flask_migrate import Migrate
from app.config.config import Config
from py_eureka_client import eureka_client

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    with app.app_context():
        db.create_all()

    migrate = Migrate(app, db)
    migrate.init_app(app, db)

    eureka_server_host = app.config.get("EUREKA_SERVER_HOST")
    if (eureka_server_host == "::"): eureka_server_host = "[::]"

    instance_host = app.config.get("INSTANCE_HOST")
    eureka_client.init(eureka_server=f'http://{eureka_server_host}:8761/eureka/', app_name="postal-service", instance_host=instance_host, instance_port=int(app.config.get("FLASK_RUN_PORT")), instance_ip="::")
    
    CORS(app)
    route_index(app)
    return app
    