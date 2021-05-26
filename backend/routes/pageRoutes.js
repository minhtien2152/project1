const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');
const authController = require('./../controllers/authController');



//router.use(authController.protect);

router
    .route('/')
    .post(pageController.createPage)
    .get(pageController.getPages)

router
    .route('/:id')
    .get(pageController.getOne)
    .delete(pageController.deletePage)
    .patch(pageController.updatePage)
    


module.exports = router;