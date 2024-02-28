const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.getStreaks = async (req, res) => {
	const { today } = req.body;

	try {
		const user = req.user;

		// Parse the client-specified date
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
		return res.status(500).send({ error: error.toString() });
	}
};
