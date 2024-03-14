const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: false },
	communityThatOwnsRecipe: { type: mongoose.Schema.Types.ObjectId, ref: 'community', required: false },
});

module.exports = mongoose.model('recipe', recipeSchema);
