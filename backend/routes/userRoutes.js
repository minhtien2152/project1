const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('./../controllers/authController');


router.post('/login', authController.login);
router.post('/signup', authController.signup);

// Protect all routes after this middleware
//router.use(authController.protect);

router.delete('/deleteMe', userController.deleteMe);
router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);
router
    .route('/:id/courses')
    .get(userController.getCourses)
router
    .route('/:id/courses/:idcourse')
    .delete(userController.deleteCourse)


// Only admin have permission to access for the below APIs 
//router.use(authController.restrictTo('admin'));

router
    .route('/')
    .get(userController.getAllUsers);



module.exports = router;