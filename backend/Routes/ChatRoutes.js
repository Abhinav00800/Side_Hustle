const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');

// Get chat history for a room
router.get('/chat/:roomId', async (req, res) => {
  try {
    const messages = await Chat.find({ roomId: req.params.roomId }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

module.exports = router;
