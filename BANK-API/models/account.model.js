const mongoose = require("mongoose");
const Joi = require("joi");
const AutoId = require("../middlewares/autoIdGenerator");
const checkAccount = require("../middlewares/uniqueAccountNumber");

let AccountSchema = mongoose.Schema(
  {
    CIF_No: { type: String, ref: 'Customer' },

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
  },
  { timestamp: true }
);

module.exports = mongoose.model("account", AccountSchema);
