document.addEventListener('DOMContentLoaded', () => {
    const channelRequest = new XMLHttpRequest()
    channelRequest.open('GET', 'http://localhost:5000/api/channels')
    channelRequest.send()
    channelRequest.onload = () => {
        const channels = JSON.parse(channelRequest.responseText)
        for(channel in channels) {
            console.log(channel)
            const a = document.createElement('a')
            a.href = '#'
            a.classList.add('channel-tile')
            a.innerHTML = channel
            document.querySelector('.channels').append(a)
        }
    }

    document.querySelector('.create-channel').onsubmit = () => {
        const addRequest = new XMLHttpRequest()
        const channelName = document.querySelector('#channel-name').value
        addRequest.open('POST', 'http://localhost:5000/api/channels/add')

        const data = new FormData()
        data.append('name', channelName)
        data.append('user', localStorage.getItem('user'))

        addRequest.send(data)

        addRequest.onload = () => {
            const res = JSON.parse(addRequest.responseText)
            if(!res.success) {
                document.querySelector('#error').innerHTML = 'Channel exits, try other name'
            }
            else {
                localStorage.setItem('channel', channelName)
            }
        }
        
    }
})