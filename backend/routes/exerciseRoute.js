const express = require('express');
const {
  getAllExercise,
  createExcercise,
  getExerciseById,
  updateExcercise,
  deleteExercise,
} = require('../controller/excerciseController');
const { protectRoute, restrictTo } = require('../controller/authController');

const route = express.Router();

route
  .route('/')
  .get(getAllExercise)
  .post(protectRoute, restrictTo('user'), createExcercise);

route
  .route('/:id')
  .get(getExerciseById)
  .patch(protectRoute, restrictTo('user'), updateExcercise)
  .delete(protectRoute, restrictTo('user'), deleteExercise);

module.exports = route;
