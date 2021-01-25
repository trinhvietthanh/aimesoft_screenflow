from flask import render_template, url_for, flash, request, redirect, Response, render_template_string
from website import app, api
from .auth import SignupApi, LoginApi
from .data import InputApi, OutputApi, TimeLines, InputApiTime, OutputApiTime
from .data import ListTimes, OutputEmployee, UpdateTimeLine, EditEmployee
from flask_jwt_extended import jwt_required
from .excel import Excel
from website.database.models import Users, TimeLine, Trackers
import copy
from datetime import timedelta, datetime
import io
from openpyxl import Workbook



@app.route("/login",  methods=['GET', 'POST'])
def login():
    return render_template("index.html")


@app.route("/sign-up", methods=['GET', 'POST'])
def signUp():
    return render_template("index.html")


@app.route("/",  methods=['GET', 'POST'])
def my_index():
    return render_template("index.html")


@app.route("/staff",  methods=['GET', 'POST'])
def staff():
    return render_template("index.html")


@app.route("/setting",  methods=['GET', 'POST'])
def setting():
    return render_template("index.html")


@app.route("/detail-staff/<user>", methods=['GET'])
def detail(user):
    return render_template("index.html", id=user)


@app.route("/export/excel/employee", methods=['GET'])
def export():
    myio = io.BytesIO()
    wb = Workbook()
    ws1 = wb.active
    ws1['A1'] = "Tên nhân viên: "
    ws1['A2'] = "Chức vụ: "
    ws1['C2'] = "Ngày sinh: "
    ws1['A3'] = "Ngày"
    ws1['B3'] = "Check in"
    ws1['C3'] = "Check out"
    ws1['D3'] = 'Tổng thời gian'
    total = timedelta(hours=0, minutes=0)
    user = request.args.get('users')
    times = Trackers.objects(user=user)
    employee = Users.objects.get(pk=user)
    month = request.args.get('month')
    if(month == None):
        month = (datetime.now()).strftime("%#m")
    year = request.args.get('year')
    if(year == None):
        year = (datetime.now()).strftime("%y")
    ws1.title = employee.lastName + ' ' + employee.firstName
    ws1['B1'] = employee.lastName + ' ' + employee.firstName
    ws1['B2'] = employee.affiliation
    # ws1['D2'] = employee.birth
    list_time = ListTimes(times, month, year)
    ws1['B4'] = "Bảng chấm công tháng " + month
    i = 5
    for time in list_time:
        ws1['A' + str(i)] = time["id"]
        ws1['B' + str(i)] = time["checkIn"]
        ws1['C' + str(i)] = time["checkOut"]
        ws1['D' + str(i)] = time["total"]
        a = time["total"].split(':')  # Cắt time để lấy ngày và giờ
        t = timedelta(hours=int(a[0]), minutes=int(a[1]))
        total += t
        i += 1
    ws1['A' + str(i)] = "Tổng thời gian làm"
    ws1['D' + str(i)] = total
    wb.save(myio)
    myio.seek(0)

    return Response(myio, mimetype="application/ms-excel", headers={"Content-Disposition": "attachment;filename=employee.xlsx"})


@app.route('/export', methods=['GET'])
def listEmployee():
    file = io.BytesIO()

    if request.args.get('users') == 'all':
        users = []
        employeelist = Users.objects.all()
        for employee in employeelist:
            users.append(employee['id'])
    else:
        users = (request.args.get('users')).split(',')
    month = request.args.get('month')
    if(month == None):
        month = (datetime.now()).strftime("%#m")
    year = request.args.get('year')
    if(year == None):
        year = (datetime.now()).strftime("%y")
    file = Excel(users, month, year)
    return Response(file, mimetype="application/ms-excel", headers={"Content-Disposition": "attachment;filename=employee_report.xlsx"})


def initialize_routes(api):
    api.add_resource(SignupApi, '/api/auth/signup')
    api.add_resource(LoginApi, '/api/auth/login')
    api.add_resource(InputApi, '/api/data/input')
    api.add_resource(EditEmployee, '/api/edit/employee')
    api.add_resource(OutputApi, '/api/data/output')
    api.add_resource(TimeLines, '/api/time/output')
    api.add_resource(UpdateTimeLine, '/api/time/update')
    api.add_resource(InputApiTime, '/api/time/employee/input')
    api.add_resource(OutputApiTime, '/api/time/employee/output')
    api.add_resource(OutputEmployee, '/api/employee/output')
