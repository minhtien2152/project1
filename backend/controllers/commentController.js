const Comment = require('../models/commentModel');
const base = require('./baseController');



exports.updateComment = base.updateOne(Comment);
exports.deleteComment = base.deleteOne(Comment);
exports.createComment = base.createOne(Comment);
exports.getComments = base.getAll(Comment)
