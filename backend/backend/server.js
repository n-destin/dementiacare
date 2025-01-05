
const socketio = require('socket.io')
const http = require("http")
const server = http.createServer();


const io = socketio(server, {
    cors : {
        origin : "http://127.0.0.1:8000/", 
        methods : ["GET", "POST"]
    }
})

io.on('connection', socket =>{
    console.log(socket.id)
})

server.listen(8000, ()=>{
    console.log("listening on port 8000");
})

