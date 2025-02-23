const express = require('express');
const { protectRoute, restrictTo } = require('../controller/authController');
const {
  createCollection,
  getAllCollection,
  getCollectionById,
  updateCollection,
  deleteCollection,
} = require('../controller/cardCollectionController');

const route = express.Router();

route
  .route('/')
  .post(protectRoute, restrictTo('admin'), createCollection)
  .get(protectRoute, restrictTo('admin'), getAllCollection);

route
  .route('/:id')
  .get(protectRoute, restrictTo('admin'), getCollectionById)
  .patch(protectRoute, restrictTo('admin'), updateCollection)
  .delete(protectRoute, restrictTo('admin'), deleteCollection);
module.exports = route;
