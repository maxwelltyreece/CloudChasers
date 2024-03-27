const mongoose = require('mongoose');

const recipeItemSchema = new mongoose.Schema({
	foodItemID: { type: mongoose.Schema.Types.ObjectId, ref: 'foodItem', required: true },
	recipeID: { type: mongoose.Schema.Types.ObjectId, ref: 'recipe', required: true },
});

module.exports = mongoose.model('recipeItem', recipeItemSchema);
