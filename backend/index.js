const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app); // Create HTTP server

const io = new Server(server, {
  cors: {
    origin: "*", // Allow frontend
    methods: ["GET", "POST"]
  }
});

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// MongoDB connection
const mongoDB = require('./db');
mongoDB();

const Chat = require('./models/Chat'); 

// Routes
app.use('/api', require('./Routes/Createuser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));
app.use('/api', require('./Routes/AddProduct'));
app.use('/api', require('./Routes/ChatRoutes'));

// Socket.IO logic
io.on('connection', (socket) => {
  console.log('User connected');
  socket.on('joinRoom', ({ roomId }) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  socket.on('sendMessage', async ({ roomId, message }) => {
  // Save to DB
  try {
    const newMsg = new Chat({ roomId, sender: message.sender, text: message.text });
    await newMsg.save();
  } catch (err) {
    console.error('Failed to save message:', err);
  }

  // Emit to others in room
  socket.to(roomId).emit('receiveMessage', message);
  console.log('Message sent:', message);
});

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
