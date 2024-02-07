const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    name : { type: String, required: true },
    description : { type: String, required: true },
    measurement : { type: String, required: false, enum: ['calories', 'water', 'protein', 'carbs', 'fat', 'sugar', 'salt', 'fibre'] },
    minTargetMass : { type: Number, required: true },
    maxTargetMass : { type: Number, required: true },
});

module.exports = mongoose.model('goal', goalSchema);