require('dotenv').config()
const ConnectDB = require('./db/connect')
const Product = require('./models/product.model')
const JSONPRODUCTS = require('./products.json')

const SEED = async () => {
    try {
        await ConnectDB(process.env.MONGO_DB_URL)
        await Product.deleteMany()
        await Product.create(JSONPRODUCTS)
        console.log('Success!! Product Inserted');
        process.exit(1)
    }
    catch (error) {
        console.log(error);
        process.exit(0)
    }
}
SEED()