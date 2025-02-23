const mongoose = require('mongoose');
const User = require('../model/userModel');
const Lesson = require('../model/lessonModel');

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A course needs a name'],
      unique: [true, 'Name of course needs to be unique'],
    },
    price: { type: Number, min: 0 },
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
    slug: {
      type: String,
      unique: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
courseSchema.virtual('userCount', {
  ref: 'UserRegistration',
  foreignField: 'registered_course',
  localField: '_id',
  count: true,
});

courseSchema.virtual('lessons', {
  ref: 'Lesson',
  localField: '_id',
  foreignField: 'course',
});
courseSchema.pre('save', function (next) {
  this.slug = this.name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đĐ/g, 'd')
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
  next();
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
