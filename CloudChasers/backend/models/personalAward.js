const mongoose = require('mongoose');

const personalAwardSchema = new mongoose.Schema({
    name : { type : String, required : true},
    desciption : {type : String, required : true}
});

module.exports = mongoose.model('personalAward', personalAwardSchema);