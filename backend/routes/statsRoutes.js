const express = require('express');

const router = express.Router();
const userMiddleware = require('../middleware/userMiddleware');
const statsController = require('../controllers/statsController');

router.post('/streak', userMiddleware, statsController.getStreaks);
router.get('/dailyCaloricIntake', userMiddleware, statsController.getDailyCaloricIntake);
router.get('/dailyWaterIntake', userMiddleware, statsController.getDailyWaterIntake);
router.get('/dailyProteinIntake', userMiddleware, statsController.getDailyProteinIntake);
router.get('/dailyCarbIntake', userMiddleware, statsController.getDailyCarbIntake);
router.get('/dailyFatIntake', userMiddleware, statsController.getDailyFatIntake);
router.get('/dailySugarIntake', userMiddleware, statsController.getDailySugarIntake);
router.get('/dailySodiumIntake', userMiddleware, statsController.getDailySodiumIntake);
router.get('/dailyFibreIntake', userMiddleware, statsController.getDailyFibreIntake);

module.exports = router;