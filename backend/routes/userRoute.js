const express = require('express');
const { signup, login } = require('../controller/authController');

const route = express.Router();

route.post('/signup', signup);
route.post('/login', login);

// route.route('/').get(getAllCourse).post(createCourse);

// route.route('/:id').get(getCourseById).patch(updateCourse).delete(deleteCourse);

module.exports = route;
