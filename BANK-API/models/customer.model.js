const mongoose = require("mongoose");
const Joi = require("joi");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const autoIdGenerator = require('../middlewares/autoIdGenerator');

const checkEmail = require("../middlewares/uniqueEmail");
const checkPhone = require("../middlewares/uniquePhone");


const CustomerSchema = new mongoose.Schema(
  {
    name: Joi.string().pattern(new RegExp("^[a-zA-Z]{3,30}$")),
    email: Joi.string().required().trim().lowercase().external(checkEmail).email(),
    contactNo: Joi.number().max(10).min(10).external(checkPhone),
    password: Joi.string().required(),
    CIF_No: Joi.string().alphanum(),
    isActive: Joi.string().valid("active", "deactive", "blocked", "notVarified").default("notVarified"),
    createdAt: Joi.date().default(Date.now()),
  },
  { timestamps: true }
)
CustomerSchema.pre('create', async function () {

  const salt = await bcrypt.genSalt(Number(process.env.SECRET_KEY))
  this.password = await bcrypt.hash(this.password, salt)
  this.CIF_No = await autoIdGenerator();

})

CustomerSchema.methods.createJWT = async function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.EncKey,
    { expiresIn: process.env.JWT_LIFETIME }
  )

}

CustomerSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password)
  return isMatch
}

module.exports = mongoose.model("Customer", CustomerSchema);
