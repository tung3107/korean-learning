const express = require('express');
const { protectRoute, restrictTo } = require('../controller/authController');
const catchHandle = require('../utils/catchHandle');
const FlashCard = require('../model/flashcardModel');

const route = express.Router();

route.route('/:collectionId').get(
  protectRoute,
  restrictTo('admin'),
  catchHandle(async (req, res) => {
    const { mode } = req.query;
    let flashcards = await FlashCard.find({
      collectionId: req.params.collectionId,
    });

    if (mode === 'random') {
      flashcards = flashcards.sort(() => Math.random() - 0.5);
    }
    res.status(200).json(flashcards);
  }),
);
module.exports = route;
