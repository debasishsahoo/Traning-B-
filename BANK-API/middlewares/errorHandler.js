const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
  //default
  let customErrors = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong,please try again later",
  };


  if (err.name === "ValidationError") {
    customErrors.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customErrors.statusCode = 400;
  }

  if (err.code && err.code === 11000) {
    customErrors.msg = `Duplicate Value Entered For ${Object.keys(
      err.keyValue
    )} field, Please choose another Value`;
    customErrors.statusCode = 400;
  }

  if (err.name === "CastError") {
    customErrors.msg = `No item found with id: ${err.value} `;
    customErrors.statusCode = 404;
  }

  return res.status(customErrors.statusCode).json({ msg: customErrors.msg });
};
module.exports = errorHandler;
