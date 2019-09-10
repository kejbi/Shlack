from slack import socketio, app_channels
from flask_socketio import join_room, leave_room, emit

@socketio.on('joined', namespace = '/chat')
def joined(data):
    print('joined received')
    channel = data['channel']
    user = data['user']
    join_room(channel)

    emit('status', {'message': user + ' has entered the room'}, room = channel)

@socketio.on('message sent', namespace='/chat')
def message_sent(data):
    channel = data['channel']
    user = data['user']
    message = data['message']
    emit('message delivery', {'message': f'<b>{user}</b>: {message}'}, room = channel)

@socketio.on('bye', namespace='/chat')
def left(data):
    channel = data['channel']
    user = data['user']
    leave_room(channel)
    emit('status', {'message': user + ' has left the room'}, room = channel)

@socketio.on('disconnect')
def disc():
    print('disco')