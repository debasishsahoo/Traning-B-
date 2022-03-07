const Joi = require("joi");
const authScheme = Joi.object({
  CIF_No: Joi.string().alphanum(),

  accountNumber: Joi.string(),

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
