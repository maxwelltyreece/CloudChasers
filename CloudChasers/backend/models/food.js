const mongoose = require('mongoose');

function zeroToHunderedRangeValidator(macroContent) {
    // checks that the macroContent is a number between 0 and 100 as food is detailed for 100g of said food
    return macroContent >= 0 && macroContent <= 100;
}

const foodSchema = new mongoose.Schema({
    name : { type: String, required: true },
    group : { type: String, required: true },
    calories : { type: Number, required: true },
    water : { type: Number, required: false, validate : [zeroToHunderedRangeValidator, "There must be within 0-100g of water in this food"] },
    protein : { type: Number, required: false, validate : [zeroToHunderedRangeValidator, "There must be within 0-100g of protein in this food"] },
    carbs : { type: Number, required: false, validate : [zeroToHunderedRangeValidator, "There must be within 0-100g of carbs in this food"] },
    fat : { type: Number, required: false, validate : [zeroToHunderedRangeValidator, "There must be within 0-100g of fat in this food"] },
    sugar : { type: Number, required: false, validate : [zeroToHunderedRangeValidator, "There must be within 0-100g of sugar in this food"] },
    sodium : { type: Number, required: false, validate : [zeroToHunderedRangeValidator, "There must be within 0-100g of salt in this food"] },
    fibre : { type: Number, required: false, validate : [zeroToHunderedRangeValidator, "There must be within 0-100g of fibre in this food"] },
    privacy : { type: String, required: true, enum: ['public', 'private'] },
    addedBy : { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: false },	
});

module.exports = mongoose.model('food', foodSchema);