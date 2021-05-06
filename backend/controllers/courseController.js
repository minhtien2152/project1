const Course = require('../models/course.model');
const base = require('./baseController');


exports.getAllCourses = base.getAll(Course);
exports.getCourse = base.getOne(Course);
exports.updateCourse = base.updateOne(Course);
exports.deleteCourse = base.deleteOne(Course);
exports.createCourse = base.createOne(Course);