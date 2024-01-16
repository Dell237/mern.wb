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
    link: {
      type: String,
      required: [true, "Please provide url"],
    },
    status: {
      type: String,
      enum: ["sold out", "available"],
      default: "available",
    },
    likeCount: {
      //make objekt, beacuse we have to add additional information
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },

    selectedFile: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Deal", DealsSchema);
