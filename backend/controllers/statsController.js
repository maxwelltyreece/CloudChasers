/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const UserDay = require("../models/userDay");
const UserDayMeal = require("../models/userDayMeal");
const MealItem = require("../models/mealItem");
const FoodItem = require("../models/foodItem");
const Food = require("../models/food");

const Recipe = require("../models/recipe");
const RecipeItem = require("../models/recipeItem");
const RecipeQuantity = require("../models/recipeQuantity");

const logger = require("../../logger");

/**
 * Handles the GET /streaks route.
 * This function updates the user"s login streak based on the date provided in the request body.
 * If the date is the day after the user"s last login, the streak is incremented.
 * If the date is later than the day after the user"s last login, the streak is reset to 1.
 * The user"s last login date is then updated to the date provided in the request body.
 * The updated streak is returned in the response.
 *
 * @param {Object} req - The Express request object. The request body should contain a "today" property with the current date. The request should also contain a "user" property with the user's data.
 * @param {Object} res - The Express response object.
 * @returns {Object} The Express response object. The response body contains the updated streak and a success message.
 * @throws {Error} If an error occurs while updating the user's streak, the error is logged and a 500 status code is returned in the response.
 */
exports.getStreaks = async (req, res) => {
	try {
		const { today } = req.body;
		const user = req.user;

		if (!Date.parse(today)) {
			logger.error("Invalid date");
			return res.status(400).send({ error: 'Invalid date' });
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

		logger.info(`Streak updated for user ${user._id}`);
		return res.status(200).send({ streak: user.streak, message: "Streak updated" });

	} catch (error) {
		return res.status(500).send({ error: error.toString() });
	}
};

/**
 * Retrieves the total nutrient intake for a given date and user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {string} nutrient - The nutrient to calculate the intake for.
 * @returns {Promise<void>} - A promise that resolves with the total nutrient intake.
 * @throws {Error} - If there is an error retrieving the nutrient intake.
 */
const getNutrientIntake = async (req, res, nutrient) => {
	try {
		const { date } = req.query; 
		const user = req.user;
		const userDay = await UserDay.findOne({ userID: user._id, date: date });
		if (!userDay) {
			//return res.status(400).send({ message: "No data for this day." });
			// // Instead of sending a 400 error, return a response with a total nutrient value of 0
            return res.status(200).send({ [`total${nutrient}`]: 0 });
        }

		const userDayMeals = await UserDayMeal.find({ userDayID: userDay._id });

		let totalNutrient = 0;

		for (const meal of userDayMeals) {
			const mealItems = await MealItem.find({ userDayMealID: meal._id });

			for (const mealItem of mealItems) {
				let foodItem, food;
				if (mealItem.foodItemID) {
					foodItem = await FoodItem.findById(mealItem.foodItemID);
					food = await Food.findById(foodItem.foodID);
					totalNutrient += food[nutrient] * (foodItem.weight / 100);
				} else {
					const recipeQuantity = await RecipeQuantity.findById(mealItem.recipeQuantityID);
					const recipe = await Recipe.findById(recipeQuantity.recipeID);
					const allRecipeItems = await RecipeItem.find({ recipeID: recipe._id });
					let totalRecipeWeight = 0;
					let recipeNutrient = 0;

					for (const recipeItem of allRecipeItems) {
						foodItem = await FoodItem.findById(recipeItem.foodItemID);
						food = await Food.findById(foodItem.foodID);
						recipeNutrient += food[nutrient] * (foodItem.weight / 100);
						totalRecipeWeight += foodItem.weight;
					}
					totalNutrient += recipeNutrient * (recipeQuantity.quantity / totalRecipeWeight);

				}
			}
		}
		console.log(totalNutrient)
		console.log(res.constructor.toString())	
		return res.status(200).send({ [`total${nutrient.charAt(0).toUpperCase() + nutrient.slice(1)}`]: totalNutrient });
	}
	catch (error) {
		return res.status(500).send({ error: error.toString() });
	}
};

/**
 * Retrieves the total daily caloric intake for a given date and user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the total daily caloric intake.
 * @throws {Error} - If there is an error retrieving the caloric intake.
 */
exports.getDailyCaloricIntake = (req, res) => getNutrientIntake(req, res, 'calories');

/**
 * Retrieves the total daily water intake for a given date and user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the total daily water intake.
 * @throws {Error} - If there is an error retrieving the water intake.
 */
exports.getDailyWaterIntake = (req, res) => getNutrientIntake(req, res, 'water');

/**
 * Retrieves the total daily protein intake for a given date and user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the total daily protein intake.
 * @throws {Error} - If there is an error retrieving the protein intake.
 */
exports.getDailyProteinIntake = (req, res) => getNutrientIntake(req, res, 'protein');

/**
 * Retrieves the total daily carb intake for a given date and user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the total daily carb intake.
 * @throws {Error} - If there is an error retrieving the carb intake.
 */
exports.getDailyCarbIntake = (req, res) => getNutrientIntake(req, res, 'carbs');

/**
 * Retrieves the total daily fat intake for a given date and user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the total daily fat intake.
 * @throws {Error} - If there is an error retrieving the fat intake.
 */
exports.getDailyFatIntake = (req, res) => getNutrientIntake(req, res, 'fat');

/**
 * Retrieves the total daily sugar intake for a given date and user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the total daily sugar intake.
 * @throws {Error} - If there is an error retrieving the sugar intake.
 */
exports.getDailySugarIntake = (req, res) => getNutrientIntake(req, res, 'sugar');

/**
 * Retrieves the total daily sodium intake for a given date and user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the total daily sodium intake.
 * @throws {Error} - If there is an error retrieving the sodium intake.
 */
exports.getDailySodiumIntake = (req, res) => getNutrientIntake(req, res, 'sodium');

/**
 * Retrieves the total daily fibre intake for a given date and user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the total daily fibre intake.
 * @throws {Error} - If there is an error retrieving the fibre intake.
 */
exports.getDailyFibreIntake = (req, res) => getNutrientIntake(req, res, 'fibre');