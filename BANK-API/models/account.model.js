const mongoose = require("mongoose");

let AccountSchema = mongoose.Schema(
  {
    CIF_No: String,

    accountNumber: String,

    IFSC: String,

    accountBalance: Number,

    accoutType: String,

    createdAt: Date,
  },
  { timestamp: true }
);

module.exports = mongoose.model("account", AccountSchema);
