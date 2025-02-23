const Course = require('../model/courseModel');
const User = require('../model/userModel');
const UserProgress = require('../model/userProgressModel');
const UserRegistration = require('../model/userRegistrationModel');
const AppError = require('../utils/appError');
const catchHandle = require('../utils/catchHandle');
const { deleteOne, getOne } = require('./handleFactory');

exports.registerCourse = catchHandle(async (req, res, next) => {
  const courseID = req.params.id;

  const course = await Course.findById(courseID);

  if (!course) {
    return next(new AppError('No course with that ID', 404));
  }

  let registration = await UserRegistration.findOneAndUpdate(
    { user: req.user.id },
    {
      $addToSet: { registered_course: courseID },
    },
    { new: true, upsert: true },
  );

  let userProgress = await UserProgress.findOneAndUpdate(
    { user: req.user.id, course: course },
    {
      user: req.user.id,
      course: courseID,
    },
    { new: true, upsert: true },
  );
  // await Course.findByIdAndUpdate(courseID, { isRegistered: true });
  // await UserProgress.create({ user: req.user.id, course: courseID });
  // const updateUser = await User.findByIdAndUpdate(
  //   req.user.id,
  //   {
  //     $addToSet: { courses: courseID },
  //   },
  //   { new: true, runValidators: true },
  // );
  res.status(201).json({
    status: 'success',
    data: course.slug,
  });
});

exports.deleteRegistration = deleteOne(UserRegistration);
exports.getOneRegistration = catchHandle(async (req, res, next) => {
  const doc = await UserRegistration.findOne({ user: req.user.id }).populate({
    path: 'registered_course',
    select: '-__v -id -description -content',
  });
  if (!doc) {
    return next(new AppError('Unknown doc id', 404));
  }

  res.status(202).json({
    status: 'success',
    data: doc,
  });
});

exports.checkRegistration = catchHandle(async (req, res, next) => {
  const courseID = req.params.id;
  const doc = await UserRegistration.findOne({
    user: req.user.id,
    registered_course: courseID,
  });
  res.status(202).json({
    status: 'success',
    data: doc ? true : false,
  });
});

// getOne(
//   UserRegistration,

//   null,
//   [],
// );
