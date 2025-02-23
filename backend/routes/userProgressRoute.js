const express = require('express');
const { restrictTo, protectRoute } = require('../controller/authController');
const {
  getAllUserProgress,
  createUserProgress,
  getOneUserProgress,
  updateUserProgress,
} = require('../controller/userProgressController');

const route = express.Router();

route
  .route('/')
  .get(protectRoute, restrictTo('admin'), getAllUserProgress)
  .post(protectRoute, restrictTo('admin'), createUserProgress);

route
  .route('/:id')
  .get(protectRoute, restrictTo('admin'), getOneUserProgress)
  .patch(protectRoute, restrictTo('admin'), updateUserProgress);

module.exports = route;
