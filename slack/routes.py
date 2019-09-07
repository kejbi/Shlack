from slack import app, users, app_channels
from flask import render_template, request, jsonify, redirect

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

@app.route('/api/channels', methods=['GET'])
def get_channels():
    return jsonify(app_channels)

@app.route('/api/channels/add', methods=['POST'])
def add_channel():
    name = request.form.get('name')
    if name not in app_channels:
        app_channels[name] = []
        return jsonify({'success': True})
    else:
        return jsonify({'success': False})

@app.route('/chat')
def chat():
    return render_template('chat.html')