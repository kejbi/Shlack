document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.enter-name').onsubmit = () => {
        const request = new XMLHttpRequest()
        const name = document.querySelector('#name').value
        request.open('POST', '/api/user')
        
        const data = new FormData()
        data.append('name', name)
        request.send(data)

        request.onload = () => {
            const res = JSON.parse(request.responseText)
            if(!res.success) {
                document.querySelector('label').innerHTML = 'Username occupied'
            }
            else {
                localStorage.setItem('user', name)
                window.location.replace('http://localhost:5000/channels')
            }
        }
        return false
    }
})