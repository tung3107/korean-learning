const mongoose = require('mongoose');

const excerciseSchema = new mongoose.Schema({
  excercise_name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
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
  lesson: {
    type: mongoose.Schema.ObjectId,
    ref: 'Lesson',
    required: [true, 'Excercise must belong to an lesson'],
  },
});

const Excercise = mongoose.model('Excercise', excerciseSchema);

module.exports = Excercise;
