const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const UserDay = require('../models/userDay');
const UserDayMeal = require('../models/userDayMeal');
const MealItem = require('../models/mealItem');
const FoodItem = require('../models/foodItem');
const Food = require('../models/food');

exports.logDatabaseFood = async (req, res) => {
	const { token, mealType, food_id, weight} = req.body;
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
				userID: user._id
			});
			await newUserDay.save();
		}

		// Check if user day meal exists, if not create it
		// TODO: Can change behaviour to allow multiple meals of the same type
		const newUserDayMeal = await userDayMeal.findOne({ name: mealType, userDayID: newUserDay._id });
		if (!newUserDayMeal) {
			const newUserDayMeal = new userDayMeal({
				name: mealType,
				userDayID: newUserDay._id
			});
			await newUserDayMeal.save();
		}

		const newFoodItem = new FoodItem({
			foodID: food._id,
			weight: weight
		});
		await newFoodItem.save();
	
		const mealItem = new MealItem({
			name: food.name,
			foodItemID: newFoodItem._id,
			receipeID: null,
			userDayMealID: newUserDayMeal._id
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
