const mongoose = require('mongoose');

const mealItemSchema = new mongoose.Schema({
    name : { type: String, required: true },
    foodItemID : { type: mongoose.Schema.Types.ObjectId, ref: 'foodItem', required: true },
    recipeQuantityID : { type: mongoose.Schema.Types.ObjectId, ref: 'recipeQuantity', required: true },
    userDayMealID : { type: mongoose.Schema.Types.ObjectId, ref: 'userDayMeal', required: true },

});

module.exports = mongoose.model('mealItem', mealItemSchema);