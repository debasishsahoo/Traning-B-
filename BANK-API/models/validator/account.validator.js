const Joi = require("joi");
const AutoId = require("../middlewares/autoIdGenerator");
const checkAccount = require("../middlewares/uniqueAccountNumber");

const authScheme = Joi.object({
  CIF_No: Joi.string().alphanum(),

  accountNumber: Joi.string().external(checkAccount),

  IFSC: Joi.string().alphanum().default("B0001"),

  accountBalance: Joi.number(),

  accoutType: Joi.string()
    .valid(
      "savings",
      "current",
      "salary",
      "fixed_deposit",
      "recurring_deposit",
      "nri"
    )
    .default("savings"),

  createdAt: Joi.date().default(Date.now()),
});

module.exports = authScheme;
