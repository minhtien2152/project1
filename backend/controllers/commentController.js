const Comment = require("../models/commentModel");
const APIFeatures = require("../utils/apiFeatures");
const base = require("./baseController");

exports.updateComment = base.updateOne(Comment);
exports.deleteComment = base.deleteOne(Comment);
exports.createComment = base.createOne(Comment);
exports.getComments = async (req, res, next) => {
  try {
    const { limit, sort, page, populate, ...rest } = req.query;

    const sortAndPaginate = { limit, sort, page };
    const features = new APIFeatures(
      Comment.find({ ...rest }).populate(populate),
      sortAndPaginate
    )
      .sort()
      .paginate();

    const doc = await features.query;

    res.status(200).json({
      status: "success",
      results: doc.length,
      data: doc,
    });
  } catch (error) {
    next(error);
  }
};
