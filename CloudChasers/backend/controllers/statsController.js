const jwt = require('jsonwebtoken');
const User = require('../models/user');
const UserDay = require('../models/userDay');
const UserDayMeal = require('../models/userDayMeal');
const MealItem = require('../models/mealItem');
const FoodItem = require('../models/foodItem');
const Food = require('../models/food');

const Recipe = require('../models/recipe');
const RecipeItem = require('../models/recipeItem');
const RecipeQuantity = require('../models/recipeQuantity');

/**
 * Handles the GET /streaks route.
 * This function updates the user's login streak based on the date provided in the request body.
 * If the date is the day after the user's last login, the streak is incremented.
 * If the date is later than the day after the user's last login, the streak is reset to 1.
 * The user's last login date is then updated to the date provided in the request body.
 * The updated streak is returned in the response.
 *
 * @param {Object} req - The Express request object. The request body should contain a 'today' property with the current date. The request should also contain a 'user' property with the user's data.
 * @param {Object} res - The Express response object.
 * @returns {Object} The Express response object. The response body contains the updated streak and a success message.
 * @throws {Error} If an error occurs while updating the user's streak, the error is logged and a 500 status code is returned in the response.
 */
exports.getStreaks = async (req, res) => {
	try {
		const { today } = req.body;
		const user = req.user;

		if (!Date.parse(today)) {
			return res.status(400).send({ message: 'Invalid date' });
		}

		const clientDate = new Date(today);
		clientDate.setHours(0, 0, 0, 0);

		const lastLogin = new Date(user.lastLogin);
		lastLogin.setHours(0, 0, 0, 0);

		const nextDay = new Date(lastLogin);
		nextDay.setDate(nextDay.getDate() + 1);

		if (clientDate.getTime() === nextDay.getTime()) {
			user.streak += 1;
		} else if (clientDate > nextDay) {
			user.streak = 1; 
		}

		// TODO: Update `lastLogin` when the user logs in not when the user sends a request to update the streak.
		user.lastLogin = today;

		await user.save();

		return res.status(200).send({ streak: user.streak, message: 'Streak updated' });

	} catch (error) {
		return res.status(500).send({ error: error.toString() });
	}
};

const getNutrientIntake = async (req, res, nutrient) => {
	try {
		const { date } = req.query;  // Ensure consistency in how you receive the date, query or body.
		const user = req.user;

		const userDay = await UserDay.findOne({ userID: user._id, date: date });
		if (!userDay) {
			return res.status(400).send({ message: 'No data for this day.' });
		}

		const userDayMeals = await UserDayMeal.find({ userDayID: userDay._id });
		if (userDayMeals.length === 0) {
			return res.status(400).send({ message: 'No meals for this day.' });
		}

		let totalNutrient = 0;

		for (const meal of userDayMeals) {
			const mealItems = await MealItem.find({ userDayMealID: meal._id });

			for (const mealItem of mealItems) {
				let foodItem, food;
				if (mealItem.foodItemID) {
					foodItem = await FoodItem.findById(mealItem.foodItemID);
					food = await Food.findById(foodItem.foodID);
				} else {
					const recipeQuantityID = await RecipeQuantity.findById(mealItem.recipeQuantityID);
					const recipe = await Recipe.findById(recipeQuantityID.recipeID);
					const allRecipeItems = await RecipeItem.find({ recipeID: recipe._id });
					
					for (const recipeItem of allRecipeItems) {
						foodItem = await FoodItem.findById(recipeItem.foodItemID);
						food = await Food.findById(foodItem.foodID);
						totalNutrient += food[nutrient] * (foodItem.weight / 100);
					}
					continue;
				}
				totalNutrient += food[nutrient] * (foodItem.weight / 100);
			}
		}
		return res.status(200).send({ [`total${nutrient.charAt(0).toUpperCase() + nutrient.slice(1)}`]: totalNutrient });
	}
	catch (error) {
		console.error(error);
		return res.status(500).send({ error: error.toString() });
	}
};

exports.getDailyCaloricIntake = (req, res) => getNutrientIntake(req, res, 'calories');
exports.getDailyWaterIntake = (req, res) => getNutrientIntake(req, res, 'water');
exports.getDailyProteinIntake = (req, res) => getNutrientIntake(req, res, 'protein');
exports.getDailyCarbIntake = (req, res) => getNutrientIntake(req, res, 'carbs');
exports.getDailyFatIntake = (req, res) => getNutrientIntake(req, res, 'fat');
exports.getDailySugarIntake = (req, res) => getNutrientIntake(req, res, 'sugar');
exports.getDailySodiumIntake = (req, res) => getNutrientIntake(req, res, 'sodium');
exports.getDailyFibreIntake = (req, res) => getNutrientIntake(req, res, 'fibre');