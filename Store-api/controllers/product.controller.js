const Product = require('../models/product.model')

const getAllTestProduct = async (req, res) => {
    //const Products = await Product.find({}).limit(10);

    const Products = await Product.find({}).sort('price -name');

    if (Products.length === 0) {
        return res.status(404).json({ success: false, message: 'No Product Found' })
    }
    res.status(200).json({
        requestQuery: req.query,
        success: true,
        count: Products.length,
        Products: Products
    })
}




const getAllDynamicsProduct = async (req, res) => {

    //DB BLOCK
    const { featured, name, company, sort, fields } = req.query
    const QueryObject = {}
    if (featured) {
        QueryObject.featured = featured === 'true' ? true : false
    }
    if (name) {
        QueryObject.name = { $regex: name, $options: 'i' }
    }
    if (company) {
        QueryObject.company = { $regex: company, $options: 'i' }
    }

    //const Products = await Product.find(QueryObject);
    let result = Product.find(QueryObject); //1200000000

    //SORT  
    if (sort) {
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    } else {
        result = result.sort('-createdAt')
    }

    if (fields) {
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }







    //In memory Block
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 100;
    const skip = Number(page - 1) * limit;

    result = result.limit(limit).skip(skip)

    const Products = await result;




    //https://www.flipkart.com/search?q=mobile&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off&page=31














    if (Products.length === 0) {
        return res.status(404).json({ QueryObject: QueryObject, success: false, message: 'No Product Found' })
    }
    res.status(200).json({
        requestQuery: req.query,
        QueryObject: QueryObject,
        success: true,
        count: Products.length,
        Products: Products
    })
}
module.exports = { getAllTestProduct, getAllDynamicsProduct }