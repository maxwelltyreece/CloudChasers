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

/**
 * Handles the GET /streaks route.
 * This function updates the user"s login streak based on the date provided in the request body.
 * If the date is the day after the user"s last login, the streak is incremented.
 * If the date is later than the day after the user"s last login, the streak is reset to 1.
 * The user"s last login date is then updated to the date provided in the request body.
 * The updated streak is returned in the response.
 *
 * @param {Object} req - The Express request object. The request body should contain a "today" property with the current date. The request should also contain a "user" property with the user"s data.
 * @param {Object} res - The Express response object.
 * @returns {Object} The Express response object. The response body contains the updated streak and a success message.
 * @throws {Error} If an error occurs while updating the user"s streak, the error is logged and a 500 status code is returned in the response.
 */
exports.getStreaks = async (req, res) => {
	try {
		const { today } = req.body;
		const user = req.user;

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

		user.lastLogin = today;

		await user.save();

		return res.status(200).send({ streak: user.streak, message: "Streak updated" });

	} catch (error) {
		console.error(error);
		return res.status(500).send({ error: error.toString() });
	}
};

/**
 * Calculates the total calories for a given food item.
 * This function retrieves the food item and its associated food from the database,
 * then calculates the calories based on the food"s kCals and the food item"s weight.
 *
 * @param {string} foodItemId - The ID of the food item.
 * @returns {Promise<number>} A promise that resolves to the total calories for the food item.
 * @throws {Error} If an error occurs while retrieving the food item or food from the database.
 */
async function calculateCalories(foodItemId) {
	const foodItem = await FoodItem.findById(foodItemId);
	const food = await Food.findById(foodItem.foodID);
	return food.kCals * (foodItem.weight / 100);
}

/**
 * Handles the GET /daily-caloric-intake route.
 * This function calculates the user"s total caloric intake for a given day.
 * It retrieves the user"s meals for the day from the database, then calculates the total calories for each meal.
 * The total calories for the day are returned in the response.
 *
 * @param {Object} req - The Express request object. The request body should contain a "date" property with the date for which to calculate the caloric intake. The request should also contain a "user" property with the user"s data.
 * @param {Object} res - The Express response object.
 * @returns {Object} The Express response object. The response body contains the total calories for the day and a success message.
 * @throws {Error} If an error occurs while calculating the caloric intake, the error is logged and a 500 status code is returned in the response.
 */
exports.getDailyCaloricIntake = async (req, res) => {
	try {
		const { date } = req.body;
		const user = req.user;

		const userDay = await UserDay.findOne({ userID: user._id, date: date });
		if (!userDay) {
			return res.status(400).send({ message: "No data for this day." });
		}

		const userDayMeals = await UserDayMeal.find({ userDayID: userDay._id });

		let totalCalories = 0;
		for (const meal of userDayMeals) {
			const mealItems = await MealItem.find({ userDayMealID: meal._id });

			for (const mealItem of mealItems) {

				if (!mealItem.foodItemID) {
					const recipeQuantity = await RecipeQuantity.findById(mealItem.recipeQuantityID);
					const recipe = await Recipe.findById(recipeQuantity.recipeID);
					const allRecipeItems = await RecipeItem.find({ recipeID: recipe._id });
					let totalRecipeWeight = 0;
					for (const recipeItem of allRecipeItems) {
						const foodItem = await FoodItem.findById(recipeItem.foodItemID);
						const food = await Food.findById(foodItem.foodID);
						totalRecipeWeight += foodItem.weight;
						totalCalories += food.calories * (foodItem.weight / 100);
					}
					totalCalories = totalCalories * (recipeQuantity.quantity / totalRecipeWeight);
				} else {
					const foodItem = await FoodItem.findById(mealItem.foodItemID);
					const food = await Food.findById(foodItem.foodID);
					totalCalories += food.calories * (foodItem.weight / 100); 
				}
			}
		}
		return res.status(200).send({ totalCalories });
	}
	catch (error) {
		console.error(error);
		return res.status(500).send({ error: error.toString() });
	}
};
