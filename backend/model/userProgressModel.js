const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema({
  completedPercent: {
    type: Number,
    default: 0,
  },
  completed_at: {
    type: Date,
  },
  user: { type: mongooes.Schema.ObjectId, ref: 'User', required: true },
  course: {
    type: mongooes.Schema.ObjectId,
    ref: 'Course',
    required: true,
  },
});

const UserProgress = mongoose.model('UserProgress', courseSchema);

module.exports = UserProgress;
