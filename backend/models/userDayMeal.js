const mongoose = require('mongoose');

const userDayMealSchema = new mongoose.Schema({
	name: { type: String, required: true },
	userDayID: { type: mongoose.Schema.Types.ObjectId, ref: 'userDay', required: true },
	order: { type: Number, required: false, default: 0 },
});

module.exports = mongoose.model('userDayMeal', userDayMealSchema);
