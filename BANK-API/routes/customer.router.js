const express = require("express");
const router = express.Router();

const {
  GetAllCustomer,
  CustomerRegistration,
  CustomerLogin,
  UpdateCustomerById,
  GetCustomerById,
  DeleteCustomerById,
  BlockCustomerById,
  CustomerPasswordChange
} = require("../controllers/customer.controller");

// 1. Bank Customer
// 2. Bank Employee

// Customer Can sign up, sign in, create new Account, Edit Account, Delete Account,
// Customer Can Deposit, withdrawal money from account, they can receive and send money from another user

// Employee login, check balance of a particular account and block a particular account they give authorization to a Transaction.

// without bank employee authorizing no Transaction can happened

router.route("/").get(GetAllCustomer);

router.route("/signup").post(CustomerRegistration);

router.route("/signin").post(CustomerLogin);

router.route("/:id").get(GetCustomerById).patch(UpdateCustomerById).delete(DeleteCustomerById);

router.route("/block/:id").get(BlockCustomerById);
router.route("/:id/cif/:cif").patch(CustomerPasswordChange)

module.exports = router;
