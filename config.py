from setup import basedir

class Config(object):
    DEBUG = False
    WTF_CSRF_ENABLED = True
    MONGODB_SETTINGS = {
        'db': 'aimesoft',
        'host': 'db',
        'port': 27017}
    JWT_SECRET_KEY = 't1NP63m4wnBg6nyHYKfmc2TpCOGI4nss'

class ProductionConfig(Config):
    DEBUG = False
    JWT_SECRET_KEY = 't1NP63m4wnBg6nyHYKfmc2TpCOGI4nss'
class StagingConfig(Config):
    DEVELOPMENT = True
    DEBUG = True

class DevelopmentConfig(Config):
    """Development configuration """
    DEVELOPMENT = True
    DEBUG = True
    MONGODB_SETTINGS = {
        'db': 'aimesoft',
        'host': 'localhost',
        'port': 27017}
    JWT_SECRET_KEY = 't1NP63m4wnBg6nyHYKfmc2TpCOGI4nss'

class TestingConfig(Config):
   
    TESTING = True


