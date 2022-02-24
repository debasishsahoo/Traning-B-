const CustomAPIError = require("./customApiError");
const UnauthenticatedError = require("./unauthenticated");
const NotFoundError = require("./notFound");
const BadRequestError = require("./bad-request");

module.exports = {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
};
