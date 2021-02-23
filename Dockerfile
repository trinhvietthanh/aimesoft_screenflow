FROM node:12-alpine as build
WORKDIR /app
COPY ./package.json ./
RUN yarn install --production

FROM python:3.8.6
ENV PYTHONUNBUFFERED 1
WORKDIR /app
COPY requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt
COPY . .
ENV FLASK_APP=main.py
ENV FLASK_RUN_HOST=0.0.0.0

EXPOSE  5000

#ENTRYPOINT python main.py 
CMD ["flask", "run"]