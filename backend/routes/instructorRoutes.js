const express = require('express');
const router = express.Router();
const instructorController = require('../controllers/instructorController');
const authController = require('./../controllers/authController');



//router.use(authController.protect);

router
    .route('/')
    .post(instructorController.createIntructor)
    .get(instructorController.getAll)

router
    .route('/:id')
    .get(instructorController.getOne)
    .delete(instructorController.deleteIntructor)
    .patch(instructorController.updateIntructor)
    


module.exports = router;