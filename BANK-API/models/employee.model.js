const mongoose = require("mongoose");
const Joi = require("joi");
const checkEmail = require("../middlewares/uniqueEmail");
const checkPhone = require("../middlewares/uniquePhone");

const EmployeeSchema = new mongoose.Schema(
  {
    name: Joi.string().required().pattern(new RegExp("^[a-zA-Z]{3,30}$")),
    email: Joi.string()
      .required()
      .trim()
      .lowercase()
      .external(checkEmail)
      .email(),

    contactNo: Joi.number().max(10).min(10).required().external(checkPhone),

    password: Joi.string(),

    isEmployee: Joi.string()
      .valid("active", "deactive", "blocked")
      .default("active")
      .required(),
    createdAt: Joi.date().default(Date.now()),
  },
  { timestamps: true }
);
module.exports = mongoose.model("Employee", EmployeeSchema);
