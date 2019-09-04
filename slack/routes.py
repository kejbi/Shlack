from slack import app, socketio, users, channels, messages
from flask import render_template, request, jsonify, redirect
from flask_socketio import emit

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/user', methods=['POST'])
def add_user():
    name = request.form.get('name')
    if name not in users:
        print(name)
        users.append(name)
        return jsonify({'success': True})
    else:
        return jsonify({'success': False})

@app.route('/channels')
def channels():
    return render_template('channels.html')