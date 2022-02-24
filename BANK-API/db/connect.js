const mongoose = require("mongoose")

const connectDb = (url) => {
    return mongoose.connect(url, {
        useNewUrlParser: true
    })
}

module.exports = connectDb