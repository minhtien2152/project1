const express = require('express');
const router = express.Router();
const commentRoutes = require('../controllers/commentController');
const authController = require('./../controllers/authController');



//router.use(authController.protect);

router
    .route('/')
    .post(commentRoutes.createComment)
    .get(commentRoutes.getComments)

router
    .route('/:id')
    .delete(commentRoutes.deleteComment)
    .patch(commentRoutes.updateComment)
    


module.exports = router;