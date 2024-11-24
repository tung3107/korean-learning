const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'Provide a valid email'],
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    select: false,
    required: true,
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    select: false,
    required: true,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'password and passwordConfirm must be the same',
    },
  },
  create_at: {
    type: Date,
    default: Date.now(),
  },
  passwordChangedAt: Date,
  courses: [{ type: mongoose.Schema.ObjectId, ref: 'Course' }],
});

// userSchema.virtual('courses', {
//   ref: 'Course',
//   foreignField: 'userID',
//   localField: '_id',
// });

//// encrypt password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    console.log('isnt modified');
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

/// define the passwordchangedAt
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) {
    return next();
  }
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.checkCorrectPassword = async (candidPassword, password) => {
  return await bcrypt.compare(candidPassword, password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
