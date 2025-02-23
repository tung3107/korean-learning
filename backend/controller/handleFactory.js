const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchHandle = require('../utils/catchHandle');

exports.deleteOne = (Model) =>
  catchHandle(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document with that ID', 400));
    }

    res.status(201).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = (Model, pops) =>
  catchHandle(async (req, res, next) => {
    if (pops) {
      pops.callback(req, res, next);
    }
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
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

exports.createOne = (Model) =>
  catchHandle(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        newDoc: doc,
      },
    });
  });

exports.getOne = (Model, popOptions, selectOption, idOptions) =>
  catchHandle(async (req, res, next) => {
    let query;

    ///// CUSTOM GET BY DIFFERENT KEY
    if (idOptions && idOptions.length > 1) {
      const andConditions = idOptions.map((option) => ({
        [option]: req.params.id,
      }));
      query = Model.find({ $and: andConditions });
    } else if (idOptions && idOptions.length === 1) {
      query = Model.find({ [idOptions[0]]: req.params.id });
    } else {
      query = Model.findById(req.params.id);
    }

    if (popOptions) query = query.populate(popOptions);
    if (selectOption) query = query.select(selectOption);

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

exports.getAll = (Model, popOptions) =>
  catchHandle(async (req, res, next) => {
    let filter = {};
    if (req.params.courseId) filter = { course: req.params.courseId };
    let feature = new APIFeatures(
      popOptions ? Model.find(filter).populate(popOptions) : Model.find(filter),
      req.query,
    )
      .filter()
      .sort();

    const docs = await feature.query;

    if (!docs) {
      return next(new AppError('No documents found', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        docs,
      },
    });
  });
