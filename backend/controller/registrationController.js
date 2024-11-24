const Course = require('../model/courseModel');
const User = require('../model/userModel');
const AppError = require('../utils/appError');
const catchHandle = require('../utils/catchHandle');

exports.registerCourse = catchHandle(async (req, res, next) => {
  const courseID = req.body.courseID;

  const course = await Course.findById(courseID);

  if (!course) {
    return next(new AppError('No course with that ID', 404));
  }

  if (req.user.courses.includes(courseID)) {
    return next(new AppError('You have already registered that course', 404));
  }
  const updateUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      $push: { courses: courseID },
    },
    { new: true, runValidators: true },
  );
  req.user = updateUser;
  res.status(201).json({
    status: 'success',
    data: updateUser,
  });
});

exports.deleteRegistration = catchHandle(async (req, res, next) => {
  const courseID = req.body.courseID;
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      $pull: { courses: courseID },
    },
    { new: true },
  );
  req.user = updatedUser;
  res.status(200).json({
    status: 'success',
    data: updatedUser,
  });
});
