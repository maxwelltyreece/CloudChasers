const mongoose = require('mongoose');

const userDayItemSchema = new mongoose.Schema({
    date : { type: Date, required: true },
    foodItemID : { type: mongoose.Schema.Types.ObjectId, ref: 'foodItem', required: true },
    receipeID: { type: mongoose.Schema.Types.ObjectId, ref: 'receipe', required: true },
    userDayID : { type: mongoose.Schema.Types.ObjectId, ref: 'userDay', required: true },
});

module.exports = mongoose.model('userDayItem', userDayItemSchema);