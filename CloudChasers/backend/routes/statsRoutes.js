const express = require('express');

const router = express.Router();
const userMiddleware = require('../middleware/userMiddleware');
const statsController = require('../controllers/statsController');

router.post('/streak', userMiddleware, statsController.getStreaks);
router.get('/daily-caloric-intake', userMiddleware, statsController.getDailyCaloricIntake);
router.get('/daily-water-intake', userMiddleware, statsController.getDailyWaterIntake);
router.get('/daily-protein-intake', userMiddleware, statsController.getDailyProteinIntake);
router.get('/daily-carb-intake', userMiddleware, statsController.getDailyCarbIntake);
router.get('/daily-fat-intake', userMiddleware, statsController.getDailyFatIntake);
router.get('/daily-sugar-intake', userMiddleware, statsController.getDailySugarIntake);
router.get('/daily-sodium-intake', userMiddleware, statsController.getDailySodiumIntake);
router.get('/daily-fibre-intake', userMiddleware, statsController.getDailyFibreIntake);

module.exports = router;