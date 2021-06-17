const Instructor = require('../models/instructorModel');
const base = require('./baseController');



exports.updateIntructor = base.updateOne(Instructor);
exports.deleteIntructor = base.deleteOne(Instructor);
exports.createIntructor = base.createOne(Instructor);
exports.getOne = base.getOne(Instructor);
exports.getAll = base.getAll(Instructor)
