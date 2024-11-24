const express = require('express');
const {
  registerCourse,
  deleteRegistration,
} = require('../controller/registrationController');
const { protectRoute, restrictTo } = require('../controller/authController');

const route = express.Router();

route
  .route('/')
  .patch(protectRoute, restrictTo('admin'), registerCourse)
  .delete(protectRoute, deleteRegistration);

module.exports = route;
