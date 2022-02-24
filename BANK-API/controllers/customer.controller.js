const Customer = require('../models/customer.model');
const asyncWrapper = require('../middlewares/asyncWrapper');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const autoIdGenerator = require('../middlewares/autoIdGenerator');
const accountModel = require('../models/account.model');
const errorHandler = require('../middlewares/errorHandler');
const { CustomAPIError, UnauthenticatedError, NotFoundError, BadRequestError } = require('../error');
const { StatusCodes } = require('http-status-codes');

const allCust = asyncWrapper(async (req, res) => {
  const customers = await Customer.find({}).sort('-createdAt');
  if (customers.length === 0) {
    throw new NotFoundError(`No Data Found`)
  }
  res.status(StatusCodes.OK).json({
    success: true,
    count: customers.length,
    customers: customers,
  });
});


const signUp = asyncWrapper(async (req, res) => {
  const {
    body: { name, email, contactNo, password }
  } = req;

  if (req.body.password === '' || req.body.email === '') {
    throw new BadRequestError('Please Provide proper Cred')
  }

  req.body.cifNo = await autoIdGenerator();
  req.body.password = await bcrypt.hash(req.body.password, 12);

  const customers = await Customer.create(req.body);

  const account = await accountModel.create({});

  // if (!account) {
  //   throw new NotFoundError(`No Customer Found`)
  // }

  res.status(StatusCodes.CREATED).json({
    success: true,
    //message: `Customer Inserted with id: ${customers._id} `,
    customers: req.body,
  });
});



const signIn = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  // console.log("hi");
  const customers = await Customer.findOne({ email });
  // console.log(customers);
  if (!customers) {
    return res
      .status(400)
      .json({ success: false, message: 'User dose not Exist' });
  }
  const isPasswordCorrect = await bcrypt.compare(password, customers.password);

  if (!isPasswordCorrect) {
    return res
      .status(400)
      .json({ success: false, message: 'invalid Password' });
  }
  const token = jwt.sign(
    {
      email: customers.email,
      id: customers._id,
      user_type: 'customer',
    },
    process.env.EncKey,
    { expiresIn: 3600 }
  );
  res.status(201).json({
    success: true,
    message: 'Sucessfully login',
    customers: customers,
    token: token,
    expiresIn: 3600,
  });
});
// const getCust = asyncWrapper(async (req, res) => {
//   const { id } = req.params;
//   const customers = await Customer.findById(id);
//   if (!customers) {
//     return res
//       .status(404)
//       .json({ success: false, message: "Customer not found" });
//   }
//   res.status(200).json({
//     success: true,
//     message: `Customer find with id ${customers._id}`,
//     customers: customers,
//   });
// });
const setCust = asyncWrapper(async (req, res) => {
  const { id: custId } = req.params;
  const customers = await Customer.findOneAndUpdate({ _id: custId }, req.body, {
    new: true,
    runValidators: true,
    // overwrite: true
  });

  if (!customers || customers.length <= 0) {
    return res
      .status(404)
      .json({ success: false, message: 'Customer Id not found' });
  }
  res.status(200).json({
    success: true,
    message: 'customer Updated',
    customers: customers,
  });
});
const delCust = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const customers = await Customer.findOneAndUpdate(
    { _id: id },
    { isActive: 'deactive' },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!customers) {
    return res.status(404).json({
      success: false,
      message: `Customer not found with ${id}`,
    });
  }

  res.status(200).json({
    success: true,
    message: 'Customer Deleted',
    customers: customers,
  });
});
const blockCust = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const customers = await Customer.findOneAndUpdate(
    { _id: id },
    { isActive: 'blocked' },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!customers) {
    return res.status(404).json({
      success: false,
      message: `Customer not found with ${id}`,
    });
  }

  res.status(200).json({
    success: true,
    message: 'Customer Blocked',
    customers: customers,
  });
});

////////////////////////////////////////////////////////////////
///////////////////////// THIS PART ////////////////////////////
////////////////////////////////////////////////////////////////
const getCust = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const customers = await Customer.findById(id);
  if (!customers) {
    return next(new CustomApiError(StatusCodes.NOT_FOUND));
  }
  res.status(200).json({
    success: true,
    message: `Customer find with id ${customers._id}`,
    customers: customers,
  });
});

module.exports = {
  allCust,
  signUp,
  signIn,
  getCust,
  setCust,
  delCust,
  blockCust,
};
