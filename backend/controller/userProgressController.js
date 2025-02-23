const UserProgress = require('../model/userProgressModel');
const catchHandle = require('../utils/catchHandle');
const { getAll, createOne, getOne, updateOne } = require('./handleFactory');

exports.getAllUserProgress = getAll(UserProgress);
exports.createUserProgress = createOne(UserProgress);
exports.updateUserProgress = catchHandle(async (req, res, next) => {
  const doc = await UserProgress.findOneAndUpdate(
    {
      $and: [{ user: req.user.id }, { course: req.params.id }],
    },
    { $addToSet: req.body },
    {
      new: true,
      runValidators: true,
    },
  );
  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      doc,
    },
  });
});
exports.getOneUserProgress = catchHandle(async (req, res, next) => {
  let query = UserProgress.find({
    $and: [{ user: req.user.id }, { course: req.params.id }],
  });
  const doc = await query;
  if (!doc) {
    return next(new AppError('Unknown doc id', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      doc,
    },
  });
});
