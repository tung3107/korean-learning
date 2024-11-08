const mongoose = require('mongoose');
const User = require('../model/userModel');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A course needs a name'],
    unique: [true, 'Name of course needs to be unique'],
  },
  duration: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  cover_photo: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: [1, 2, 3, 4, 5, 6],
    required: true,
  },
  userID: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
});

courseSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'userID',
  });
  next();
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
