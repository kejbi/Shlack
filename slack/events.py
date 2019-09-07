from slack import socketio, app_channels
from flask_socketio import join_room, leave_room, emit

@socketio.on('joined', namespace = '/chat')
def joined(data):
    print('joined received')
    channel = data['channel']
    user = data['user']
    join_room(channel)
    if user not in app_channels[channel]:
        app_channels[channel].append(user)

    emit('status', {'users': app_channels[channel]}, room = channel)

@socketio.on('message sent', namespace='/chat')
def message_sent(data):
    channel = data['channel']
    user = data['user']
    message = data['message']
    emit('message delivery', {'message': user + ': ' + message}, room = channel)

@socketio.on('bye', namespace='/chat')
def left(data):
    channel = data['channel']
    user = data['user']
    leave_room(channel)
    app_channels[channel].remove(user)
    emit('status', {'users': app_channels[channel]}, room = channel)

@socketio.on('disconnect')
def disc():
    print('disco')