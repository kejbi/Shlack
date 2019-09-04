import os

from flask import Flask
from flask_socketio import SocketIO

app = Flask(__name__)
app.config["SECRET_KEY"] = 'asdfasdfasdf34rr523rt623'
socketio = SocketIO(app)

users = []
channels = {}
messages = {}

import slack.routes

