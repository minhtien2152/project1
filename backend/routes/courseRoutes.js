const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const authController = require("./../controllers/authController");

router.route("/").get(courseController.getAllCourses);

router.route("/:id").get(courseController.getCourse);

//router.use(authController.protect);

//router.use(authController.restrictTo('admin'));

router.route("/").post(courseController.createCourse);

router
  .route("/:id")
  .patch(courseController.updateCourse)
  .delete(courseController.deleteCourse);

module.exports = router;
