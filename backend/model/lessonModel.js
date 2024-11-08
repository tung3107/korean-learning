const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  lesson_name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  isFinished: {
    type: Boolean,
    default: false,
  },
  course: {
    type: mongoose.Schema.ObjectId,
    ref: 'Course',
    required: [true, 'Lesson must belong to an course'],
  },
});

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;
