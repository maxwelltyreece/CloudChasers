const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.getStreaks = async (req, res) => {
    const { token, today } = req.body; // Extracting `today` from the request body

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Parse the client-specified date
        const clientDate = new Date(today);
        clientDate.setHours(0, 0, 0, 0); // Optional: Adjust time part if necessary

        const lastLogin = new Date(user.lastLogin);
        lastLogin.setHours(0, 0, 0, 0);

        const oneDay = 24 * 60 * 60 * 1000;
        const diffDays = Math.round(Math.abs((clientDate - lastLogin) / oneDay));

        if (diffDays <= 1) {
            user.streak += 1;
        } else if (diffDays > 1) {
            user.streak = 1; // Reset streak if the gap is more than one day
        }

        await user.save();

        return res.status(200).send({ streak: user.streak, message: 'Streak updated' });

    } catch (error) {
        return res.status(500).send({ error: error.toString() });
    }
};