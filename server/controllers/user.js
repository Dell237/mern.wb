const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors");
const User = require("../models/users_model");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = await user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { username: user.username }, token });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("invalid credentials");
  }
  const passwordCheck = await user.comparePassword(password);
  if (!passwordCheck) {
    throw new UnauthenticatedError("No user found!");
  }
  // const access_token = await user.createAccessToken();
  const token = await user.createJWT();
  // res.status(StatusCodes.OK).json({ user: { username: user.username }, token });
  res.cookie("jwt", token, {
    httpOnly: true,
    // secure: true,

    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(StatusCodes.OK).json({
    user: {
      username: user.username,
      email: user.email,
      userId: user._id,
      profileBild: user.profileBild,
    },
    token,
  });
};

const logout = async (req, res) => {
  res
    .cookie("access_token", "", {
      httpOnly: true,
      // secure: true,
      sameSite: "None",
      maxAge: 0,
    })
    .status(StatusCodes.OK)
    .json({ message: "You've been logged out!" });
};

module.exports = { register, login, logout };
