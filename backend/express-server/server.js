const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  // Example: Handle a message from the Django backend
  socket.on('messageFromDjango', (data) => {
    console.log('Message from Django:', data);
    // Broadcast the message to all connected clients
    io.emit('messageToClients', data); 
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(3001, () => { 
  console.log('Listening on port 3001');
});