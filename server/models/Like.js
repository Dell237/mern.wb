const mongoose = require("mongoose");

const Like = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  dealId: { type: mongoose.Schema.Types.ObjectId, ref: "Deal", required: true },
});

module.exports = mongoose.model("Like", Like);
