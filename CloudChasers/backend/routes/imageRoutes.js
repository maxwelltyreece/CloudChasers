const express = require('express');
const userMiddleware = require('../middleware/userMiddleware');
const router = express.Router();
const firebaseController = require('../controllers/firebaseImageController.js');

router.get('/getPictureURL', firebaseController.getPictureURL);
router.post('/uploadPicture', firebaseController.uploadPicture);
module.exports = router;
