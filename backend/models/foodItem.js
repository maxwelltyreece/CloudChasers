const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
	foodID: { type: mongoose.Schema.Types.ObjectId, ref: 'food', required: true },
	weight: { type: Number, required: true, min: [0, 'Weight must be greater than 0'] },
});

module.exports = mongoose.model('foodItem', foodItemSchema);
