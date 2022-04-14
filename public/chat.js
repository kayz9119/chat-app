const socket = io.connect()

const sender = document.getElementById('sender')
const message = document.getElementById('message')
const submitBtn = document.getElementById('submitBtn')
const output = document.getElementById('output')
const feedback = document.getElementById('feedback')
const chat_win = document.getElementById('chat-window')
const autoscroll = document.getElementById('autoscroll')

submitBtn.addEventListener('click', () => {

    socket.emit('chat', {
        message: message.value,
        sender: sender.value,
    });
    
});

socket.on('connect', function(client){
     name = prompt('name');
     socket.emit('chat', {
         message: name + ' bağlandı.',
         sender: 'admin'
     });
     sender.value = name;
     if(name){
        sayhi = confirm('Selam vermeye ne dersin?');
        
        if(sayhi){
            message.value = "Merhaba!";
            socket.emit('chat', {
                message: message.value,
                sender: sender.value,
            });
        }
     }
});

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
});


autoscroll.addEventListener('change', function(e) {
    if(autoscroll.checked == true){
        pageScroll();
    }else{
        console.log(autoscroll.checked)
    }
});
function pageScroll() {
    chat_win.scrollBy(0, 5);
    scrolldelay = setTimeout(pageScroll, 10);
}