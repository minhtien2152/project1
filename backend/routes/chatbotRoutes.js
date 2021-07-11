const express = require("express");
const router = express.Router();
const chatbotController = require("../controllers/chatbotController");
const authController = require("./../controllers/authController");

router.route("/").get(chatbotController.returnMedia);
router.route("/quickCategory").get(chatbotController.quickReply);
router.route("/randomCourse").get(chatbotController.randomCourse);
router.route("/categoryCourse/:id").get(chatbotController.categoryCourse);
//router.route("/:id").get(courseController.getCourse);

//router.use(authController.protect);

//router.use(authController.restrictTo('admin'));

// router.route("/").post(courseController.createCourse);

// router
//   .route("/:id")
//   .patch(courseController.updateCourse)
//   .delete(courseController.deleteCourse);

module.exports = router;
