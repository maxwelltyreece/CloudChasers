const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.getStreaks = async (req, res) => {
    const { token } = req.body;

	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const today = new Date();
        const lastLogin = user.lastLogin;
        const oneDay = 24 * 60 * 60 * 1000;
        const diffDays = Math.round(Math.abs((today - lastLogin) / oneDay));
        
        if (diffDays === 1) {
            user.streak += 1;
        } else {
            user.streak = 1;
        }

        user.streak += 1;
        await user.save();

        return res.status(200).send({ streak: user.streak, message: 'Streak updated' });
        
    } catch (error) {
        return res.status(500).send({ error: error.toString() });
    }
}