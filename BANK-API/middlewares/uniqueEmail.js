const Customer = require('../models/customer.model')

const checkEmail = async (email) => {
  const validEmail = await Customer.find({ email: email });

  if (validEmail.length > 0) {
    return true
  }
  else return false
};

module.exports = checkEmail;
