/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const UserDay = require('../models/userDay');
const UserDayMeal = require('../models/userDayMeal');
const MealItem = require('../models/mealItem');
const FoodItem = require('../models/foodItem');
const Food = require('../models/food');

/**
 * Registers a new user.
 *
 * @param {string} req.body.forename - The user's forename.
 * @param {string} req.body.surname - The user's surname.
 * @param {string} req.body.username - The user's username. Must be unique.
 * @param {string} req.body.email - The user's email. Must be unique.
 * @param {string} req.body.password - The user's password. Will be hashed before storing.
 * @param {Date} req.body.dateOfBirth - The user's date of birth.
 * @param {Date} req.body.lastLogin - The user's last login date.
 * @param {string} req.body.profilePictureLink - The link to the user's profile picture.
 */
exports.register = async (req, res) => {
	const {forename, surname, username, email, password, dateOfBirth, lastLogin, profilePictureLink} = req.body;
	try {
		const user = await User.findOne({ username });
		if (user) {
			return res.status(400).send({ message: 'Username already used' });
		}
		const emailUser = await User.findOne({ email });
		if (emailUser) {
			return res.status(400).send({ message: 'Email already used' });
		}
		const hashedPassword = await bcrypt.hash(password, 10);

		// console.log('Creating user');
		const newUser = new User({
			forename: forename,
			surname: surname,
			username: username,
			email: email,
			dateOfBirth: dateOfBirth,
			lastLogin: lastLogin,
			profilePictureLink: profilePictureLink,
			password: hashedPassword,
			dateOfBirth,
			lastLogin,
			profilePictureLink,
		});
		await newUser.save();
		// console.log('User created', newUser);
		return res.status(200).json({ success: true, message: 'User created', data: newUser });
	} catch (error) {
		return res.status(400).json({ error: error.toString() });
	}
};

/**
 * Logs in a user. returns a JWT token.
 *
 * @param {string} req.body.username - The username of the user.
 * @param {string} req.body.password - The password of the user.
 * @returns {Object} res - The response object.
 * @returns {string} res.data - The JWT token for the authenticated user.
 */
exports.login = async (req, res) => {
	try {
		const user = await User.findOne({ username: req.body.username });

		if (!user || !await bcrypt.compare(req.body.password, user.password)) {
			// console.log('Invalid credentials');
			return res.status(401).json({ message: 'Invalid credentials' });
		}
		// Generate and send token
		const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
		return res.status(200).json({ data: token });
	} catch (error) {
		return res.status(500).json({ error: error.toString() });
	}
};

/**
 * Retrieves all users.
 *
 * @returns {Object} res - The response object.
 * @returns {Array} res.data - An array of user objects.
 */
exports.getUsers = async (req, res) => {
	try {
		const users = await User.find();
		return res.status(200).json(users);
	} catch (error) {
		return res.status(500).json({ error: error.toString() });
	}
};

/**
 * Retrieves details of a user given his token.
 *
 * @param {string} req.body.token - The JWT token of the user.
 * @returns {Object} res - The response object.
 * @returns {Object} res.data - The user object.
 */
exports.getUserDetail =  async (req, res) => {
	// console.log('Getting user details'); 
	try {
		// console.log('Getting user details2'); 
		return res.status(200).json({data: req.user});

	} catch (error) {
		return res.status(500).json({ error: error.toString() });
	}
};

/**
 * Updates the profile of a user given his token and the fields to be updated.
 *
 * @param {string} req.body.token - The JWT token of the user.
 * @param {Object} req.body.updates - An object containing the fields to update and their new values.
 * @returns {Object} res - The response object.
 * @returns {string} res.message - A message indicating the result of the operation.
 */
exports.updateProfile = async (req, res) => {
	//TODO: Add guard for updating fields that are not allowed to be updated
	const { ...updates } = req.body;
	const user = req.user;
	// console.log('User', user);
	// console.log('Updates', updates);
	try {
		// console.log('Updating user');
		// Loop over the updates object and update the user
		Object.keys(updates).forEach((update) => {
			user[update] = updates[update];
		});
		await user.save();

		return res.status(200).send({ message: 'Profile updated' });
	} catch (error) {
		return res.status(500).send({ error: error.toString() });
	}
};

/**
 * Retrieves all days of a user.
 *
 * @param {string} req.body.token - The JWT token of the user.
 * @returns {Object} res - The response object.
 * @returns {Array} res.data - An array of user day objects.
 */
exports.getUserDays = async (req, res) => {
	try {
		const user = req.user;
		const userDays = await UserDay.find({ userID: user._id });

		return res.status(200).json(userDays);
	} catch (error) {
		return res.status(500).send({ error: error.toString() });
	}
};
