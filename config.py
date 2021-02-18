import os
from setup import basedir

class Config(object):
    DEBUG = False
    TESTING = False
    WTF_CSRF_ENABLED = True
    JWT_SECRET_KEY = 't1NP63m4wnBg6nyHYKfmc2TpCOGI4nss'
    SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']

class ProductionConfig(Config):
    DEBUG = False

class StagingConfig(Config):
    DEVELOPMENT = True
    DEBUG = True

class DevelopmentConfig(Config):
    """Development configuration """
    DEVELOPMENT = True
    DEBUG = True


class TestingConfig(Config):
   
    TESTING = True

# class BaseConfig(object):
#     app.config['MONGODB_SETTINGS'] = {
#         'db': 'aimesoft',
#         'host': '192.168.1.69',
#         'port': 27017

#     }

# class TestConfig(object):
#     """Development configuration """
#     TESTING= True
#     DEBUG = True
#     WTF_CSRF_ENABLED = False