const express = require('express');
const {
  getAllCourse,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseLearnBySlug,
  getPaidCourses,
} = require('../controller/courseController');
const lessonRoute = require('./lessonRoute');
const { protectRoute, restrictTo } = require('../controller/authController');
const Course = require('../model/courseModel');
const { uploadCoursePhoto } = require('../utils/multerConfig');

const route = express.Router({ mergeQueryParams: true });

route.route('/paid-course').get(getPaidCourses);
route
  .route('/')
  .get(getAllCourse)
  .post(protectRoute, restrictTo('user'), createCourse);

// route.use('/search', getAllCourse);
route
  .route('/learning/:id')
  .get(protectRoute, restrictTo('admin'), getCourseLearnBySlug);
route
  .route('/:id')
  .get(getCourseById)
  .patch(protectRoute, restrictTo('user'), uploadCoursePhoto, updateCourse)
  .delete(protectRoute, restrictTo('user'), deleteCourse);

module.exports = route;
