const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.register = async (req, res) => {
	const { username, password } = req.body;
	try {
		// Check if user exists
		const user = await User.findOne({ username: username });
		if (user) {
			return res.status(400).send({ message: 'Username already used' });
		}
		console.log('User does not exist');
		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = new User({
			username,
			password: hashedPassword,
		});
		console.log(newUser);
		await newUser.save();
		console.log('User created');
		return res.status(201).json({ success: true, message: 'User created' });	
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
		return res.status(200).json({data: token });
	} catch (error) {
		return res.status(500).json({error: error.toString()});
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