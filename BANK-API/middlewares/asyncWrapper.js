const errorHandler = require("./errorHandler");
const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(errorHandler);
    }
  };
};
module.exports = asyncWrapper;
