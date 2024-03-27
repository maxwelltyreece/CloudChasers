const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async function(req, res, next) {
	const token = req.headers.authorization.split(' ')[1];
	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		const user = await User.findById(decoded.userId);

		if (!user) {
			return res.status(404).send({ message: 'User not found' });
		}

		// add user to request
		req.user = user;
		next();
	} catch (error) {
		return res.status(401).send({ message: 'Unauthorized2' });
	}
};