const express = require('express');
const Message = require('../models/Message');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Get messages between two users
router.get('/conversation/:userId', authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { from: req.userId, to: req.params.userId },
        { from: req.params.userId, to: req.userId }
      ]
    })
      .populate('from', 'username')
      .populate('to', 'username')
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch messages', error: error.message });
  }
});

// Get all conversations for user
router.get('/conversations', authMiddleware, async (req, res) => {
  try {
    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [{ from: req.userId }, { to: req.userId }]
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ['$from', req.userId] },
              '$to',
              '$from'
            ]
          },
          lastMessage: { $first: '$content' },
          lastMessageTime: { $first: '$createdAt' },
          unread: {
            $sum: {
              $cond: [{ $and: [{ $eq: ['$to', req.userId] }, { $eq: ['$read', false] }] }, 1, 0]
            }
          }
        }
      }
    ]);

    // Populate user details
    const result = await Promise.all(
      conversations.map(async (conv) => {
        const user = await User.findById(conv._id).select('username');
        return {
          userId: conv._id,
          username: user?.username,
          lastMessage: conv.lastMessage,
          lastMessageTime: conv.lastMessageTime,
          unread: conv.unread
        };
      })
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch conversations', error: error.message });
  }
});

// Send message
router.post('/send', authMiddleware, async (req, res) => {
  try {
    const { to, content } = req.body;

    if (!to || !content) {
      return res.status(400).json({ message: 'Recipient and message content are required' });
    }

    const message = new Message({
      from: req.userId,
      to,
      content
    });

    await message.save();
    await message.populate('from', 'username');
    await message.populate('to', 'username');

    res.status(201).json({ message: 'Message sent', data: message });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send message', error: error.message });
  }
});

module.exports = router;
