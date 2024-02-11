const mongoose = require('mongoose');

const userDaySchema = new mongoose.Schema({
	date : { type: Date, required: true },
    userID : { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
});

module.exports = mongoose.model('userDay', userDaySchema);