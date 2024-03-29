const mongoose = require('mongoose');

const communityPostSchema = new mongoose.Schema({
	communityID : { type: mongoose.Schema.Types.ObjectId, ref: 'community', required: true },
	userID : { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
	recipeID : { type: mongoose.Schema.Types.ObjectId, ref: 'recipe', required: false },
	text : { type: String, required: true },
	date : { type: Date, default: Date.now, required: true },
	title : { type: String, required: true },
});

module.exports = mongoose.model('communityPost', communityPostSchema);
