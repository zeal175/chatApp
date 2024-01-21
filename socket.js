document.addEventListener('DOMContentLoaded', function () {
  const socket = io();
  const express = require('express');
  const app = express();

  app.get('/socket.js' , (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
  })

  // Listen for 'chat message' events from the server
  socket.on('chat message', function (msg) {
    // Create a new list item and append it to the messages list
    const li = document.createElement('li');
    li.textContent = msg;
    document.getElementById('messages').appendChild(li);
  });

  // Handle form submission
  document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the message from the input field
    const message = document.getElementById('m').value;

    // Emit a 'chat message' event to the server
    socket.emit('chat message', message);

    // Clear the input field
    document.getElementById('m').value = '';

    return false;
  });
});