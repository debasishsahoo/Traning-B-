const Product = require('../models/product.model')

const getAllTestProduct = async (req, res) => {
    const Products = await Product.find();

    if (Products.length === 0) {
        return res.status(404).json({ success: false, message: 'No Product Found' })
    }
    res.status(200).json({
        success: true,
        count: Products.length,
        Products: Products
    })
}

const getAllDynamicsProduct = async (req, res) => {
    const { name, price } = req.query

    res.status(200).json({
        success: true,
        Products: { name, price }
    })


}

module.exports = { getAllTestProduct, getAllDynamicsProduct }