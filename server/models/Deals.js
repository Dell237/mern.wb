const mongoose = require("mongoose");

const DealsSchema = mongoose.Schema(
  {
    headline: {
      type: String,
      required: [true, "Please provide headline name"],
      maxlength: 50,
    },
    preis: {
      type: Number,
      required: [true, "Please provide preis"],
      maxlength: 20,
    },
    status: {
      type: String,
      enum: ["sold out", "available"],
      default: "available",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "UserSchema",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Deal", DealsSchema);
