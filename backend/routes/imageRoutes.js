/* eslint-disable no-unused-vars */
const express = require('express');
const userMiddleware = require('../middleware/userMiddleware');
const router = express.Router();
const firebaseController = require('../controllers/firebaseImageController.js');

router.post('/uploadPicture', firebaseController.uploadPicture);
router.get('/getPictureURL', firebaseController.getPictureURL);
module.exports = router;
