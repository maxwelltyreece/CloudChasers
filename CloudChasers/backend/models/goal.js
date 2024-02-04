const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    name : { type: String, required: true },
    description : { type: String, required: true },
    frequency : { type: String, required: true, enum: ['daily', 'weekly', 'monthly'] },
    measurement : { type: String, required: false, enum: ['calories', 'water', 'protein', 'carbs', 'fat', 'sugar', 'salt', 'fruit', 'veg', 'dairy'] },
    minTargetMass : { type: Number, required: true },
    maxTargetMass : { type: Number, required: true },
});

module.exports = mongoose.model('goal', goalSchema);