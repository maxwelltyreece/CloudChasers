const mongoose = require('mongoose');

const mealItemSchema = new mongoose.Schema({
    name : { type: String, required: true },
    foodItemID : { type: mongoose.Schema.Types.ObjectId, ref: 'foodItem', required: true },
    receipeID: { type: mongoose.Schema.Types.ObjectId, ref: 'receipe', required: true },
    userDayMealID : { type: mongoose.Schema.Types.ObjectId, ref: 'userDayMeal', required: true },

});

module.exports = mongoose.model('mealItem', mealItemSchema);