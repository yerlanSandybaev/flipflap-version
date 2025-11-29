const express = require('express');
const Avatar = require('../models/Avatar');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Create avatar
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, color, emoji, style } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Avatar name is required' });
    }

    const avatar = new Avatar({
      user: req.userId,
      name,
      color: color || '#000000',
      emoji: emoji || '👤',
      style: style || 'minimalist'
    });

    await avatar.save();
    res.status(201).json({ message: 'Avatar created', avatar });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create avatar', error: error.message });
  }
});

// Get user's avatar
router.get('/user/:userId', async (req, res) => {
  try {
    const avatar = await Avatar.findOne({ user: req.params.userId });
    if (!avatar) {
      return res.status(404).json({ message: 'Avatar not found' });
    }
    res.json(avatar);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch avatar', error: error.message });
  }
});

// Update avatar
router.put('/:avatarId', authMiddleware, async (req, res) => {
  try {
    const { name, color, emoji, style } = req.body;
    const avatar = await Avatar.findByIdAndUpdate(
      req.params.avatarId,
      { name, color, emoji, style },
      { new: true }
    );
    res.json({ message: 'Avatar updated', avatar });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update avatar', error: error.message });
  }
});

module.exports = router;
