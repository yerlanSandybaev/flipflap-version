const express = require('express');
const Profile = require('../models/Profile');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Get user profile
router.get('/:userId', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.userId })
      .populate('followers', 'username')
      .populate('following', 'username');
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch profile', error: error.message });
  }
});

// Update profile
router.put('/:userId', authMiddleware, async (req, res) => {
  try {
    if (req.userId !== req.params.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const { bio, location, website, interests } = req.body;
    const profile = await Profile.findOneAndUpdate(
      { user: req.params.userId },
      { bio, location, website, interests, updatedAt: new Date() },
      { new: true }
    );

    res.json({ message: 'Profile updated', profile });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update profile', error: error.message });
  }
});

// Follow user
router.post('/:userId/follow', authMiddleware, async (req, res) => {
  try {
    const userProfile = await Profile.findOne({ user: req.userId });
    const targetProfile = await Profile.findOne({ user: req.params.userId });

    if (!userProfile || !targetProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    if (!userProfile.following.includes(req.params.userId)) {
      userProfile.following.push(req.params.userId);
      targetProfile.followers.push(req.userId);
      await userProfile.save();
      await targetProfile.save();
    }

    res.json({ message: 'User followed' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to follow user', error: error.message });
  }
});

// Unfollow user
router.post('/:userId/unfollow', authMiddleware, async (req, res) => {
  try {
    const userProfile = await Profile.findOne({ user: req.userId });
    const targetProfile = await Profile.findOne({ user: req.params.userId });

    if (!userProfile || !targetProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    userProfile.following = userProfile.following.filter(id => id.toString() !== req.params.userId);
    targetProfile.followers = targetProfile.followers.filter(id => id.toString() !== req.userId);
    await userProfile.save();
    await targetProfile.save();

    res.json({ message: 'User unfollowed' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to unfollow user', error: error.message });
  }
});

module.exports = router;
