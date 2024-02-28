const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const UserDay = require('../models/userDay');
const UserDayMeal = require('../models/userDayMeal');
const MealItem = require('../models/mealItem');
const FoodItem = require('../models/foodItem');
const Food = require('../models/food');

/**
 * Logs a food item to the database for a specific user and meal type.
 *
 * @param {string} req.body.token - The JWT token of the user.
 * @param {string} req.body.mealType - The type of meal (e.g., "breakfast", "lunch", "dinner").
 * @param {string} req.body.food_id - The ID of the food item.
 * @param {number} req.body.weight - The weight of the food item.
 * @returns {string} res.message - A message indicating the result of the operation.
 * @throws {Error} If an error occurs during the operation.
 */
exports.logDatabaseFood = async (req, res) => {
	const {
		token, mealType, food_id, weight,
	} = req.body;
	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		const user = await User.findById(decoded.userId);
		const food = await Food.findById(food_id);

		const today = new Date();
		today.setHours(0, 0, 0, 0);

		if (!user) {
			return res.status(404).send({ message: 'User not found' });
		}

		const session = await mongoose.startSession();
		session.startTransaction();

		// Check if user day exists, if not create it
		const newUserDay = await UserDay.findOne({ userID: user._id, date: today });
		if (!newUserDay) {
			const newUserDay = new UserDay({
				date: today,
				userID: user._id,
			});
			await newUserDay.save();
		}

		// Check if user day meal exists, if not create it
		// TODO: Can change behaviour to allow multiple meals of the same type
		const newUserDayMeal = await userDayMeal.findOne({ name: mealType, userDayID: newUserDay._id });
		if (!newUserDayMeal) {
			const newUserDayMeal = new userDayMeal({
				name: mealType,
				userDayID: newUserDay._id,
			});
			await newUserDayMeal.save();
		}

		const newFoodItem = new FoodItem({
			foodID: food._id,
			weight,
		});
		await newFoodItem.save();

		const mealItem = new MealItem({
			name: food.name,
			foodItemID: newFoodItem._id,
			receipeID: null,
			userDayMealID: newUserDayMeal._id,
		});
		await mealItem.save();

		await session.commitTransaction();
		session.endSession();

		return res.status(200).send({ message: 'Food logged' });
	} catch (error) {
		session.abortTransaction();
		session.endSession();
		return res.status(500).send({ error: error.toString() });
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
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 50;

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

// exports.searchFoods = async (req, res) => {
// 	const { name } = req.query;

// 	try {
// 		const foods = await Food.find({
// 			name: { $regex: new RegExp(name, "i") }
// 		});

// 		res.status(200).send({ foods });
// 	} catch (error) {
// 		res.status(500).send({ error: error.toString() });
// 	}
// };
//

// TODO: check credintials to not display food created by others
/**
 * Retrieves food items based on search parameters.
 *
 * @param {number} req.body.page - The page number for pagination. Defaults to 1.
 * @param {number} req.body.limit - The number of items per page for pagination. Defaults to 50.
 * @param {Object} req.body.searchParams - An object containing the fields to search and their values.
 * @returns {Array} res.data.foods - An array of food objects.
 * @returns {number} res.data.totalPages - The total number of pages.
 * @returns {number} res.data.page - The current page number.
 * @returns {number} res.data.limit - The number of items per page.
 */
exports.searchFoods = async (req, res) => {
	const { page = 1, limit = 50, ...searchParams } = req.body;
	const skip = (page - 1) * limit;

	// List of valid fields
	const validFields = ['name', 'group', 'calories', 'water', 'protein', 'carbs', 'fat', 'sugar', 'sodium', 'fibre', 'privacy', 'addedBy'];

	// Check for invalid fields
	const invalidFields = Object.keys(searchParams).filter((field) => !validFields.includes(field));
	if (invalidFields.length > 0) {
		return res.status(400).send({ error: `Invalid field(s): ${invalidFields.join(', ')}` });
	}

	// Create a query object with regex for each search parameter
	const query = Object.entries(searchParams).reduce((acc, [key, value]) => {
		acc[key] = { $regex: new RegExp(value, 'i') };
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


//TODO ask matt about the fixed amount of recipes