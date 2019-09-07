import os

from flask import Flask
from flask_socketio import SocketIO

app = Flask(__name__)
app.threaded = True
app.debug = True
app.config["SECRET_KEY"] = 'asdfasdfasdf34rr523rt623'
socketio = SocketIO(app)

users = ['kacpi']
app_channels = ['kluska', 'gupek']

import slack.routes
import slack.events

