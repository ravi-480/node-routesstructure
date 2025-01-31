const Tour = require("../models/tourModel");
const AppError = require("../utils/apiError");
const ApiFeature = require("./../utils/apiFeature");
const catchAsync = require("./../utils/catchAsync");

const getAllTours = catchAsync(async (req, res, next) => {
  const features = new ApiFeature(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination();
  const getTour = await features.query;

  res.status(200).json({
    status: "success",
    length: getTour.length,
    data: getTour,
  });
});

const getSingleData = catchAsync(async (req, res, next) => {
  const data = await Tour.findById(req.params.id);
  if (!data) {
    return next(new AppError("No tour found with that Id", 404));
  }
  res.status(200).json({
    status: "success",
    data,
  });
});

const postData = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      tour: newTour,
    },
  });
});

const updateData = catchAsync(async (req, res, next) => {
  const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updateData) {
    return next(new AppError("No tour found with that Id", 404));
  }

  res.status(200).json({ status: "success", data: updatedTour });
});

const deleteData = catchAsync(async (req, res, next) => {
  const deletedData = await Tour.findByIdAndDelete(req.params.id);
  if (!deletedData) {
    return next(new AppError("No tour found with that Id", 404));
  }
  res.status(200).json({ status: "Success", deletedData });
});

module.exports = {
  getAllTours,
  getSingleData,
  postData,
  updateData,
  deleteData,
};
