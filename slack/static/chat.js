const BASE_URL = 'http://localhost:5000'

if(!localStorage.getItem('user')) {
    window.location.replace(BASE_URL)
}
if(!localStorage.getItem('channel')) {
    window.location.replace(BASE_URL + '/channels')
}

document.addEventListener('DOMContentLoaded', () => {
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port + '/chat', {'sync disconnect on unload': true})
    const channel = localStorage.getItem('channel')
    const user = localStorage.getItem('user')
    socket.on('connect', function() {
        socket.emit('joined', {channel: channel, user: user})
    })

    document.querySelector('.bot-bar').onsubmit = () => {
        let message = document.querySelector('#msg').value
        if(message != '') {
            socket.emit('message sent', {user: user, channel: channel, message: message})
        }
        document.querySelector('#msg').value = ''
        return false;
    }

    document.querySelector('#leave').onclick = () => {
        socket.emit('bye', {channel: channel, user: user})
        socket.disconnect()
        console.log('elo wariacie')
        localStorage.removeItem('channel')
        window.location.replace(BASE_URL + '/channels')
    }

    document.querySelector('#logout').onclick = () => {
        socket.emit('bye', {channel: channel, user: user})
        socket.disconnect()
        console.log('elo wariacie')
        localStorage.removeItem('channel')
        localStorage.removeItem('user')

        const request = new XMLHttpRequest()
        request.open('DELETE', BASE_URL + '/api/logout')
        request.setRequestHeader("Content-Type", "application/json")
        const data = {
            user: user
        }
        console.log(JSON.stringify(data))
        request.send(JSON.stringify(data))
        request.onload = () => {
            window.location.replace(BASE_URL)
        }
    }

    socket.on('status', (data) => {
        const li = document.createElement('li')
        li.innerHTML = data.message
        document.querySelector('.messages').append(li)
    })

    socket.on('message delivery', (data) => {
        const li = document.createElement('li')
        li.innerHTML = data.message
        document.querySelector('.messages').append(li)
    })

    
    
    

})