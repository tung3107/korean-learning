const { deleteOne, updateOne, getOne, getAll } = require('./handleFactory');
const User = require('../model/userModel');
const catchHandle = require('../utils/catchHandle');
const AppError = require('../utils/appError');

const filterBody = (objects, ...allowedObject) => {
  let newObject = {};
  for (obj in objects) {
    if (allowedObject.includes(obj)) {
      newObject[obj] = objects[obj];
    }
  }
  return newObject;
};

exports.updateUser = catchHandle(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This routhe is not for password updates', 400));
  }
  const filterData = filterBody(req.body, 'name', 'email');
  const user = await User.findByIdAndUpdate(req.user.id, filterData, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    status: 'success',
    data: user,
  });
});

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getAllUser = getAll(User);
exports.getUser = getOne(User);
exports.deleteUser = deleteOne(User);
exports.adminUpdateUser = updateOne(User);
