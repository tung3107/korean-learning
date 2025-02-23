const express = require('express');
const multer = require('multer');

const upload = multer({ dest: 'public/user/img' });
const {
  signup,
  login,
  protectRoute,
  restrictTo,
  logout,
} = require('../controller/authController');
const {
  updateUser,
  getAllUser,
  getUser,
  getMe,
} = require('../controller/userController');

const route = express.Router();

route.post('/signup', signup);
route.post('/login', login);
route.post('/logout', logout);
route.get('/me', protectRoute, getMe, getUser);

route
  .route('/')
  .patch(protectRoute, restrictTo('admin'), updateUser)
  .get(protectRoute, restrictTo('user'), getAllUser);

route.route('/:id').get(protectRoute, restrictTo('user'), getUser);

// route.route('/').get(getAllCourse).post(createCourse);

// route.route('/:id').get(getCourseById).patch(updateCourse).delete(deleteCourse);

module.exports = route;
