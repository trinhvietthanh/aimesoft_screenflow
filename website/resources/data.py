from flask import request, Response, jsonify, render_template_string
from website.database.models import TimeLine, Trackers, Users
from flask_restful import Resource
from flask_jwt_extended import jwt_required
import json
from website import app
import copy
import re
from datetime import timedelta, datetime
import flask_excel as excel
from bson.objectid import ObjectId
import pytz
# Detail time of Employee

@app.template_filter('datetimefilter')
def datetimefilter(value, format='%H:%M:%S'):
    tz = pytz.timezone('Asia/Ho_Chi_Minh')  # timezone you want to convert to from UTC (America/Los_Angeles)
    utc = pytz.timezone('UTC')
    value = utc.localize(value).astimezone(pytz.utc)
    local_dt = value.astimezone(tz)
    return local_dt.strftime(format)

def ListTimes(times, month, year):
    if(len(times) > 0):
        list_time = []
        time_line = TimeLine.objects.first()
        time_start_am = datetimefilter(time_line['time_start_am'])
        time_end_am = datetimefilter(time_line['time_end_am'])
        time_start_pm = datetimefilter(time_line['time_start_pm'])
        time_end_pm = datetimefilter(time_line['time_end_pm'])

        obj = {'id': "", 'checkIn': "", 'checkOut': ""}
        for time in times:
            date = time['time'].strftime("%d/%m/%Y")
            if(month == time['time'].strftime("%#m") and year == time['time'].strftime("%Y")):

                if(obj['id'] == date):
                    if(time['type'] == "checkOut"):
                        checkOut = datetimefilter(time["time"])
                        if(checkOut > obj['checkOut']):
                            obj['checkOut'] = checkOut

                    else:
                        checkIn = datetimefilter(time["time"])
                        if (obj['checkIn'] == "" or obj['checkIn'] > checkIn):
                            obj['checkIn'] = checkIn

                else:
                    if(obj['id'] != "" and obj['checkIn'] != "" and obj['checkOut'] != ""):
                        if(time_start_am < obj['checkIn']):
                            checkIn = (obj['checkIn']).split(":")
                        else:
                            checkIn = (time_start_am).split(":")
                        if(checkOut > time_end_am):
                            lunch = (time_end_am).split(":")
                            if(time_end_pm > obj['checkOut']):
                                checkOut = (obj['checkOut']).split(":")
                            else:
                                checkOut = (time_end_pm).split(":")
                            endlunch = (time_start_pm).split(":")
                            t1 = timedelta(
                                hours=int(checkIn[0]), minutes=int(checkIn[1]))
                            t2 = timedelta(
                                hours=int(lunch[0]), minutes=int(lunch[1]))
                            t3 = timedelta(
                                hours=int(endlunch[0]), minutes=int(endlunch[1]))
                            t4 = timedelta(
                                hours=int(checkOut[0]), minutes=int(checkOut[1]))
                            obj['total'] = str(t2-t1 + t4-t3)
                        else:
                            checkOut = (obj['checkOut']).split(":")
                            t1 = timedelta(
                                hours=int(checkIn[0]), minutes=int(checkIn[1]))
                            t2 = timedelta(
                                hours=int(checkOut[0]), minutes=int(checkOut[1]))
                            obj['total'] = str(t2-t1)
                        list_time.append(copy.copy(obj))
                    obj = {'id': "", 'checkIn': "", 'checkOut': ""}
                    obj["id"] = date
                    if(time['type'] == "checkOut"):
                        obj['checkOut'] = datetimefilter(time["time"])
                    else:
                        obj['checkIn'] = datetimefilter(time["time"])

        if(obj['checkIn'] is not None):

            if(time_start_am < obj['checkIn']):
                checkIn = (obj['checkIn']).split(":")
            else:
                checkIn = (time_start_am).split(":")
            if(obj['checkOut'] > time_end_am):
                # Time to Lunch
                lunch = (time_end_am).split(":")
                endlunch = (time_start_pm).split(":")
                #
                if(time_end_pm > obj['checkOut']):
                    checkOut = (obj['checkOut']).split(":")
                else:
                    checkOut = (time_end_pm).split(":")
                if(checkIn and not checkOut and month == time['time'].strftime("%#m")
                and year == time['time'].strftime("%Y")):
                    t1 = timedelta(hours=int(checkIn[0]), minutes=int(checkIn[1]))
                    t2 = timedelta(hours=int(lunch[0]), minutes=int(lunch[1]))
                    t3 = timedelta(
                        hours=int(endlunch[0]), minutes=int(endlunch[1]))
                    t4 = timedelta(
                        hours=int(checkOut[0]), minutes=int(checkOut[1]))
                    obj['total'] = str(t2-t1 + t4-t3)
                    if (obj['total'] < "0:00:00"):
                        obj['total'] = "0:00:00"
                    list_time.append(obj)
            else:
                
                if(checkIn and checkOut and month == time['time'].strftime("%#m")
                and year == time['time'].strftime("%Y")):
                    checkOut = (obj['checkOut']).split(":")
                    t1 = timedelta(hours=int(checkIn[0]), minutes=int(checkIn[1]))
                    t2 = timedelta(hours=int(checkOut[0]), minutes=int(checkOut[1]))
                    obj['total'] = str(t2-t1)
                    if (obj['total'] < "0:00:00"):
                        obj['total'] = "0:00:00"
                    list_time.append(obj)
        return list_time
    else:
        return None


class InputApi(Resource):
    #@jwt_required
    def post(self):
        body = request.get_json()
        user = Users(**body)
        user.save()
        id = user.id
        return id, 200


class InputApiTime(Resource):
    #@jwt_required
    def post(self):
        body = request.get_json()
        time = Trackers(**body)
        time.save()
        resp = jsonify(time)
        resp.status_code = 200
        return resp


class EditEmployee(Resource):
    #@jwt_required
    def post(self):
        body = request.get_json()
        user_id = body['_id']
        user = Users.objects(id=code).update(**body)
        user = Users.objects.get(pk=code)
        resp = jsonify(user)
        resp.status_code = 200
        return resp


class OutputEmployee(Resource):
    #@jwt_required
    def get(self):
        body = request.args.get('id')
        user = Users.objects.get(pk=body)
        resp = jsonify(user)
        resp.status_code = 200
        return resp
# Detail Employee


class OutputApiTime(Resource):
    #@jwt_required
    def get(self):
        user = request.args.get('user')
        month = request.args.get('month')
        year = request.args.get('year')
        if(month == None):
            month = (datetime.now()).strftime("%#m")
        if(year == None):
            year = (datetime.now()).strftime("%Y")
        myquery = {"user": {"$oid": user}}
        times = Trackers.objects(user=user).all()

        list_time = ListTimes(times, month, year)
        resp = jsonify(list_time)
        resp.status_code = 200
        return resp


class OutputApi(Resource):
    #@jwt_required
    def get(self):
        user = Users.objects.all()
        resp = jsonify(user)
        resp.status_code = 200
        return resp


class UpdateTimeLine(Resource):
    #@jwt_required
    def put(self):
        code = request.args.get('id')
        body = request.get_json()
        time = TimeLine.objects(id=code).update(**body)
        resp = jsonify(time)
        resp.status_code = 200
        return resp


class TimeLines(Resource):
    #@jwt_required
    def get(self):
        time = TimeLine.objects.first()
        resp = jsonify(time)
        resp.status_code = 200
        return resp
