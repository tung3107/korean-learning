const mongooes = require('mongoose');

const FlashCardCollectionSchema = new mongooes.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    user: {
      type: mongooes.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Collection must belong to an user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

FlashCardCollectionSchema.virtual('flashcards', {
  ref: 'FlashCard',
  localField: '_id',
  foreignField: 'collection_id',
});

const FlashCardCollection = mongooes.model(
  'FlashCardCollection',
  FlashCardCollectionSchema,
);

module.exports = FlashCardCollection;
