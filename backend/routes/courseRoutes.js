const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authController = require('./../controllers/authController');


router
    .route('/')
    .get(courseController.getAllCourses);

router
    .route('/:id')
    .get(courseController.getCourse)

router.use(authController.protect);

router
    .route('/:id')
    .patch(authController.restrictTo('admin'),courseController.updateCourse)
    .delete(authController.restrictTo('admin'),courseController.deleteCourse);

module.exports = router;