const mongoose = require('mongoose');

const userDaySchema = new mongoose.Schema({
	date : { type: Date, required: true },
    userId : { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
});

module.exports = mongoose.model('userDay', userDaySchema);