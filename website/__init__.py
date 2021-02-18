import os

from flask import Flask, url_for
from flask_mongoengine import MongoEngine
from flask_bcrypt import Bcrypt
from flask_restful import Api
from flask_jwt_extended import JWTManager

app = Flask(__name__)

app.config.from_envvar('ENV_FILE_LOCATION')
app.config['MONGODB_SETTINGS'] = {
        'db': 'aimesoft',
        'host': 'db',
        'port': 27017
}
jwt = JWTManager(app)
bcrypt = Bcrypt(app)
api = Api(app)
db = MongoEngine(app)
from website.resources import router
from website.resources.router import initialize_routes
initialize_routes(api)

