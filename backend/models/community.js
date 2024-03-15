const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	recipePrivacy: { type: String, required: true, enum: ['public', 'private'] },
	joinPrivacy: { type: String, required: true, enum: ['public', 'private'] },
	createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: false },
});

module.exports = mongoose.model('community', communitySchema);
