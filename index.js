const express = require("express")
const socket = require("socket.io")

const app = express()

const server = app.listen(process.env.PORT||3000, () => {
    console.log('*:3000');
})
app.use(express.static('public'))
const io = socket(server)
io.on('connection', (socket) => {
    
    io.socketsJoin('chat1');

    socket.on('chat', data =>  {
        if(data.message !== ''){
            io.sockets.emit('chat', data);
        }
    });

    socket.on('typing', data => {
        socket.broadcast.emit('typing', data)
    })
})