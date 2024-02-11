const mongoose = require('mongoose');

const communityAwardItemSchema = new mongoose.Schema({
    communityID : { type: mongoose.Schema.Types.ObjectId, ref: 'community', required: true },
    awardID :  { type: mongoose.Schema.Types.ObjectId, ref: 'communityAward', required: true }
});

module.exports = mongoose.model('communityAwardItem', communityAwardItemSchema);