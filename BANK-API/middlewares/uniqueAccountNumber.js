const Account = require("../models/account.model");

const checkAccount = async (contactNo) => {
  const validAccount = await Account.get({ contactNo: contactNo });
  if (!validAccount) {
    throw new Error("Account Number is already exist");
  }
};

module.exports = checkAccount;
