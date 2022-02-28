const Employee = require("../models/employee.model");
const bcrypt = require("bcryptjs");
const {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} = require('../error');
const { StatusCodes } = require('http-status-codes');

const GetAllEmployees = async (req, res) => {
  const employee = await Employee.find({}).sort('-createdAt');

  if (employee.length === 0) {
    throw new NotFoundError(`No Emp Found`);
  }
  res.status(StatusCodes.OK).json({
    success: true,
    count: employee.length,
    employee: employee,
  });
};

// const signUp = async (req, res) => {
//   const { name, email, contactNo, password } = req.body;
//   // console.log();
//   const encPass = await bcrypt.hash(password, 12);

//   const employee = await Employee.create({
//     name: name,
//     email: email,
//     contactNo: contactNo,
//     password: encPass,
//   });

//   if (!employee) {
//     return res
//       .status(404)
//       .json({ success: false, message: "Employee not added" });
//   }

//   res.status(201).json({
//     success: true,
//     message: `Employee Inserted with id: ${employee._id} `,
//     employee: employee,
//   });
// };

const EmployeeLogin = async (req, res) => {
  const { body: { email, password } } = req;

  if (req.body.password === '' || req.body.email === '') {
    throw new BadRequestError('Please Provide proper Cred');
  }
  const employee = await Employee.findOne(req.body.email);

  if (!employee) {
    throw new UnauthenticatedError('Emp dose not Exist')
  }
  const isPasswordCorrect = await employee.comparePassword(req.body.password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Password')
  }
  const token = employee.createJWT();

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Sucessfully login",
    employee: employee,
    token: token,
  });
};
const GetEmployeeById = async (req, res) => {
  const { id } = req.params;
  const employee = await Employee.findById(id);

  if (!employee) {
    throw new NotFoundError(`No Employee Found`)
  }
  res.status(StatusCodes.OK).json({
    success: true,
    message: `Employee find with id ${employee._id}`,
    employee: employee,
  });
};

const UpdateEmployeeById = async (req, res) => {
  const {
    params: { id: empId },
    body: { name, contactNo, }
  } = req;

  if (!CheckId(empId)) {
    throw new BadRequestError('Please Provide valid Id');
  }
  if (req.body.name === '' || req.body.contactNo === '') {
    throw new BadRequestError('Please Provide proper Cred');
  }

  const employee = await Employee.findOneAndUpdate({ _id: empId }, req.body, {
    new: true,
    runValidators: true,
    // overwrite: true
  });

  if (!employee || employee.length <= 0) {
    throw new NotFoundError(`No Employee Found`)
  }
  res.status(StatusCodes.OK).json({
    success: true,
    message: `Emp Updated with id: ${employee._id} `,
    employee: employee,
  });
};

const DeleteEmployeeById = async (req, res) => {
  const { id: empId } = req.params;

  if (!CheckId(empId)) {
    throw new BadRequestError('Please Provide valid Id');
  }
  const employee = await Employee.findOneAndUpdate(
    { _id: empId },
    { isActive: "deactive" },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!employee) {
    throw new NotFoundError(`No Customer Found`)
  }

  res.status(StatusCodes.GONE).json({
    success: true,
    message: `Employee Deleted ${empId}`,
    employee: employee,
  });
};



module.exports = {
  GetAllEmployees,
  signUp,
  EmployeeLogin,
  GetEmployeeById,
  UpdateEmployeeById,
  DeleteEmployeeById,
  getAccountBalance,
  setAccountBalance,
  getAccountStatus,
  setAccountStatus,
};
