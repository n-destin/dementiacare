const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const server_api = "http://127.0.0.1:8000/api/chat/"
const axios = require("axios")
// import axios from "axios"

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  connectionStateRecovery : {},
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});


io.on('connection', (socket) => {
  axios.post(server_api + "messages/", "user is connected").then(response =>{
    return response.data
  })

  socket.on('chat message', (message, conversation_id) => { // register teh data
    axios.post(server_api + "/messages/", data).then(response =>{
      socket.to(conversation_id).emit("chat message", message, response.last_messageId)
    })
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(3001, () => { 
  console.log('Listening on port 3001');
});