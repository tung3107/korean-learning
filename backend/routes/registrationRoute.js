const express = require('express');
const {
  registerCourse,
  deleteRegistration,
  getOneRegistration,
  checkRegistration,
} = require('../controller/registrationController');
const { protectRoute, restrictTo } = require('../controller/authController');

const route = express.Router();

route
  .route('/:id')
  .post(protectRoute, restrictTo('admin'), registerCourse)
  .delete(protectRoute, deleteRegistration)
  .get(protectRoute, restrictTo('admin'), checkRegistration);

route.route('/').get(protectRoute, restrictTo('admin'), getOneRegistration);

module.exports = route;
