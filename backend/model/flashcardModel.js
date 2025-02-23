const mongooes = require('mongoose');

const FlashCardSchema = new mongooes.Schema(
  {
    front: {
      type: String,
      required: true,
    },
    back: {
      type: String,
      required: true,
    },
    collection_id: {
      type: mongooes.Schema.ObjectId,
      ref: 'FlashCardCollection',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const FlashCard = mongooes.model('FlashCard', FlashCardSchema);

module.exports = FlashCard;
