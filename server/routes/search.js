const express = require('express');
const User = require('../models/User');
const Profile = require('../models/Profile');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Search users by username
router.get('/users/:query', authMiddleware, async (req, res) => {
  try {
    const query = req.params.query;
    
    if (query.length < 2) {
      return res.status(400).json({ message: 'Query must be at least 2 characters' });
    }

    const users = await User.find({
      username: { $regex: query, $options: 'i' },
      _id: { $ne: req.userId }
    })
      .select('username avatar')
      .limit(10);

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Search failed', error: error.message });
  }
});

// Get all users (for explore)
router.get('/explore', authMiddleware, async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.userId }
    })
      .select('username avatar')
      .limit(20);

    const enrichedUsers = await Promise.all(
      users.map(async (user) => {
        const profile = await Profile.findOne({ user: user._id }).select('bio followers');
        return {
          ...user.toObject(),
          profile
        };
      })
    );

    res.json(enrichedUsers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
});


module.exports = router;