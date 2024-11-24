const mongoose = require('mongoose');
const User = require('../model/userModel');

const courseSchema = new mongoose.Schema(
  {
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
courseSchema.virtual('userCount', {
  ref: 'User',
  foreignField: 'courses',
  localField: '_id',
  count: true,
});

courseSchema.virtual('lessons', {
  ref: 'Lesson',
  localField: '_id',
  foreignField: 'course',
});

// courseSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'lessons',
//     select: '-description -content -course -__v',
//   });
//   next();
// });

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
