const express = require('express');

const router = express.Router();
const foodController = require('../controllers/foodController');
const userMiddleware = require('../middleware/userMiddleware');

router.post('/logDatabaseFood', userMiddleware, foodController.logDatabaseFood);
router.get('/getFood', foodController.getFood);
router.get('/searchFoods', foodController.searchFoods);
module.exports = router;
