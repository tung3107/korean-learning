const Exercise = require('../model/excerciseModel');
const AppError = require('../utils/appError');

const catchHandle = require('../utils/catchHandle');

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
exports.createExcercise = catchHandle(async (req, res, next) => {
  const exercise = await Exercise.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      newExcercise: exercise,
    },
  });
});
exports.updateExcercise = catchHandle(async (req, res, next) => {
  const exercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!exercise) {
    return next(new AppError('Invalid course ID', 400));
  }

  res.status(201).json({
    status: 'success',
    data: {
      updatedExercise: exercise,
    },
  });
});

exports.deleteExercise = catchHandle(async (req, res, next) => {
  const exercise = await Exercise.findByIdAndDelete(req.params.id);

  if (!exercise) {
    return next(new AppError('Invalid course ID', 400));
  }

  res.status(201).json({
    status: 'success',
  });
});
