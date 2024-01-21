const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log(`${socket.id} connected`);

  socket.on('setUsername', (userName) => {
    socket.userName = userName;
    io.emit ('userName', userName);
    console.log('${socket.userName} connected');
  })
  socket.on('chat message', (message) => {
    io.emit('chat message', {userName: socket.userName, message: message}); // Broadcast the message to all connected clients
  });

  // Listen for disconnection
  socket.on('disconnect', () => {
    console.log('${socket.userName} disconnected');
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
