const mongoose = require('mongoose');

const goalItemSchema = new mongoose.Schema({
	userID: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: false },
	goalID: { type: mongoose.Schema.Types.ObjectId, ref: 'goal', required: false },
});

module.exports = mongoose.model('goalItem', goalItemSchema);
