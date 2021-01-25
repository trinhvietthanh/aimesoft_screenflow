from website import db
from datetime import datetime
from flask_bcrypt import generate_password_hash, check_password_hash
from bson.objectid import ObjectId
from wtforms import FormField, FieldList, IntegerField

class Users(db.Document):
    voiceId = db.StringField()
    faceId = db.StringField()
    hasUserRegisteredForVoice = db.BooleanField(default=False)
    hasUserRegisteredForFace = db.BooleanField(default=False)
    firstName = db.StringField(required=True)
    lastName = db.StringField(required=True)
    displayName = db.StringField(required=True)
    dob = db.StringField(required=False)
    email = db.EmailField()
    password = db.StringField(required=True, min_length=6)
    affiliation = db.StringField()
    createdAt = db.DateTimeField(default=datetime.utcnow)
    updatedAt = db.DateTimeField(default=datetime.utcnow)
    __v = db.IntField(default=0)
    meta = {
    'strict': False,
    }
    def hash_password(self):
        self.password = generate_password_hash(self.password).decode('utf8')

    def check_password(self, password):
        return check_password_hash(self.password, password)

class Trackers(db.Document):
    user = db.ObjectIdField(Users)
    time = db.DateTimeField(default=datetime.utcnow)
    type = db.StringField(required=True)
    __v = db.IntField(default=0)
    meta = {
    'strict': False,
    }

class TimeLine(db.Document):
    time_start_am = db.DateTimeField(required=True, default=datetime.utcnow)
    time_end_am = db.DateTimeField(required=True, default=datetime.utcnow)
    time_start_pm = db.DateTimeField(required=True, default=datetime.utcnow)
    time_end_pm = db.DateTimeField(required=True, default=datetime.utcnow)



    


