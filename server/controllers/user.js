const { default: mongoose, now } = require("mongoose");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const User = require("../models/users_model");
const { StatusCodes } = require("http-status-codes");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

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
    throw new UnauthenticatedError("Password Falsch!");
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
      user: "jo1ker36@gmail.com",
      pass: "hgkk hzdp zyrp jmyb ",
    },
  });
  const link = `http://localhost:5173/forgot-password/${user._id}?token=${token}`;
  const mailOptions = {
    from: "jo1ker36@gmail.com",
    to: "delyarahmad237@gmail.com",
    subject: "Reset Password Link",
    text: `
    Hello,

    Somebody just used this email address to sign up at Deals.
    
    If this was you, verify your email by clicking on the link below:
    ${link}
    If this was not you, any other Deals accounts you may own, and your internet properties are not at risk.

    You can remove this account by clicking on the link below.

    http://localhost:5173/unintended-registration


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
  const { id: _id } = req.params;
  const { token } = req.query;

  const user = await User.findById({ _id });
  if (!user) {
    throw new UnauthenticatedError("invalid credentials");
  }
  const check = await jwt.verify(token, process.env.JWT_SECRET);
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
  token === null;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "jo1ker36@gmail.com",
      pass: "hgkk hzdp zyrp jmyb ",
    },
  });

  var mailOptions = {
    from: "jo1ker36@gmail.com",
    to: "delyarahmad237@gmail.com",
    subject: "Reset Password Link",
    text: `Reset Password OK`,
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

const unintendedRegistration = async (req, res) => {
  const { userId: _id, email } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res
      .status(StatusCodes.BAD_GATEWAY)
      .send(`Kein Benutzer with that id ${_id}`);

  await User.findByIdAndDelete({ _id, email }, { new: true });

  res.status(StatusCodes.OK).json("Your account has been queued for deletion.");
};

module.exports = {
  register,
  login,
  updatePassword,
  updateUsername,
  updateProfileBild,
  ResetPassword,
  forgotPassword,
  logout,
  unintendedRegistration,
};
