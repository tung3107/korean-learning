const Course = require('../model/courseModel');
const catchHandle = require('../utils/catchHandle');

exports.searchAll = catchHandle(async (req, res, next) => {
  let query = req.query.q
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/đĐ/g, 'd')
    .replace(' ', '-')
    .toLowerCase();
  if (!query) {
    return;
  }
  const course = await Course.find({
    slug: { $regex: query, $options: 'i' },
  }).select('-__v -duration -created_at -level -description');
  res.status(200).json({
    status: 'success',
    data: course,
  });
});
