const mongoose = require('mongoose');

const recipeQuantitySchema = new mongoose.Schema({
    mealItemID : { type: mongoose.Schema.Types.ObjectId, ref: 'mealItem', required: true },
    recipeID : { type: mongoose.Schema.Types.ObjectId, ref: 'recipe', required: true },
    totalRecipeWeight : { type: Number, required: true },
});

module.exports = mongoose.model('recipeQuantity', recipeQuantitySchema);