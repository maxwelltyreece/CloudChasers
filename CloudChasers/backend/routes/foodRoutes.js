const express = require('express');

const router = express.Router();
const foodController = require('../controllers/foodController');

router.post('/logDatabaseFood', foodController.logDatabaseFood);
router.get('/getFood', foodController.getFoods);
router.get('/getFoodbyID', foodController.getFood);
router.get('/getFoodByName', foodController.getFoodByName);
module.exports = router;
