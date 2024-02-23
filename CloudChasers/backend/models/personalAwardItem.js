const mongoose = require('mongoose');

const personalAwardItemSchema = new mongoose.Schema({
	userID: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
	personalAwardID: { type: mongoose.Schema.Types.ObjectId, ref: 'personalAward', required: true },
	date: { type: Date, required: true },
});

module.exports = mongoose.model('personalAwardItem', personalAwardItemSchema);
