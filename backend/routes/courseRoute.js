const express = require('express');
const {
  getAllCourse,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../controller/courseController');
const { protectRoute, restrictTo } = require('../controller/authController');

const route = express.Router();

route
  .route('/')
  .get(getAllCourse)
  .post(protectRoute, restrictTo('user'), createCourse);

route
  .route('/:id')
  .get(getCourseById)
  .patch(protectRoute, restrictTo('user'), updateCourse)
  .delete(protectRoute, restrictTo('user'), deleteCourse);

module.exports = route;
