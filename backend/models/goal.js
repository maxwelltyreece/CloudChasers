const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
	name: { type: String, required: true },
	measurement: { type: String, required: false, enum: ['calories', 'water', 'protein', 'carbs', 'fat', 'sugar', 'sodium', 'fibre'] },
	minTargetMass: { type: Number, required: false },
	maxTargetMass: { type: Number, required: false },
});

module.exports = mongoose.model('goal', goalSchema);
