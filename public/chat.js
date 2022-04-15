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

var chat_window_scroll_interval;
document.getElementById( "autoscroll_chbx" ).addEventListener( "change", function() {
  // this == checkbox
  if ( this.checked ) {
    // scroll every 1 second by 40px vertically
    chat_window_scroll_interval = setInterval( function() {
       document.getElementById( "chat-window" ).scrollBy( 0, 10 );
    }, 10 );
  } else {
    clearInterval( chat_window_scroll_interval );
  }
} );