import os

from flask import Flask, url_for
from flask_mongoengine import MongoEngine
from flask_bcrypt import Bcrypt
from flask_restful import Api
from flask_jwt_extended import JWTManager
from config import Config
 
app = Flask(__name__)
db = MongoEngine()
# configure app
#config = Config

app.config.from_object(Config)
# load config variables
# if 'MONGODB_URI' in os.environ:
# 	app.config['MONGODB_SETTINGS'] = {'host': os.environ['MONGODB_URI'], 'db': 'aimesoft',
#                                                 'retryWrites': False}
# print(os.environ['MONGODB_URI'])
if 'JWT_SECRET_KEY' in os.environ:
    app.config['JWT_SECRET_KEY'] = os.environ['JWT_SECRET_KEY']

jwt = JWTManager(app)
bcrypt = Bcrypt(app)
api = Api(app)
db.init_app(app)
from website.resources import router
from website.resources.router import initialize_routes
initialize_routes(api)

