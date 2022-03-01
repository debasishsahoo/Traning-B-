const express = require("express");
const router = express.Router();

const {
  GetAllEmployees,
  EmployeeLogin,
  GetEmployeeById,
  UpdateEmployeeById,
  DeleteEmployeeById,
} = require("../controllers/employee.controller");

router.route("/").get(GetAllEmployees);

//router.route("/signup").post(signUp);

router.route("/signin").post(EmployeeLogin);

router.route("/:id").get(GetEmployeeById).patch(UpdateEmployeeById).delete(DeleteEmployeeById);

// router
//   .route("/balance/:id")
//   .post(getAccountBalance)
//   .patch(setAccountBalance);

// router
//   .route("/account_status/:id")
//   .get(getAccountStatus)
//   .patch(setAccountStatus);

module.exports = router;
