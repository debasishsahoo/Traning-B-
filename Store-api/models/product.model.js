const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must Provide Name'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Must Provide Price']
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.5
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    company: {
        type: String,
        emum: {
            values: ['liddy', 'marcos', 'ikea', 'caressa'],
            message: `{VALUE} is not Supported`
        }
    }
})
module.exports = mongoose.model('Product', ProductSchema)  

//mongoose.connection.on('connect')
//mongoose.connection.on('error')
//mongoose.connection.on('disconnect')

//process.on('SIGINT')
//AcessToken,refreshTOKEN