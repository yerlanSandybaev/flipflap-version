const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const avatarRoutes = require('./routes/avatars');
const profileRoutes = require('./routes/profiles');
const messageRoutes = require('./routes/messages');
const searchRoutes = require('./routes/search');
const authMiddleware = require('./middleware/auth');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/avatars', avatarRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/search', searchRoutes);

// Socket.io for real-time messaging
const userSockets = new Map();

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('user-online', (userId) => {
    userSockets.set(userId, socket.id);
    io.emit('user-status', { userId, status: 'online' });
  });

  socket.on('send-message', (data) => {
    const { from, to, content, timestamp } = data;
    const recipientSocketId = userSockets.get(to);

    if (recipientSocketId) {
      io.to(recipientSocketId).emit('receive-message', {
        from,
        content,
        timestamp
      });
    }
  });

  socket.on('user-typing', (data) => {
    const { to, from } = data;
    const recipientSocketId = userSockets.get(to);
    if (recipientSocketId) {
      io.to(recipientSocketId).emit('user-typing', { from });
    }
  });

  socket.on('disconnect', () => {
    for (const [userId, socketId] of userSockets.entries()) {
      if (socketId === socket.id) {
        userSockets.delete(userId);
        io.emit('user-status', { userId, status: 'offline' });
        break;
      }
    }
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
