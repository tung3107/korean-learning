const mongoose = require('mongoose');

const UserRegistrationSchema = new mongoose.Schema({
  registered_at: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'User',
  },
  registered_course: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Course',
    },
  ],
});

const UserRegistration = mongoose.model(
  'UserRegistration',
  UserRegistrationSchema,
);

module.exports = UserRegistration;
