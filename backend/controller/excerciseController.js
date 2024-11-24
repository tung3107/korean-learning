const Exercise = require('../model/excerciseModel');
const AppError = require('../utils/appError');

const catchHandle = require('../utils/catchHandle');
const { deleteOne, updateOne } = require('./handleFactory');

exports.getAllExercise = catchHandle(async (req, res, next) => {
  const exercises = await Exercise.find();

  res.status(200).json({
    status: 'success',
    results: exercises.length,
    data: {
      exercises,
    },
  });
});

exports.getExerciseById = catchHandle(async (req, res, next) => {
  const exercise = await Exercise.findById(req.params.id);

  if (!exercise) {
    return next(new AppError('Unknown course id', 400));
  }

  res.status(200).json({
    status: 'success',
    data: {
      exercise,
    },
  });
});
exports.createExcercise = createOne(Exercise);
exports.updateExcercise = updateOne(Exercise);

exports.deleteExercise = deleteOne(Exercise);
