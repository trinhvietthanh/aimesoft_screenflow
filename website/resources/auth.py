from flask import request, Response
from website.database.models import Users
from flask_restful import Resource
from flask_jwt_extended import create_access_token
import datetime

class SignupApi(Resource):
    def post(self):
        body = request.get_json()
        user = Users(**body)
        user.hash_password()
        user.save()
        id = user.id
        return {'id': str(id)}, 200


class LoginApi(Resource):
    def post(self):
        body = request.get_json()
        try:
            user = Users.objects.get(email=body.get('email'))
            authorized = user.check_password(body.get('password'))
        except:
            return {'error': 'Email or password invalid'}, 401
        if not authorized:
            return {'error': 'Email or password invalid'}, 401
        access_token = create_access_token(identity=str(user.id))
        return {'token': access_token}, 200
