const Exercise = require('../model/excerciseModel');
const AppError = require('../utils/appError');

const catchHandle = require('../utils/catchHandle');
const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} = require('./handleFactory');

exports.getAllExercise = getAll(Exercise);
exports.getExerciseById = getOne(Exercise);
exports.createExcercise = createOne(Exercise);
exports.updateExcercise = updateOne(Exercise);
exports.deleteExercise = deleteOne(Exercise);
