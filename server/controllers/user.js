const { mongoose } = require("mongoose");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const User = require("../models/users_model");
const { StatusCodes } = require("http-status-codes");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const { email } = req.body;
  const token = await user.createSignUpToken();
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });
  const link = `http://localhost:5173/signup/${user._id}?token=${token}`;
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: email,
    subject: "Please verify your email address",
    text: `
    Hello,

    Somebody just used this email address to sign up at Deals.
    
    If this was you, verify your email by clicking on the link below:
    ${link}
    If this was not you, any other Deals accounts you may own, and your internet properties are not at risk.

    You can remove this account by clicking on the link below.

    http://localhost:5173/unintended-registration/${user._id}/${email}


    Thanks, The Deals Team`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      return res.sendStatus(StatusCodes.OK);
    }
  });
};

const checkSignUp = async (req, res) => {
  const { userId: _id } = req.params;
  const { token: signupToken } = req.query;
  const user = await User.findById(_id);
  if (!user) {
    throw new UnauthenticatedError("invalid credentials");
  }
  const check = await jwt.verify(signupToken, process.env.JWT_SIGNUP_TOKEN);
  if (!check) {
    throw new BadRequestError("No verify!!");
  }

  res.status(StatusCodes.OK).send({ success: `New user ${user} created!` });
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
    throw new UnauthenticatedError("Password Falsch!!!");
  }
  const accessToken = await user.createAccessToken();
  const refreshToken = await user.createRefreshToken();

  // Saving refreshToken with current user
  const result = await User.findByIdAndUpdate(
    user._id,
    {
      $set: {
        refreshToken: refreshToken,
      },
    },
    { new: true }
  );
  console.log(result);
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    sameSite: "None",
    secure: true,

    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(StatusCodes.OK).json({
    user: {
      username: user.username,
      email: user.email,
      userId: user._id,
      profileBild: user.profileBild,
    },
    accessToken,
  });
};

const updatePassword = async (req, res) => {
  const { userId: _id } = req.params;
  console.log(_id);
  const { oldPassword, newPassword } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`Kein Benutzer with that id ${_id}`);
  if (!oldPassword || !newPassword) {
    throw new BadRequestError(
      "bitte Email, alte Password, neue Password eingeben"
    );
  }
  const user = await User.findOne({ _id });
  if (!user) {
    throw new UnauthenticatedError("Ungültige Anmeldeinformationen");
  }

  const passwordCheck = await user.comparePassword(oldPassword);
  if (!passwordCheck) {
    throw new UnauthenticatedError("Password Falsch!");
  } else if (oldPassword === newPassword) {
    throw new BadRequestError(" bitte erstelle ein neues passwort");
  }
  const hashPS = await user.hashPS(newPassword);

  await User.findByIdAndUpdate(
    _id,
    {
      $set: {
        password: hashPS,
      },
    },
    { new: true }
  );

  res.status(StatusCodes.ACCEPTED).json({
    user: {
      username: user.username,
      email: user.email,
      userId: user._id,
      profileBild: user.profileBild,
    },
  });
};

const updateUsername = async (req, res) => {
  const { userId: _id } = req.params;
  console.log(_id);
  const { username } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`Kein Benutzer with that id ${_id}`);

  const user = await User.findOne({ _id });
  if (!username || username === user.username) {
    throw new BadRequestError(" Neue username eingeben");
  }

  await User.findByIdAndUpdate(_id, { $set: { username } }, { new: true });
  const updateUser = await User.findOne({ _id });

  res.status(StatusCodes.OK).json({
    user: {
      username: updateUser.username,
      email: updateUser.email,
      userId: updateUser._id,
      profileBild: updateUser.profileBild,
    },
  });
};

const updateProfileBild = async (req, res) => {
  const { userId: _id } = req.params;
  const { profileBild } = req.body;
  console.log(_id);
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`Kein Benutzer with that id ${_id}`);

  if (!profileBild.length) {
    await User.findByIdAndUpdate(
      _id,
      {
        $set: {
          profileBild:
            "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
        },
      },
      { new: true }
    );
    const user = await User.findOne({ _id });

    return res.status(StatusCodes.OK).json({
      user: {
        username: user.username,
        email: user.email,
        userId: user._id,
        profileBild: user.profileBild,
      },
    });
  }
  const user = await User.findOne({ _id });

  if (!profileBild || !user) {
    throw new BadRequestError(" Neue profileBild ");
  }

  await User.findByIdAndUpdate(_id, {
    $set: {
      profileBild: profileBild,
    },
  });
  const userUpdate = await User.findOne({ _id });

  res.status(StatusCodes.OK).json({
    user: {
      userId: userUpdate._id,
      username: userUpdate.username,
      email: userUpdate.email,
      profileBild: userUpdate.profileBild,
    },
  });
};
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequestError("keine Benutzer gefunden!");
  }
  const token = await user.createForgotPasswordToken(email);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });
  const link = `http://localhost:5173/forgot-password/${user._id}?token=${token}`;
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: email,
    subject: "Password reset request",
    text: `
    Hello,

    Someone just requested to change your Deals account's password. If this was you, click on the link below to reset it.
    ${link}

    This link will expire within 1 hours.

    If you don't want to reset your credentials, just ignore this message and nothing will be changed.

    Thanks, The Deals Team`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      return res.status(StatusCodes.OK).send();
    }
  });
};
const ResetPassword = async (req, res) => {
  const { Password } = req.body;
  const { userId: _id } = req.params;
  const { token } = req.query;

  const user = await User.findById({ _id });
  if (!user) {
    throw new UnauthenticatedError("invalid credentials");
  }
  const check = await jwt.verify(token, process.env.JWT_FORGOT_TOKEN);
  if (!check) {
    throw new BadRequestError("No verify!!");
  }
  const hashPS = await user.hashPS(Password);
  await User.findByIdAndUpdate(
    _id,
    {
      $set: {
        password: hashPS,
      },
    },
    { new: true }
  );

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  var mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: process.env.NODEMAILER_TO,
    subject: "Your Deals password has been changed",
    text: `
    This is a confirmation that the password for your Deals account ${user.username} has just been changed.

    If you didn't change your password, you can secure your account here.

    If you're having trouble, please refer to the Instagram Help Center.`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      return res.status(StatusCodes.OK).send();
    }
  });
};
const logout = async (req, res) => {
  // On client, also delete the accessToken

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);

  const refreshToken = cookies.jwt;
  console.log(refreshToken);

  // Is refreshToken in db?
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  // Delete refreshToken in db
  const result = await User.findByIdAndUpdate(
    foundUser._id,
    {
      $set: {
        refreshToken: "",
      },
    },
    { new: true }
  );
  console.log(result);

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.sendStatus(204);
};
const deleteAccount = async (req, res) => {
  const { userId: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.sendStatus(404);
  await User.findByIdAndDelete(_id);
  res.json({ message: "User deleted successfully" });
};
const unintendedRegistration = async (req, res) => {
  const { userId: _id, email } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res
      .status(StatusCodes.BAD_GATEWAY)
      .send(`no user with that id ${_id}`);

  await User.findByIdAndDelete({ _id, email }, { new: true });

  res.status(StatusCodes.OK).json("Your account has been queued for deletion.");
};

module.exports = {
  register,
  checkSignUp,
  login,
  updatePassword,
  updateUsername,
  updateProfileBild,
  ResetPassword,
  forgotPassword,
  logout,
  unintendedRegistration,
  deleteAccount,
};
