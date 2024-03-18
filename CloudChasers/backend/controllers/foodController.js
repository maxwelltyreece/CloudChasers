const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const UserDay = require('../models/userDay');
const UserDayMeal = require('../models/userDayMeal');
const MealItem = require('../models/mealItem');
const FoodItem = require('../models/foodItem');
const Food = require('../models/food');
const mongoose = require('mongoose');

async function createUserDay(userID, date){
	console.log('createUserDay called with userID:', userID, 'and date:', date);
	let newUserDay;
	try {
		const existingUserDay = await UserDay.findOne({ userID, date });
		console.log('existingUserDay:', existingUserDay);
		if (!existingUserDay) {
			newUserDay = new UserDay({
				date,
				userID
			});	
			await newUserDay.save();
			console.log('newUserDay saved:', newUserDay);
		} else {
			return existingUserDay;
		}
	} catch (error) {
		console.log('Error in createUserDay:', error);
		throw new Error('Failed to create UserDay: ' + error.toString());
	}
	return newUserDay; // Return the newly created UserDay object
};
async function createUserDayMeal(mealType, userDay) {
	let newUserDayMeal;
	try {
		console.log('mealType:', mealType);
		console.log('userDay._id:', userDay._id);

		const existingUserDayMeal = await UserDayMeal.findOne({ name: mealType, userDayID: userDay._id });
		console.log('existingUserDayMeal:', existingUserDayMeal);

		if (!existingUserDayMeal) {
			newUserDayMeal = new UserDayMeal({
				name: mealType,
				userDayID: userDay._id
			});	
			await newUserDayMeal.save();
			console.log('newUserDayMeal:', newUserDayMeal);
		} else {
			return existingUserDayMeal;
		}

	} catch (error) {
		console.log('Error in createUserDayMeal:', error);
		throw new Error('Failed to create UserDayMeal: ' + error.toString());
	}
	return newUserDayMeal;
};
/**
 * Logs a food item to the database for a specific user and meal type.
 * 
 * @param {string} req.headers.authorization - The JWT token of the user.
 * @param {string} req.body.mealType - The type of meal (e.g., "breakfast", "lunch", "dinner").
 * @param {string} req.body.foodID - The ID of the food item.
 * @param {number} req.body.weight - The weight of the food item.
 * @returns {string} res.message - A message indicating the result of the operation.
 */
exports.logDatabaseFood = async (req, res) => {
	const { mealType, foodID, weight } = req.body;
	let session;
	try {
		const user = req.user;
		console.log('User:', user);

		const food = await Food.findById(foodID);
		console.log('Food:', food);
		
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		console.log('Today:', today);

		session = await mongoose.startSession();
		console.log('Session started');

		session.startTransaction();
		console.log('Transaction started');

		// Check if user day exists, if not create it
		const newUserDay = await createUserDay(user._id, today);
		console.log('New User Day:', newUserDay);

		// Check if user day meal exists, if not create it
		const newUserDayMeal = await createUserDayMeal(mealType, newUserDay);
		console.log('New User Day Meal:', newUserDayMeal);

		const newFoodItem = new FoodItem({
			foodID: food._id,
			weight,
		});
		await newFoodItem.save();    
		console.log('New Food Item saved');

		const mealItem = new MealItem({
			name: food.name,
			foodItemID: newFoodItem._id,
			receipeID: null,
			userDayMealID: newUserDayMeal._id,
		});
		await mealItem.save();
		console.log('Meal Item saved');

		await session.commitTransaction();
		console.log('Transaction committed');

		session.endSession();
		console.log('Session ended');

		return res.status(200).send({ message: 'Food logged' });
	} catch (error) {
		console.log('Error:', error);
		if (session) {
			session.abortTransaction();
			console.log('Transaction aborted');

			session.endSession();
			console.log('Session ended');
		}
		return res.status(501).send({ error: "test" + error.toString() });
	}
};

/**
 * Retrieves all food items with pagination.
 *
 * @param {string} req.query.page - The page number for pagination. Defaults to 1.
 * @param {string} req.query.limit - The number of items per page for pagination. Defaults to 50.
 * @returns {Array} res.data.foods - An array of food objects.
 * @returns {number} res.data.totalPages - The total number of pages.
 * @returns {number} res.data.currentPage - The current page number.
 */
exports.getFood = async (req, res) => {
	const { page = 1, limit = 50 } = req.query;

	try {
		const foods = await Food.find()
			.skip((page - 1) * limit)
			.limit(limit);

		const total = await Food.countDocuments();

		res.status(200).send({
			foods,
			totalPages: Math.ceil(total / limit),
			currentPage: page,
		});
	} catch (error) {
		res.status(500).send({ error: error.toString() });
	}
};

//TODO: check credintials to not display food created by others
/**
 * Retrieves food items based on search parameters.
 * @param {number} req.query.page - The page number for pagination. Defaults to 1.
 * @param {number} req.query.limit - The number of items per page for pagination. Defaults to 50.
 * @param {Object} req.query.searchParams - Object containing the fields to search and their values.
 * @returns {Array} res.data.foods - An array of food objects.
 * @returns {number} res.data.totalPages - The total number of pages.
 * @returns {number} res.data.page - The current page number.
 * @returns {number} res.data.limit - The number of items per page.
 */
exports.searchFoods = async (req, res) => {
	const { page = 1, limit = 50, ...searchParams } = req.query;
	const skip = (page - 1) * limit;


	// List of valid fields
	const validFields = ['name', 'group', 'calories', 'water', 'protein', 'carbs', 'fat', 'sugar', 'sodium', 'fibre', 'privacy', 'addedBy'];
	const numericFields = ['calories', 'water', 'protein', 'carbs', 'fat', 'sugar', 'sodium', 'fibre'];

	// Check for invalid fields
	const invalidFields = Object.keys(searchParams).filter((field) => !validFields.includes(field));
	if (invalidFields.length > 0) {
		return res.status(400).send({ error: `Invalid field(s): ${invalidFields.join(', ')}` });
	}

	// Create a query object with regex for each search parameter
	const query = Object.entries(searchParams).reduce((acc, [key, value]) => {
		if (numericFields.includes(key)) {
			if (typeof value === 'object') {
				if (value.min !== undefined && value.max !== undefined) {
					acc[key] = { $gte: value.min, $lte: value.max };

				} else if (value.min !== undefined) {
					acc[key] = { $gte: value.min };
					
				} else if (value.max !== undefined) {
					acc[key] = { $lte: value.max };
				}
			} else {
				acc[key] = value;
			}
		} else {
			acc[key] = { $regex: new RegExp(value, 'i') };
		}
		return acc;
	}, {});

	try {
		const foods = await Food.find(query)
			.skip(skip)
			.limit(limit);

		if (foods.length === 0) {
			return res.status(404).send({ message: 'No foods found' });
		}

		const totalPages = await Food.countDocuments(query) / limit;

		res.status(200).send({
			foods, totalPages, page, limit,
		});
	} catch (error) {
		res.status(500).send({ error: error.toString() });
	}
};


// TODO: saerch recipes

//exporting createUserDayMeal
exports.createUserDayMeal = createUserDayMeal;
//exporting createUserDay
exports.createUserDay = createUserDay;