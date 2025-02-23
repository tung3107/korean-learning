const Course = require('../model/courseModel');
const AppError = require('../utils/appError');
const multer = require('multer');

const catchHandle = require('../utils/catchHandle');
const { deleteOne, updateOne, createOne, getOne } = require('./handleFactory');

exports.getCourseById = getOne(
  Course,
  {
    path: 'lessons',
    select: '-__v -id -description -content',
    populate: {
      path: 'excercises',
      select: '-v -id -content',
    },
  },
  null,
  ['slug'],
);

exports.getPaidCourses = catchHandle(async (req, res, next) => {
  const docs = await Course.find({
    $and: [{ price: { $gt: 0 } }, { price: { $exists: true } }],
  });
  if (!docs) {
    return next(new AppError('No document found', 400));
  }
  res.status(200).json({
    status: 'success',
    data: {
      docs,
    },
  });
});

exports.getAllCourse = catchHandle(async (req, res, next) => {
  const docs = await Course.find({
    $or: [{ price: 0 }, { price: { $exists: false } }],
  });
  if (!docs) {
    return next(new AppError('No document found', 400));
  }
  res.status(200).json({
    status: 'success',
    data: {
      docs,
    },
  });
});
exports.getCourseLearnBySlug = catchHandle(async (req, res, next) => {
  const slug = req.params.id;
  const doc = await Course.aggregate([
    {
      $match: {
        slug: slug,
      },
    },
    {
      $lookup: {
        from: 'lessons',
        localField: '_id',
        foreignField: 'course',
        as: 'lessons',
        pipeline: [
          {
            $lookup: {
              from: 'excercises',
              localField: '_id',
              foreignField: 'lesson',
              as: 'excercises',
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: 'excercises',
        localField: 'lessons._id',
        foreignField: 'lesson',
        as: 'excercises',
      },
    },
    {
      $addFields: {
        lessonArr: {
          $reduce: {
            input: '$lessons',
            // Danh sách các lesson (bài học) liên quan đến course
            initialValue: [],
            // Giá trị khởi đầu của mảng tích lũy là rỗng []
            in: {
              $concatArrays: [
                '$$value',
                ['$$this._id'],
                {
                  $map: {
                    input: {
                      $filter: {
                        input: '$excercises',
                        as: 'excercise',
                        cond: {
                          $eq: ['$$this._id', '$$excercise.lesson'],
                        },
                      },
                    },
                    as: 'excercise',
                    in: {
                      $concat: [
                        'excercise',
                        ' ',
                        { $toString: '$$excercise._id' },
                      ],
                    },
                  },
                },
              ],
            },
          },
        },
      },
    },
    {
      $unset: [
        'excercises',
        'lessons.content',
        'lessons.description',
        'cover_photo',
        'description',
        'created_at',
        'lessons.excercises.content',
      ],
    },
  ]);
  if (!doc) {
    return next(new AppError('No document found', 400));
  }
  res.status(200).json({
    status: 'success',
    data: {
      doc,
    },
  });
});
exports.createCourse = createOne(Course);
exports.updateCourse = updateOne(Course, {
  callback: (req, res, next) => {
    if (req.file && req.file.filename) {
      req.body.cover_photo = req.file.filename;
    } else {
      return next(new AppError('File not found', 400));
    }
  },
});
exports.deleteCourse = deleteOne(Course);
