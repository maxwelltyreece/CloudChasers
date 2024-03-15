const mongoose = require('mongoose');

const userDayMealSchema = new mongoose.Schema({
	name: { type: String, required: true },
	userDayID: { type: mongoose.Schema.Types.ObjectId, ref: 'userDay', required: true },
});

module.exports = mongoose.model('userDayMeal', userDayMealSchema);
