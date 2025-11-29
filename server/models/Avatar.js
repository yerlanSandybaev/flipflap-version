const mongoose = require('mongoose');

const avatarSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#000000'
  },
  emoji: {
    type: String,
    default: '👤'
  },
  style: {
    type: String,
    enum: ['minimalist', 'colorful', 'abstract'],
    default: 'minimalist'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Avatar', avatarSchema);
