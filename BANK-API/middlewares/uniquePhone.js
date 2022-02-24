const Customer = require("../models/customer.model");

const checkPhone = async (contactNo) => {
  const validPhone = await Customer.get({ contactNo: contactNo });
  if (!validPhone) {
    throw new Error("phone is already exist");
  }
};

module.exports = checkPhone;
