const mongoose = require('mongoose');

const communityAwardSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
});

module.exports = mongoose.model('communityAward', communityAwardSchema);
