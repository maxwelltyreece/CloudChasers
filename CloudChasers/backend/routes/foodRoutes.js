const express = require('express');

const router = express.Router();
const foodController = require('../controllers/foodController');

router.post('/logDatabaseFood', foodController.logDatabaseFood);
router.get('/getFood', foodController.getFoods);
module.exports = router;
