const express = require('express');
const router = express.Router();

const foodController = require('../controllers/foodController');
const recipeController = require('../controllers/recipeController');

const userMiddleware = require('../middleware/userMiddleware');

router.post('/logDatabaseFood', userMiddleware, foodController.logDatabaseFood);
router.post('createNewRecipeByUser', userMiddleware, recipeController.createNewRecipeByUser);
router.post('/logRecipeFood', userMiddleware, recipeController.logRecipeFood);

router.get('/getFood', foodController.getFood);
router.get('/searchFoods', foodController.searchFoods);
router.get('/getRecipe', recipeController.getRecipe);
router.get('/getUserRecipes', userMiddleware, recipeController.getAllUserRecipes);
router.get('/getRecipeIngredients', recipeController.getRecipeIngredients);
router.put('/addItemToRecipe', userMiddleware, recipeController.addItemToRecipe);
module.exports = router;
