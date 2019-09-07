const BASE_URL = 'http://localhost:5000'

if(localStorage.getItem('user') && localStorage.getItem('channel')) {
    window.location.replace(BASE_URL + '/chat')
}
else if(!localStorage.getItem('user'))  {
    window.location.replace(BASE_URL)
}

function channel_change(channel) {
    return function() {
        localStorage.setItem('channel', channel)
        window.location.replace(BASE_URL + '/chat')
    }
}

var functions = {}

document.addEventListener('DOMContentLoaded', () => {
    const channelRequest = new XMLHttpRequest()
    channelRequest.open('GET', BASE_URL + '/api/channels')
    channelRequest.send()
    channelRequest.onload = () => {
        const channels = JSON.parse(channelRequest.responseText)
        for(channel in channels) {
            console.log(channel)
            const div = document.createElement('div')
            div.innerHTML = channel
            div.classList.add('channel-tile')
            const button = document.createElement('button')
            button.innerHTML = 'Go chat!'
            functions.channel = channel_change(channel)
            button.onclick = functions.channel
            div.append(button)
            document.querySelector('.channels').append(div)
        }
    }

    document.querySelector('.create-channel').onsubmit = () => {
        const addRequest = new XMLHttpRequest()
        const channelName = document.querySelector('#channel-name').value
        addRequest.open('POST', BASE_URL + '/api/channels/add')

        const data = new FormData()
        data.append('name', channelName)
        data.append('user', localStorage.getItem('user'))

        addRequest.send(data)

        addRequest.onload = () => {
            const res = JSON.parse(addRequest.responseText)
            if(!res.success) {
                document.querySelector('#error').innerHTML = 'Channel exists, try other name'
            }
            
        }
        
    }

    document.querySelector('#logout').onclick = () => {
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
})