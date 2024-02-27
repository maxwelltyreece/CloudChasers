const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.getStreaks = async (req, res) => {
    const { today } = req.body;

    try {
        const user = req.user;

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