const mongoose = require('mongoose');

const communityPostSchema = new mongoose.Schema({
	communityID : { type: mongoose.Schema.Types.ObjectId, ref: 'community', required: true },
	communityUserID : { type: mongoose.Schema.Types.ObjectId, ref: 'communityUser', required: true },
	recipeID : { type: mongoose.Schema.Types.ObjectId, ref: 'recipe', required: true },
	text : { type: String, required: true },
	date : { type: Date, default: Date.now, required: true },
	title : { type: String, required: true },
});

module.exports = mongoose.model('communityUser', communityPostSchema);
