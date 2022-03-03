const mongoose = require("mongoose");
const Joi = require("joi");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const checkEmail = require("../middlewares/uniqueEmail");
const checkPhone = require("../middlewares/uniquePhone");

const EmployeeSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    contactNo: Number,
    password: String,
    isEmployee: String,
    createdAt: Date,
  },
  { timestamps: true }
);

EmployeeSchema.pre("create", async function () {
  const salt = await bcrypt.genSalt(Number(process.env.SECRET_KEY));
  this.password = await bcrypt.hash(this.password, salt);
  this.CIF_No = await autoIdGenerator();
});
EmployeeSchema.pre("findByIdAndUpdate", async function () {
  const salt = await bcrypt.genSalt(Number(process.env.SECRET_KEY));
  this.password = await bcrypt.hash(this.password, salt);
});

EmployeeSchema.methods.createJWT = async function () {
  return jwt.sign({ userId: this._id, name: this.name }, process.env.EncKey, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

EmployeeSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("Employee", EmployeeSchema);
