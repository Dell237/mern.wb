const { UnauthenticatedError, ForbiddenError } = require("../errors");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  // const token = req.cookies.jwt;
  // console.log(token);
  // if (!token) {
  //   throw new UnauthenticatedError("Authentication invalid!");
  // }
  // try {
  //   const check = jwt.verify(token, process.env.JWT_SECRET);
  //   req.user = { userId: check.userId, name: check.userId };
  //   return next();
  // } catch (error) {
  //   throw new UnauthenticatedError("Authentication invalid");
  // }
  const authHeaders = req.headers.authorization;
  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication invalid!!!");
  }
  console.log({ "accessToken:": authHeaders });
  const token = authHeaders.split(" ")[1];
  try {
    const check = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = { userId: check.userId, username: check.username };
    return next();
  } catch (error) {
    throw new ForbiddenError("Authentication invalid");
  }
};

module.exports = auth;
