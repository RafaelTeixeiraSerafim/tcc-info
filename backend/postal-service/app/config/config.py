import os
from dotenv import load_dotenv
# basedir = os.path.abspath(os.path.dirname(__file__))

load_dotenv()

# Get the environment setting (default to 'local' if not set)
env = os.getenv('ENV', 'local')
dotenv_file = f".env.{env}"
flask_dotenv_file = f".flaskenv.{env}"

# Load the specific environment file
load_dotenv(dotenv_file)
load_dotenv(flask_dotenv_file)

class Config(object):
    DEBUG = False
    TESTING = False
    # CSRF_ENABLED = True
    SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']
    # EUREKA_URL = os.environ['EUREKA_URL']
    FLASK_RUN_PORT = os.environ.get('FLASK_RUN_PORT', 5000)
    IS_PROD = os.environ.get('IS_PROD', "False")
    EUREKA_SERVER_HOST = os.environ.get("EUREKA_SERVER_HOST", "localhost")


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