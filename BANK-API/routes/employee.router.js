const express = require("express");
const router = express.Router();

const {
  allEmployee,
  signUp,
  signIn,
  getEmployee,
  setEmployee,
  delEmployee,
  getAccountBalance,
  setAccountBalance,
  getAccountStatus,
  setAccountStatus,
} = require("../controllers/employee.controller");

router.route("/").get(allEmployee);

router.route("/signup").post(signUp);

router.route("/signin").post(signIn);

router.route("/:id").get(getEmployee).patch(setEmployee).delete(delEmployee);

router
  .route("/balance/:id")
  .post(getAccountBalance)
  .patch(setAccountBalance);

router
  .route("/account_status/:id")
  .get(getAccountStatus)
  .patch(setAccountStatus);

module.exports = router;
