const express = require('express');
const {
  getAllLesson,
  createLesson,
  getLessonById,
  updateLesson,
  deleteLesson,
} = require('../controller/lessonController');
const { protectRoute, restrictTo } = require('../controller/authController');

const route = express.Router({ mergeParams: true });

route
  .route('/')
  .get(getAllLesson)
  .post(protectRoute, restrictTo('user'), createLesson);

route
  .route('/:id')
  .get(getLessonById)
  .patch(protectRoute, restrictTo('user'), updateLesson)
  .delete(protectRoute, restrictTo('user'), deleteLesson);

module.exports = route;
