const express = require('express');
const router = express.Router();
const crawlController = require('../controllers/crawlController');
const authController = require('./../controllers/authController');



//router.use(authController.protect);

// router
//     .route('/')
//     .post(pageController.createPage)
//     .get(pageController.getPages)

router
    .route('/')
    .post(crawlController.crawlSingle)

    


module.exports = router;