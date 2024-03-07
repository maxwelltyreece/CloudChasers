const mongoose = require("mongoose");


module.exports = mongoose.model("user", userSchema);

const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
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

module.exports = mongoose.model("request", requestSchema);