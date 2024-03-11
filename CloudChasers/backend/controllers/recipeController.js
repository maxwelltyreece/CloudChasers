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
	const { recipeID, foodID, weight } = req.body;
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
			weight
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
	const { recipeID } = req.query;
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

exports.getAllUserRecipes = async (req, res) => {
	const user = req.user;
	try {
		const recipes = await Recipe.find({ createdBy: user._id });
		return res.status(200).json({ message: 'Recipes found', data: recipes });
	}
	catch (error) {
		return res.status(400).json({ error: error.toString() });
	}
}

exports.getRecipeIngredients = async (req, res) => {
	const { recipeID } = req.query;
	try {
		const recipeItems = await RecipeItem.find({ recipeID: recipeID });
		if (recipeItems.length === 0) {
			return res.status(400).send({ message: 'Recipe does not exist' });
		}

		let recipeIngredients = [];
		for (const recipeItem of recipeItems) {
			const foodItem = await FoodItem.findById(recipeItem.foodItemID);
			const food = await Food.findById(foodItem.foodID);
			recipeIngredients.push({ food, weight: foodItem.weight });
		}

		//removes any fields from the food other than name and id and weight
		recipeIngredients = recipeIngredients.map(ingredient => {
			return {
				name: ingredient.food.name,
				id: ingredient.food._id,
				weight: ingredient.weight
			}
		});

		return res.status(200).json({ message: 'Recipe ingredients found', data: recipeIngredients });
	}
	catch (error) {
		return res.status(400).json({ error: error.toString() });
	}
}


//delete ingredient in recipe

async function createUserDay(userID, date){
    try {
        const existingUserDay = await UserDay.findOne({ userID, date });
        if (!existingUserDay) {
            const newUserDay = new UserDay({
                date,
                userID
            });
            await newUserDay.save();
        }else{
            return existingUserDay;
        }
    } catch (error) {
        console.log('Error in createUserDay:', error);
        throw new Error('Failed to create UserDay: ' + error.toString());
    }
    return newUserDay; // Return the newly created UserDay object
};

async function createUserDayMeal(mealType, userDay) {
	try {
		const existingUserDayMeal = await UserDayMeal.findOne({ name: mealType, userDayID: userDay._id });

		if (!existingUserDayMeal) {
			const newUserDayMeal = new UserDayMeal({
				name: mealType,
				userDayID: userDay._id
			});
			await newUserDayMeal.save();
		} else {
			return existingUserDayMeal;
		}

	} catch (error) {
		throw new Error('Failed to create UserDayMeal');
	}
	return newUserDayMeal;
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

		const mealItem = new MealItem({
			name: recipe.name,
			foodItemID: null,
			recipeID: recipe._id,
			userDayMealID: newUserDayMeal._id
		});
		await mealItem.save();
		
		await session.commitTransaction();
		session.endSession();

		return res.status(200).send({ message: 'Recipe logged' });

	} catch (error) {
		session.abortTransaction();
		session.endSession();
		return res.status(500).send({ error: error.toString() });
	}
};

//TODO: get all community recipes
exports.getCommunityRecipes = async (req, res) => {
	const { communityID } = req.query;
	try {
		const recipes = await Recipe.find({ communityThatOwnsRecipe: communityID });
		return res.status(200).json({ message: 'Recipes found', data: recipes });
	}
	catch (error) {
		return res.status(400).json({ error: error.toString() });
	}
}

exports.getRecipeWeight = async (req, res) => {
	const { recipeID } = req.query;
	try {
		const recipeItems = await RecipeItem.findById(recipeID);
		if (recipeItems.length === 0) {
			return res.status(400).send({ message: 'Recipe does not exist' });
		}

		let recipeWeight = 0;
		for (const recipeItem of recipeItems) {
			const foodItem = await FoodItem.findById(recipeItem.foodItemID);
			recipeWeight += foodItem.weight;
		}
		return res.status(200).json({ message: 'Recipe weight found', data: recipeWeight });
	} catch (error) {
		return res.status(400).json({ error: error.toString() });
	}
}

exports.getRecipeMacro = async (req, res) => {
	const { recipeID } = req.query;
	try {
		const recipeItems = await RecipeItem.findById(recipeID);
		if (recipeItems.length === 0) {
			return res.status(400).send({ message: 'Recipe does not exist' });
		}

		let recipeMacros = { protein: 0, carbs: 0, fats: 0, calories: 0 };
		for (const recipeItem of recipeItems) {
			const foodItem = await FoodItem.findById(recipeItem.foodItemID);
			const food = await Food.findById(foodItem.foodID);
			const weightRatio = foodItem.weight / 100;
			recipeMacros.protein += food.protein * weightRatio;
			recipeMacros.carbs += food.carbs * weightRatio;
			recipeMacros.fats += food.fats * weightRatio;
			recipeMacros.calories += food.calories * weightRatio;
		}
		return res.status(200).json({ message: 'Recipe macros found', data: recipeMacros });
	} catch (error) {
		return res.status(400).json({ error: error.toString() });
	}
}

//TODO: duplicate 
exports.duplicateRecipeToUser = async (req, res) => {
	const user = req.user;
	const { recipeID } = req.body;
	try {
		const recipe = await Recipe.findById(recipeID);
		if (!recipe) {
			return res.status(400).send({ message: 'Recipe does not exist' });
		}
		const newRecipe = new Recipe({
			name: recipe.name,
			description: recipe.description,
			createdBy: user._id,
			communityThatOwnsRecipe: null
		});
		await newRecipe.save();
		
		const recipeItems = await RecipeItem.find({ recipeID });
		for (const recipeItem of recipeItems) {
			const foodItem = await FoodItem.findById(recipeItem.foodItemID);
			const newFoodItem = new FoodItem({
				foodID: foodItem.foodID,
				weight: foodItem.weight
			});
			await newFoodItem.save();
			const newRecipeItem = new RecipeItem({
				foodItemID: newFoodItem._id,
				recipeID: newRecipe._id
			});
			await newRecipeItem.save();
		}
		return res.status(200).json({ message: 'Recipe duplicated', data: newRecipe });
	}
	catch (error) {
		return res.status(400).json({ error: error.toString() });
	}
}

//TODO: add macro