const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please provide username"],
    },
    email: {
      type: String,
      required: [true, "please provide email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "please provide password"],
    },
    profileBild: {
      type: String,
      default:
        "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const hashPassword = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, hashPassword);
  next();
});
userSchema.methods.hashPS = async function (newPassword) {
  const hashPassword = await bcrypt.genSalt(10);
  return (newPassword = await bcrypt.hash(newPassword, hashPassword));
};

userSchema.methods.createJWT = async function () {
  const token = await jwt.sign(
    { userId: this._id, username: this.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
  return token;
};
userSchema.methods.createSignUpToken = async function () {
  const token = await jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

userSchema.methods.comparePassword = async function (ps) {
  const check = await bcrypt.compare(ps, this.password);
  return check;
};

userSchema.methods.createForgotPasswordToken = async function (email) {
  const token = await jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

module.exports = mongoose.model("User", userSchema);
