const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const UserDay = require('../models/userDay');
const UserDayMeal = require('../models/userDayMeal');
const MealItem = require('../models/mealItem');
const FoodItem = require('../models/foodItem');
const Food = require('../models/food');
const mongoose = require('mongoose');
const Recipe = require('../models/recipe');
const RecipeItem = require('../models/recipeItem');
const RecipeQuantity = require('../models/recipeQuantity');


/**
 *     name : { type: String, required: true },
	description : { type: String, required: true },
	createdBy : { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: false },	
	communityThatOwnsRecipe
 */
exports.createNewRecipeByUser = async (req, res) => {
	const user = req.user;
	const { name, description, communityThatOwnsRecipe } = req.body;
	try {
		const newRecipe = new Recipe({
			name,
			description,
			createdBy: user._id,
			communityThatOwnsRecipe
		});
		await newRecipe.save();
		return res.status(200).json({ message: 'Recipe created', data: newRecipe });
	}
	catch (error) {
		return res.status(400).json({ error: error.toString() });
	}
}

exports.addItemToRecipe = async (req, res) => {
	const { recipeID, foodID, quantity } = req.body;
	try {
		const recipe = await Recipe.findById(recipeID);
		if (!recipe) {
			return res.status(400).send({ message: 'Recipe does not exist' });
		}
		const food = await Food.findById(foodID);
		if (!food) {
			return res.status(400).send({ message: 'Food does not exist' });
		}

		const newFoodItem = new FoodItem({
			foodID,
			quantity
		});
		await newFoodItem.save();

		const newRecipeItem = new RecipeItem({
			foodItemID: newFoodItem._id,
			recipeID
		});
		await newRecipeItem.save();

		return res.status(200).json({ message: 'Item added to recipe', data: newRecipeItem });
	}
	catch (error) {
		return res.status(400).json({ error: error.toString() });
	}
}

exports.getRecipe = async (req, res) => {
	const { recipeID } = req.body;
	try {
		const recipe = await Recipe.findById(recipeID);
		if (!recipe) {
			return res.status(400).send({ message: 'Recipe does not exist' });
		}
		const recipeItems = await RecipeItem.find({ recipeID });
		return res.status(200).json({ message: 'Recipe found', data: { recipe, recipeItems, recipeQuantities } });
	}
	catch (error) {
		return res.status(400).json({ error: error.toString() });
	}
}

//TODO FIX
exports.logRecipeFood = async (req, res) => {
	const { mealType, recipeID } = req.body;
	try {
		const user = req.user;
		const recipe = await Recipe.findById(recipeID);

		const today = new Date();
		today.setHours(0, 0, 0, 0);
		
		const session = await mongoose.startSession();
		session.startTransaction();
		
		// Check if user day exists, if not create it
		const newUserDay = await createUserDay(user._id, today);

		// Check if user day meal exists, if not create it
		// TODO: Can change behaviour to allow multiple meals of the same type
		const newUserDayMeal = await createUserDayMeal(mealType, newUserDay);

		const recipeItems = await RecipeItem.find({ recipeID: recipe._id });

		for (let i = 0; i < recipeItems.length; i++) {
			const mealItem = new MealItem({
				name: recipeItems[i].name,
				foodItemID: recipeItems[i].foodItemID,
				recipeID: recipe._id,
				userDayMealID: newUserDayMeal._id
			});
			await mealItem.save();
		}
		
		await session.commitTransaction();
		session.endSession();

		return res.status(200).send({ message: 'Recipe logged' });

	} catch (error) {
		session.abortTransaction();
		session.endSession();
		return res.status(500).send({ error: error.toString() });
	}
};