const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

// // Hash password before saving
// userSchema.pre('save', async function hashPassword(next) {
// 	if (!this.isModified('password')) return next();
// 	this.password = await bcrypt.hash(this.password, 10);
// 	return next();
// });

module.exports = mongoose.model('User', userSchema);
