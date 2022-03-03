const Customer = require("../models/customer.model");

const checkPhone = async (contactNo) => {
  const validPhone = await Customer.find({ contactNo: contactNo });
  if (validPhone.length > 0) {
    return true
  }
  return false
};

module.exports = checkPhone;
