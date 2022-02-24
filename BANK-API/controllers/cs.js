const Customer = require('../models/customer.model');
const autoIdGenerator = require('../middlewares/autoIdGenerator');
const accountModel = require('../models/account.model');
const {
    CustomAPIError,
    UnauthenticatedError,
    NotFoundError,
    BadRequestError,
} = require('../error');
const { StatusCodes } = require('http-status-codes');

const allCust = async (req, res) => {
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

const signUp = async (req, res) => {
    const {
        body: { name, email, contactNo, password },
    } = req;
    if (req.body.password === '' || req.body.email === '') {
        throw new BadRequestError('Please Provide proper Cred');
    }
    req.body.cifNo = await autoIdGenerator();
    req.body.password = await bcrypt.hash(req.body.password, 12);

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

const signIn = async (req, res) => {
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

const setCust = async (req, res) => {
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
};