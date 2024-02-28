const mongoose = require('mongoose');

const communityUserSchema = new mongoose.Schema({
	userID: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
	communityID: { type: mongoose.Schema.Types.ObjectId, ref: 'community', required: true },
	role: { type: String, required: true, enum: ['admin', 'member', 'leader'] },
});

module.exports = mongoose.model('communityUser', communityUserSchema);
