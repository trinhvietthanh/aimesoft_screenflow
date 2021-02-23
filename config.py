from setup import basedir
import os

class Config(object):
    DEBUG = False
    WTF_CSRF_ENABLED = True
    MONGODB_SETTINGS = {
        'db': os.environ.get('MONGODB_DATABASE'),
        'host': os.environ.get('MONGODB_HOSTNAME'),
        'username': os.environ.get('MONGODB_USERNAME'),
        'password': os.environ.get('MONGODB_PASSWORD'),
        'port': 27017}
    JWT_SECRET_KEY = 't1NP63m4wnBg6nyHYKfmc2TpCOGI4nss'

class ProductionConfig(Config):
    DEBUG = False
    WTF_CSRF_ENABLED = True
    JWT_SECRET_KEY = 't1NP63m4wnBg6nyHYKfmc2TpCOGI4nss'
class StagingConfig(Config):
    DEVELOPMENT = True
    DEBUG = True

class DevelopmentConfig(Config):
    """Development configuration """
    DEVELOPMENT = True
    DEBUG = True
    MONGODB_SETTINGS = {
        'db': os.environ.get('MONGODB_DATABASE'),
        'host': os.environ.get('MONGODB_HOSTNAME'),
        'username': os.environ.get('MONGODB_USERNAME'),
        'password': os.environ.get('MONGODB_PASSWORD'),
        'port': 27017}
    JWT_SECRET_KEY = 't1NP63m4wnBg6nyHYKfmc2TpCOGI4nss'

class TestingConfig(Config):
   
    TESTING = True


