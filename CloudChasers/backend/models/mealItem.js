const mongoose = require('mongoose');

const mealItemSchema = new mongoose.Schema({
    name : { type: String, required: true },
    foodItemID : { type: mongoose.Schema.Types.ObjectId, ref: 'foodItem', required: false },
    recipeQuantityID : { type: mongoose.Schema.Types.ObjectId, ref: 'recipeQuantity', required: false },
    userDayMealID : { type: mongoose.Schema.Types.ObjectId, ref: 'userDayMeal', required: true },

});

module.exports = mongoose.model('mealItem', mealItemSchema);
