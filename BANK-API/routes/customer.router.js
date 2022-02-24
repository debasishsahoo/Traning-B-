const express = require("express");
const router = express.Router();

const {
  allCust,
  signUp,
  signIn,
  getCust,
  setCust,
  delCust,
  blockCust,
} = require("../controllers/customer.controller");

// 1. Bank Customer
// 2. Bank Employee

// Customer Can sign up, sign in, create new Account, Edit Account, Delete Account,
// Customer Can Deposit, withdrawal money from account, they can receive and send money from another user

// Employee login, check balance of a particular account and block a particular account they give authorization to a Transaction.

// without bank employee authorizing no Transaction can happened

router.route("/").get(allCust);

router.route("/signup").post(signUp);

router.route("/signin").post(signIn);

router.route("/:id").get(getCust).patch(setCust).delete(delCust);

router.route("/block/:id").get(blockCust);

module.exports = router;
