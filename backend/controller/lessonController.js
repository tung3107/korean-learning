const Lesson = require('../model/lessonModel');
const AppError = require('../utils/appError');

const catchHandle = require('../utils/catchHandle');
const { deleteOne, updateOne, createOne } = require('./handleFactory');

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
  const lesson = await Lesson.findById(req.params.id).populate('excercises');

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
exports.createLesson = createOne(Lesson);
exports.updateLesson = updateOne(Lesson);
exports.deleteLesson = deleteOne(Lesson);
