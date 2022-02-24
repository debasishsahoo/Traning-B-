const Employee = require("../models/employee.model");
const Customer = require("../models/customer.model");
const asyncWrapper = require("../middlewares/asyncWrapper");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const allEmployee = asyncWrapper(async (req, res) => {
  const employee = await Employee.find({});

  if (employee.length === 0) {
    return res
      .status(404)
      .json({ success: false, message: "No employee Found" });
  }
  res.status(200).json({
    success: true,
    count: employee.length,
    employee: employee,
  });
});

const signUp = asyncWrapper(async (req, res) => {
  const { name, email, contactNo, password } = req.body;
  // console.log();
  const encPass = await bcrypt.hash(password, 12);

  const employee = await Employee.create({
    name: name,
    email: email,
    contactNo: contactNo,
    password: encPass,
  });

  if (!employee) {
    return res
      .status(404)
      .json({ success: false, message: "Employee not added" });
  }

  res.status(201).json({
    success: true,
    message: `Employee Inserted with id: ${employee._id} `,
    employee: employee,
  });
});

const signIn = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  // console.log("hi");
  const employee = await Employee.findOne({ email });
  // console.log(employee);
  if (!employee) {
    return res
      .status(400)
      .json({ success: false, message: "User dose not Exist" });
  }
  const isPasswordCorrect = await bcrypt.compare(password, employee.password);

  if (!isPasswordCorrect) {
    return res
      .status(400)
      .json({ success: false, message: "invalid Password" });
  }
  const token = jwt.sign(
    {
      email: employee.email,
      id: employee._id,
      user_type: "employee",
    },
    process.env.EncKey,
    { expiresIn: 3600 }
  );
  res.status(201).json({
    success: true,
    message: "Sucessfully login",
    employee: employee,
    token: token,
    expiresIn: 3600,
  });
});
const getEmployee = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const employee = await Employee.findById(id);
  if (!employee) {
    return res
      .status(404)
      .json({ success: false, message: "Employee not found" });
  }
  res.status(200).json({
    success: true,
    message: `Employee find with id ${employee._id}`,
    employee: employee,
  });
});
const setEmployee = asyncWrapper(async (req, res) => {
  const { id: custId } = req.params;
  const employee = await Employee.findOneAndUpdate({ _id: custId }, req.body, {
    new: true,
    runValidators: true,
    // overwrite: true
  });

  if (!employee || employee.length <= 0) {
    return res
      .status(404)
      .json({ success: false, message: "Employee Id not found" });
  }
  res.status(200).json({
    success: true,
    message: "Employee Updated",
    employee: employee,
  });
});
const delEmployee = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const employee = await Employee.findOneAndUpdate(
    { _id: id },
    { isActive: "deactive" },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!employee) {
    return res.status(404).json({
      success: false,
      message: `Employee not found with ${id}`,
    });
  }

  res.status(200).json({
    success: true,
    message: "Employee Deleted",
    employee: employee,
  });
});

const getAccountBalance = asyncWrapper(async (req, res) => {
  const { customer_id } = req.params;
  const { employee_id } = req.body;
  const employee = await Employee.findOne({ _id: employee_id });
  if (!employee || employee.length <= 0) {
    return res.status(200).json({
      success: false,
      message: "Employee Not Matched",
    });
  }

  const customerData = await Customer.findById({ _id: customer_id }).select({
    name: 1,
    accBalance: 1,
    isActive: 1,
  });

  return res.status(200).json({
    success: true,
    message: "Ammount fatched",
    customer_data: customerData,
  });
});

const setAccountBalance = asyncWrapper(async (req, res) => {
  const { customer_id } = req.params;
  const { employee_id, amount } = req.body;
  const employee = await Employee.findOne({ _id: employee_id });
  if (!employee || employee.length <= 0) {
    return res.status(200).json({
      success: false,
      message: "Employee Not Matched",
    });
  }

  const customerData = await Customer.findByIdAndUpdate(
    { _id: customer_id },
    { accBalance: amount },
    {
      new: true,
      runValidators: true,
    }
  );

  return res.status(200).json({
    success: true,
    message: "Ammount fatched",
    customer_data: customerData,
  });
});

const getAccountStatus = asyncWrapper(async (req, res) => {
  const { customer_id } = req.params;

  const customerData = await Customer.findById({ _id: customer_id }).select({
    name: 1,
    isActive: 1,
  });

  return res.status(200).json({
    success: true,
    message: "Status fatched",
    customer_data: customerData,
  });
});

const setAccountStatus = asyncWrapper(async (req, res) => {
  const { customer_id } = req.params;

  const { employee_id, status } = req.body;
  const employee = await Employee.findOne({ _id: employee_id });
  if (!employee || employee.length <= 0) {
    return res.status(200).json({
      success: false,
      message: "Employee Not Matched",
    });
  }

  const customerData = await Customer.findByIdAndUpdate(
    { _id: customer_id },
    { isActive: status },
    {
      new: true,
      runValidators: true,
    }
  );

  return res.status(200).json({
    success: true,
    message: "Status fatched",
    customer_data: customerData,
  });
});

module.exports = {
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
};
