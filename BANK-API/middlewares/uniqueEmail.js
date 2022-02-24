const Customer = require("../models/customer.model");

const checkEmail = async (email) => {
  const validEmail = await Customer.get({ email: email });
  if (!validEmail) {
    throw new Error("email is already exist");
  }
};

module.exports = checkEmail;
