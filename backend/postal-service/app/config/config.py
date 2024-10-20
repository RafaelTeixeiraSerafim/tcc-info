import os
from dotenv import load_dotenv
# basedir = os.path.abspath(os.path.dirname(__file__))

load_dotenv(".flaskenv.local")
load_dotenv(".env.local")

class Config(object):
    DEBUG = False
    TESTING = False
    # CSRF_ENABLED = True
    SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']
    # EUREKA_URL = os.environ['EUREKA_URL']
    FLASK_RUN_PORT = os.environ.get('FLASK_RUN_PORT', 8080)


class ProductionConfig(Config):
    DEBUG = False


class StagingConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class TestingConfig(Config):
    TESTING = True