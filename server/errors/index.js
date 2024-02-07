const CustomAPIError = require("./custom-error");
const BadRequestError = require("./bad-request");
const UnauthenticatedError = require("./unauthorized");
const NotFoundError = require("./not-found");
const ForbiddenError = require("./forbidden");

module.exports = {
  CustomAPIError,
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
  ForbiddenError,
};
