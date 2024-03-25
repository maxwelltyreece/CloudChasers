const express = require('express');
const router = express.Router();

const foodController = require('../controllers/foodController');
const recipeController = require('../controllers/recipeController');

const userMiddleware = require('../middleware/userMiddleware');

router.post('/logDatabaseFood', userMiddleware, foodController.logDatabaseFood);
router.post('/createNewRecipeByUser', userMiddleware, recipeController.createNewRecipeByUser);
router.post('/logRecipeFood', userMiddleware, recipeController.logRecipeFood);
router.post('/duplicateRecipe', userMiddleware, recipeController.duplicateRecipeToUser);
router.post("/logManualMacro", userMiddleware, foodController.logManualMacro);
router.post('/addIngredientToDatabase', userMiddleware, foodController.addIngredientToDatabase);

router.get('/getFood', foodController.getFood);
router.get('/searchFoods', foodController.searchFoods);
router.get('/getRecipe', recipeController.getRecipe);
router.get('/getRecipeWeight', recipeController.getRecipeWeight);
router.get("/getRecipeMacro", recipeController.getRecipeMacro)
router.get('/getUserRecipes', userMiddleware, recipeController.getAllUserRecipes);
router.get('/getRecipeIngredients', recipeController.getRecipeIngredients);
router.get('/getCommunityRecipes', recipeController.getCommunityRecipes);
router.get('/getLatestLoggedFood', userMiddleware, foodController.getLastLoggedFoodOrRecipe);

router.put('/addItemToRecipe', userMiddleware, recipeController.addItemToRecipe);
router.put('/addMacroToRecipe', recipeController.addMacroToRecipe);
router.delete('/deleteItemFromRecipe', userMiddleware, recipeController.deleteIngredientFromRecipe);
router.delete('/deleteRecipe', userMiddleware, recipeController.deleteRecipe);
module.exports = router;
