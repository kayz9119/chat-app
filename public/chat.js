const socket = io.connect('https://chat-app-kayz.herokuapp.com')

const sender = document.getElementById('sender')
const message = document.getElementById('message')
const submitBtn = document.getElementById('submitBtn')
const output = document.getElementById('output')
const feedback = document.getElementById('feedback')

submitBtn.addEventListener('click touchstart', () => {
    socket.emit('chat', {
        message: message.value,
        sender: sender.value,
    })
})

socket.on('chat', data => {
    feedback.innerHTML = '';
    output.innerHTML += `<p><strong>${data.sender}: </strong>${data.message}</p>`
    if(data.sender == sender.value){
        message.value = '';
    }
})

message.addEventListener('keypress', () => {
    socket.emit('typing', sender.value)
})

socket.on('typing', data => {
    feedback.innerHTML = `<p>${data} is typing...</p>`
})
