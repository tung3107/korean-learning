const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema({
  completed_at: {
    type: Date,
  },
  percentage: {
    type: Number,
  },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  course: {
    type: mongoose.Schema.ObjectId,
    ref: 'Course',
    required: true,
  },
  finsisedLessons: [
    {
      type: String,
    },
  ],
});

// userProgressSchema.pre('findOneAndUpdate', function (next) {
//   const query = this.getUpdate();
//   if (this.finsisedLessons) {
//     const finishedLessons = this.finsisedLessons.length || 0;
//     const percentage = !this.finsisedLessons
//       ? 0
//       : (this.finsisedLessons.length / this.percentage) * 10;
//     this.setUpdate({ ...query, percentage });
//   }
//   next();
// });

const UserProgress = mongoose.model('UserProgress', userProgressSchema);

module.exports = UserProgress;
