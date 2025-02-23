const express = require('express');
const { searchAll } = require('../controller/searchController');

const route = express.Router();

route.route('/').get(searchAll);

module.exports = route;
