const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
	try {
		const newUser = new User(req.body);
		await newUser.save();
		res.status(201).send("User created");
	} catch (error) {
		res.status(400).send(error);
	}
};

exports.login = async (req, res) => {
	try {
		// Find user
		const user = await User.findOne({ username: req.body.username });
		if (!user || !await bcrypt.compare(req.body.password, user.password)) {
			return res.status(401).send("Invalid credentials");
		}

		// Generate and send token
		const token = jwt.sign({ userId: user._id },  process.env.SECRET_KEY);
		res.status(200).json({ token });
	} catch (error) {
		res.status(500).send(error);
	}
};

exports.getUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (error) {
		res.status(500).send(error);
	}
};