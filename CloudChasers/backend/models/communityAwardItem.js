const mongoose = require('mongoose');

const communityAwardItemSchema = new mongoose.Schema({
    communityID : { type: mongoose.Schema.Types.ObjectId, ref: 'community', required: true },
    communityAwardID :  { type: mongoose.Schema.Types.ObjectId, ref: 'communityAward', required: true },
    date : { type: Date, required: true }
});

module.exports = mongoose.model('communityAwardItem', communityAwardItemSchema);