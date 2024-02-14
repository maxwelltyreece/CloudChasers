const express = require('express');

const router = express.Router();
const foodController = require('../controllers/foodController');

router.post('/logDatabaseFood', foodController.logDatabaseFood);

module.exports = router;
