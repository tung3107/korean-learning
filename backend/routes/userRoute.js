const express = require('express');
const {
  signup,
  login,
  protectRoute,
  restrictTo,
} = require('../controller/authController');
const { updateUser, getAllUser } = require('../controller/userController');

const route = express.Router();

route.post('/signup', signup);
route.post('/login', login);

route
  .route('/')
  .patch(protectRoute, restrictTo('admin'), updateUser)
  .get(protectRoute, restrictTo('user'), getAllUser);

// route.route('/').get(getAllCourse).post(createCourse);

// route.route('/:id').get(getCourseById).patch(updateCourse).delete(deleteCourse);

module.exports = route;
