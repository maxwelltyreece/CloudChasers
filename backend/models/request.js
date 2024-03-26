const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
	status: {
		type: String,
		enum: ["Pending", "Approved", "Rejected"],
		default: "Pending"
	},
	userID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
		required: true
	},
	communityID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "community",
		required: true
	}
});

// eslint-disable-next-line no-undef
module.exports = mongoose.model("request", requestSchema);