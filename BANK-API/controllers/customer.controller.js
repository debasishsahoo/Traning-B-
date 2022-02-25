const Customer = require('../models/customer.model');
const CheckId = require('../middlewares/validId')
const CheckCIF = require('../middlewares/checkcif')

const accountModel = require('../models/account.model');
const {
    CustomAPIError,
    UnauthenticatedError,
    NotFoundError,
    BadRequestError,
} = require('../error');
const { StatusCodes } = require('http-status-codes');

const GetAllCustomer = async (req, res) => {
    const customers = await Customer.find({}).sort('-createdAt');
    if (customers.length === 0) {
        throw new NotFoundError(`No Data Found`);
    }
    res.status(StatusCodes.OK).json({
        success: true,
        count: customers.length,
        customers: customers,
    });
};

const CustomerRegistration = async (req, res) => {
    const {
        body: { name, email, contactNo, password },
    } = req;
    if (req.body.password === '' || req.body.email === '') {
        throw new BadRequestError('Please Provide proper Cred');
    }
    const customers = await Customer.create(req.body);
    //const account = await accountModel.create({});
    if (!customers) {
        throw new NotFoundError(`No Customer Found`)
    }

    res.status(StatusCodes.CREATED).json({
        success: true,
        message: `Customer Inserted with id: ${customers._id} `,
        customers: customers,
    });
};

const CustomerLogin = async (req, res) => {
    const { body: { email, password } } = req;
    if (req.body.password === '' || req.body.email === '') {
        throw new BadRequestError('Please Provide proper Cred');
    }
    const customers = await Customer.findOne(req.body.email);
    if (!customers) {
        throw new UnauthenticatedError('User dose not Exist')
    }
    const isPasswordCorrect = await customers.comparePassword(req.body.password);

    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Password')
    }
    const token = customers.createJWT();

    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Sucessfully login',
        customers: customers,
        token: token
    });
};

const UpdateCustomerById = async (req, res) => {
    const {
        params: { id: custId },
        body: { name, contactNo, }
    } = req;

    if (!CheckId(custId)) {
        throw new BadRequestError('Please Provide valid Id');
    }

    if (req.body.name === '' || req.body.contactNo === '') {
        throw new BadRequestError('Please Provide proper Cred');
    }

    const customers = await Customer.findOneAndUpdate({ _id: custId }, req.body, {
        new: true,
        runValidators: true,
        // overwrite: true
    });

    if (!customers || customers.length <= 0) {
        throw new NotFoundError(`No Customer Found`)
    }
    res.status(StatusCodes.OK).json({
        success: true,
        message: `Customer Updated with id: ${customers._id} `,
        customers: customers,
    });
};

const GetCustomerById = async (req, res, next) => {
    const { id } = req.params;
    const customers = await Customer.findById(id);
    if (!customers) {
        throw new NotFoundError(`No Customer Found`)
    }
    res.status(StatusCodes.OK).json({
        success: true,
        message: `Customer find with id ${customers._id}`,
        customers: customers,
    });
};

const DeleteCustomerById = async (req, res) => {
    const { id: custId } = req.params;

    if (!CheckId(custId)) {
        throw new BadRequestError('Please Provide valid Id');
    }

    const customers = await Customer.findOneAndUpdate(
        { _id: custId },
        { isActive: 'deactive' },
        {
            new: true,
            runValidators: true,
        }
    );

    if (!customers) {
        throw new NotFoundError(`No Customer Found`)
    }

    res.status(StatusCodes.GONE).json({
        success: true,
        message: `Customer Deleted with ${custId}`,
        customers: customers,
    });
};

const BlockCustomerById = async (req, res) => {
    const { id: custId } = req.params;

    const customers = await Customer.findOneAndUpdate(
        { _id: custId },
        { isActive: 'blocked' },
        {
            new: true,
            runValidators: true,
        }
    );

    if (!customers) {
        throw new NotFoundError(`No Customer Found`)
    }

    res.status(StatusCodes.FORBIDDEN).json({
        success: true,
        message: `Customer Blocked with ${custId}`,
        customers: customers,
    });
};

const CustomerPasswordChange = async (req, res) => {
    const {
        params: { id: custId },
        cif: { cifno },
        body: { email, password }
    } = req

    if (!CheckId(custId)) {
        throw new BadRequestError('Please Provide valid Id');
    }
    if (!CheckCIF(cif)) {
        throw new NotFoundError('Please Provide valid CIF');
    }

    if (req.body.email === '' || req.body.passowrd === '') {
        throw new BadRequestError('Please Provide proper Cred');
    }

    const customers = await Customer.findByIdAndUpdate({ _id: custId }, req.body.password, {
        new: true,
        runValidators: true,
        // overwrite: true
    });
    if (!customers || customers.length <= 0) {
        throw new NotFoundError(`No Customer Found`)
    }
    res.status(StatusCodes.OK).json({
        success: true,
        message: `Customers Password Updated with id: ${customers._id} `,
        customers: customers,
    });
}


module.exports = {
    GetAllCustomer,
    CustomerRegistration,
    CustomerLogin,
    UpdateCustomerById,
    GetCustomerById,
    DeleteCustomerById,
    BlockCustomerById,
    CustomerPasswordChange
}
