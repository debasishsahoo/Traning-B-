const mongoose = require("mongoose");
const Joi = require("joi");

const TransactionSchema = new mongoose.Schema(
  {
    sender: Joi.ObjectId().ref("Customer").required(),

    receiver: Joi.ObjectId().ref("Customer").required(),

    amount: Joi.number().default(0),

    status: Joi.string()
      .valid("failed", "success", "pending")
      .default("pending"),

    createdAt: Joi.date().default(Date.now()),
  },
  { timestamps: true }
);
module.exports = mongoose.model("Transaction", TransactionSchema);
