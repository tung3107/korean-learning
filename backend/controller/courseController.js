const Course = require('../model/courseModel');
const AppError = require('../utils/appError');

const catchHandle = require('../utils/catchHandle');
const { deleteOne, updateOne, createOne } = require('./handleFactory');

exports.getAllCourse = catchHandle(async (req, res, next) => {
  const courses = await Course.find().populate('userCount').sort('level');

  res.status(200).json({
    status: 'success',
    results: courses.length,
    data: {
      courses,
    },
  });
});

exports.getCourseById = catchHandle(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: 'lessons',
    select: '-__v -id -description -content',
  });

  if (!course) {
    return next(new AppError('Unknown course id', 400));
  }

  res.status(200).json({
    status: 'success',
    data: {
      course,
    },
  });
});
exports.createCourse = createOne(Course);
exports.updateCourse = updateOne(Course);
exports.deleteCourse = deleteOne(Course);
