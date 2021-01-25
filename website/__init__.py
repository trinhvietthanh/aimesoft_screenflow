from flask import Flask, url_for
from flask_mongoengine import MongoEngine
from flask_bcrypt import Bcrypt
from flask_restful import Api
from flask_jwt_extended import JWTManager
import flask_excel

app = Flask(__name__)
app.config['MONGODB_SETTINGS'] = {
    'host': 'mongodb://localhost:27017/aimesoft',

}
app.config.from_envvar('ENV_FILE_LOCATION')
jwt = JWTManager(app)
bcrypt = Bcrypt(app)
flask_excel.init_excel(app)
api = Api(app)
db = MongoEngine(app)
from website.resources import router
from website.resources.router import initialize_routes
initialize_routes(api)

