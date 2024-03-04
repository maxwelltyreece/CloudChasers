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

		return res.status(200).send({ streak: user.streak, message: 'Streak updated' });

	} catch (error) {
		console.error(error);
		return res.status(500).send({ error: error.toString() });
	}
};

exports.getDailyCaloricIntake = async (req, res) => {
	try {
		const { date } = req.body;
		const user = req.user;

		const userDay = await UserDay.findOne({ User_ID: user._id, Date: date });
		if (!userDay) {
			return res.status(400).send({ message: 'No data for this day.' });
		}

		const userDayMeals = await UserDayMeal.find({ User_Day_ID: userDay._id });
		if (userDayMeals.length === 0) {
			return res.status(400).send({ message: 'No meals for this day.' });
		}

		let totalCalories = 0;

		for (const meal of userDayMeals) {
			const mealItems = await MealItem.find({ User_Day_Meals_ID: meal._id });

			for (const mealItem of mealItems) {
				if (!mealItem.foodItemID) {
					const recipeQuantityID = await RecipeQuantity.findById(mealItem.recipeQuantityID);
					const recipe = await Recipe.findById(recipeQuantityID.recipeID);
					const allRecipeItems = await RecipeItem.find({ Recipe_ID: recipe._id });
					for (const recipeItem of allRecipeItems) {
						const foodItem = await FoodItem.findById(recipeItem.foodItemID);
						const food = await Food.findById(foodItem.foodID);
						totalCalories += food.kCals * (foodItem.weight / 100);
					}
				} else {
					const foodItem = await FoodItem.findById(mealItem.foodItemID);
					const food = await Food.findById(foodItem.foodID);
					totalCalories += food.kCals * (foodItem.weight / 100); 
				}
			}
		}

		return res.status(200).send({ totalCalories, message: 'Calories retrieved successfully.' });

	} catch (error) {
		console.error(error); 
		return res.status(500).send({ error: 'An error occurred while calculating calories.' });
	}
};
