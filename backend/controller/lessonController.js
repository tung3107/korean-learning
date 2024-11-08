const Lesson = require('../model/lessonModel');
const AppError = require('../utils/appError');

const catchHandle = require('../utils/catchHandle');

exports.getAllLesson = catchHandle(async (req, res, next) => {
  const lessons = await Lesson.find();

  res.status(200).json({
    status: 'success',
    results: lessons.length,
    data: {
      lessons,
    },
  });
});

exports.getLessonById = catchHandle(async (req, res, next) => {
  const lesson = await Lesson.findById(req.params.id);

  if (!lesson) {
    return next(new AppError('Unknown course id', 400));
  }

  res.status(200).json({
    status: 'success',
    data: {
      lesson,
    },
  });
});
exports.createLesson = catchHandle(async (req, res, next) => {
  const lesson = await Lesson.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      newLesson: lesson,
    },
  });
});
exports.updateLesson = catchHandle(async (req, res, next) => {
  const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!lesson) {
    return next(new AppError('Invalid course ID', 400));
  }

  res.status(201).json({
    status: 'success',
    data: {
      updatedLesson: lesson,
    },
  });
});

exports.deleteLesson = catchHandle(async (req, res, next) => {
  const lesson = await Lesson.findByIdAndDelete(req.params.id);

  if (!lesson) {
    return next(new AppError('Invalid course ID', 400));
  }

  res.status(201).json({
    status: 'success',
  });
});
