const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    name : { type: String, required: true },
    description : { type: String, required: true },
    measurement : { type: String, required: false, enum: ['Calories', 'Water', 'Protein', 'Carbs', 'Fat', 'Sugar', 'Salt', 'Fibre'] },
    minTargetMass : { type: Number, required: false },
    maxTargetMass : { type: Number, required: false },
});

module.exports = mongoose.model('goal', goalSchema);