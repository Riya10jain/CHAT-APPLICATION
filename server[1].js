const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// Serve static frontend files from /public
app.use(express.static(path.join(__dirname, 'public')));

// Simple root route (index.html in public will be served)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// In-memory user count (not persistent) and simple user list by socket id
const users = {};

io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  // When a user sets their name
  socket.on('set username', (username) => {
    users[socket.id] = username || 'Anonymous';
    // notify everyone
    io.emit('user list', Object.values(users));
    socket.broadcast.emit('server message', `${users[socket.id]} joined the chat`);
  });

  // Broadcast chat messages to everyone
  socket.on('chat message', (msg) => {
    const username = users[socket.id] || 'Anonymous';
    io.emit('chat message', { username, msg, ts: Date.now() });
  });

  // Typing indicator
  socket.on('typing', (isTyping) => {
    const username = users[socket.id] || 'Anonymous';
    socket.broadcast.emit('typing', { username, isTyping });
  });

  socket.on('disconnect', () => {
    const username = users[socket.id];
    if (username) {
      delete users[socket.id];
      io.emit('user list', Object.values(users));
      socket.broadcast.emit('server message', `${username} left the chat`);
    }
    console.log('user disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
