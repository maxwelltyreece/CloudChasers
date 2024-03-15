const mongoose = require('mongoose');

function validateEmail(email) {
	// checks that an email has some text, then an @, then some text, then a dot, then some text [regex from https://stackoverflow.com/questions/35788383/regex-validation-in-javascript-email]
	const emailRegex = /\S+@\S+\.\S+/;
	return emailRegex.test(email);
}

const userSchema = new mongoose.Schema({
	forename: { type: String, required: true },
	surname: { type: String, required: true },
	username : { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true, validate :  [validateEmail, "{VALUE} is not a valid email"]},
	password: { type: String, required: true },
	dateOfBirth: { type: Date, required: true },
	lastLogin: { type: Date, required: false },
	profilePictureLink : { type: String, required: false, default: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"},
	streak : { type: Number, required: false, default: 0},
});

module.exports = mongoose.model('user', userSchema);
