const Joi = require("joi");
const checkEmail = require("../../middlewares/uniqueEmail");
const checkPhone = require("../../middlewares/uniquePhone");

const authScheme = Joi.object({
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
    .default("active"),
  createdAt: Joi.date().default(Date.now()),
});

module.exports = authScheme;
