import os

from flask import Flask, url_for
from flask_mongoengine import MongoEngine
from flask_bcrypt import Bcrypt
from flask_restful import Api
from flask_jwt_extended import JWTManager


app = Flask(__name__)
app.config['MONGODB_SETTINGS'] = {
    'db': 'aimesoft',
    'host': '192.168.1.69',
    'port': 27017

}
app.config.from_envvar('ENV_FILE_LOCATION')
jwt = JWTManager(app)
bcrypt = Bcrypt(app)
api = Api(app)
db = MongoEngine(app)
from website.resources import router
from website.resources.router import initialize_routes
initialize_routes(api)

