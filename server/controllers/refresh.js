const User = require("../models/users_model");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  console.log({ "refresh Token": refreshToken });

  const foundUser = await User.findOne({ refreshToken });
  if (!foundUser) return res.sendStatus(403); //Forbidden

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_TOKEN,
    async (err, decoded) => {
      if (err || foundUser.username !== decoded.username)
        return res.sendStatus(403);
      const accessToken = await foundUser.createAccessToken();
      res.json({ accessToken });
    }
  );
};

module.exports = { handleRefreshToken };
