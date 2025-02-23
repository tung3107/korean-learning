const Lesson = require('../model/lessonModel');
const AppError = require('../utils/appError');

const catchHandle = require('../utils/catchHandle');
const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} = require('./handleFactory');

exports.getAllLesson = getAll(Lesson);
exports.getLessonById = getOne(Lesson, 'excercises');
exports.createLesson = createOne(Lesson);
exports.updateLesson = updateOne(Lesson);
exports.deleteLesson = deleteOne(Lesson);
