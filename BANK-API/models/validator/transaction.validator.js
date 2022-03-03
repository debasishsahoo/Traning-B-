const Joi = require("joi");
const authScheme = Joi.object({
  sender: Joi.ObjectId().ref("Customer").required(),

  receiver: Joi.ObjectId().ref("Customer").required(),

  amount: Joi.number().default(0),

  status: Joi.string().valid("failed", "success", "pending").default("pending"),

  createdAt: Joi.date().default(Date.now()),
});

module.exports = authScheme;
