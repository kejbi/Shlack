const BASE_URL = 'http://localhost:5000'

console.log('yea it\'s me bro')

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

    document.querySelector('.bar').onsubmit = () => {
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

    socket.on('status', (data) => {
        console.log('status received')
        let users = document.querySelector('.users')
        users.innerHTML = ''
        data.users.forEach(user => {
            const div = document.createElement('div')
            div.innerHTML = user
            users.append(div)
        })
    })

    socket.on('message delivery', (data) => {
        const li = document.createElement('li')
        li.innerHTML = data.message
        document.querySelector('.messages').append(li)
    })
    
    
    

})