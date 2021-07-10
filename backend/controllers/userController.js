const User = require("../models/userModel");
const base = require("./baseController");

exports.deleteMe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      active: false,
    });

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

exports.getCourses = async (req, res, next) => {
  try {
    const data = await User.findById(req.params.id).populate({
      path: "courses",
      select: "_id title thumbnail price",
    });

    res.status(200).json({
      status: "success",
      data: [...data.courses],
    });
  } catch (error) {
    next(error);
  }
};

exports.addFavCourse = async (req, res, next) => {
  try {
    await User.updateOne(
      { _id: req.params.id },
      { $push: { courses: [req.params.idcourse] } }
    );

    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteCourse = async (req, res, next) => {
  try {
    await User.updateOne(
      { _id: req.params.id },
      { $pullAll: { courses: [req.params.idcourse] } }
    );

    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllUsers = base.getAll(User);
exports.getUser = base.getOne(User);

// Don't update password on this
exports.updateUser = base.updateOne(User);
exports.deleteUser = base.deleteOne(User);
