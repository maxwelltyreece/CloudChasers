const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const UserDay = require('../models/userDay');
const UserDayMeal = require('../models/userDayMeal');
const MealItem = require('../models/mealItem');
const FoodItem = require('../models/foodItem');
const Food = require('../models/food');

exports.register = async (req, res) => {
	const {forename, surname, height, username, email, password, dateOfBirth, lastLogin, profilePictureLink} = req.body;
	try {
		// Check if user exists
		const user = await User.findOne({ username: username });
		if (user) {
			return res.status(400).send({ message: 'Username already used' });
		}
        const emailUser = await User.findOne({ email: email });
		if (emailUser) {
            return res.status(400).send({ message: 'Email already used' });
        }
		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		console.log('Creating user');
		const newUser = new User({
			forename,
			surname,
			height,
			username,
			email,
			password: hashedPassword,
			dateOfBirth,
			lastLogin,
			profilePictureLink
		});
		console.log('User created', newUser);
		await newUser.save();
		console.log('User created');
		return res.status(200).json({ success: true, message: 'User created', data: newUser});	
	} catch (error) {
		return res.status(400).json({ error: error.toString() });
	}
};

exports.login = async (req, res) => {
	try {
		// Find user
		const user = await User.findOne({ username: req.body.username });

		if (!user || !await bcrypt.compare(req.body.password, user.password)) {
			console.log('Invalid credentials');
			return res.status(401).json({ message:'Invalid credentials' });
		}

		// Generate and send token
		const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
		return res.status(200).json({ data: token });
	} catch (error) {
		return res.status(500).json({ error: error.toString() });
	}
};

exports.getUsers = async (req, res) => {
	try {
		const users = await User.find();
		return res.status(200).json(users);
	} catch (error) {
		return res.status(500).json({error: error.toString()});
	}
};

exports.getUserDetail =  async (req, res) => {
	const {token} = req.body;
	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		const user = await User.findById(decoded.userId);

		if(!user) {
			return res.status(404).send({ message: 'User not found' });
		}else{
			return res.status(200).json({data: user});
		}

	} catch (error) {
		return res.status(500).json({error: error.toString()});
	}
};

exports.updateProfile = async (req, res) => {
	const { token, ...updates } = req.body;
	console.log('Updates', updates);
	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		const user = await User.findById(decoded.userId);

		console.log('User', user);
		if (!user) {
			return res.status(404).send({ message: 'User not found' });
		}
		console.log('Updating user');
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

exports.deleteUser = async (req, res) => {
	const { token } = req.body;
	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		const user = await User.findById(decoded.userId);

		if (!user) {
			return res.status(404).send({ message: 'User not found' });
		}
		await user.deleteOne();
		return res.status(200).send({ message: 'User deleted' });
	} catch (error) {
		return res.status(500).send({ error: error.toString() });
	}
};



