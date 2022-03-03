const mongoose = require("mongoose");
const Joi = require("joi");

const TransactionSchema = new mongoose.Schema(
  {
    sender: String,

    receiver: String,

    amount: Number,

    status: String,

    createdAt: Date,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Transaction", TransactionSchema);
