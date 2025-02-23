const { Collection } = require('mongoose');
const FlashCardCollection = require('../model/flashcardCollectionModel');
const FlashCard = require('../model/flashcardModel');
const AppError = require('../utils/appError');
const catchHandle = require('../utils/catchHandle');
const { getOne, getAll, deleteOne } = require('./handleFactory');

exports.getCollectionById = getOne(FlashCardCollection, {
  path: 'flashcards',
  select: '-__v -id',
});

exports.createCollection = catchHandle(async (req, res, next) => {
  const collection = await FlashCardCollection.create({
    ...req.body.collection,
    user: req.user.id,
  });
  req.body.flashcards.map(async (el) => {
    await FlashCard.create({ ...el, collection_id: collection._id });
  });

  res.status(200).json({
    status: 'success',
  });
});
exports.getAllCollection = getAll(FlashCardCollection, 'flashcards');

exports.updateCollection = catchHandle(async (req, res, next) => {
  const collection = await FlashCardCollection.findByIdAndUpdate(
    req.params.id,
    { ...req.body.collection, user: req.user.id },
    {
      new: true,
      runValidators: true,
    },
  ).populate('flashcards');

  if (!collection) {
    return next(new AppError('Unknown id', 404));
  }

  req.body.flashcards.map(async (el) => {
    await FlashCard.findByIdAndUpdate(
      el._id || new mongoose.Types.ObjectId(),
      {
        ...el,
        collection_id: collection._id,
      },
      { new: true, upsert: true },
    );
  });

  res.status(200).json({
    status: 'success',
  });
});

exports.deleteCollection = deleteOne(Collection);
