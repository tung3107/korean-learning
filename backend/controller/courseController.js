const Course = require('../model/courseModel');
const AppError = require('../utils/appError');

const catchHandle = require('../utils/catchHandle');

exports.getAllCourse = catchHandle(async (req, res, next) => {
  const courses = await Course.find();

  res.status(200).json({
    status: 'success',
    results: courses.length,
    data: {
      courses,
    },
  });
});

exports.getCourseById = catchHandle(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

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
exports.createCourse = catchHandle(async (req, res, next) => {
  const course = await Course.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      newCourse: course,
    },
  });
});
exports.updateCourse = catchHandle(async (req, res, next) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!course) {
    return next(new AppError('Invalid course ID', 400));
  }

  res.status(201).json({
    status: 'success',
    data: {
      updatedCourse: course,
    },
  });
});

exports.deleteCourse = catchHandle(async (req, res, next) => {
  const course = await Course.findByIdAndDelete(req.params.id);

  if (!course) {
    return next(new AppError('Invalid course ID', 400));
  }

  res.status(200).json({
    status: 'success',
  });
});
