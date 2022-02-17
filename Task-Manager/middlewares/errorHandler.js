const { CustomAPIError } = require('../error/customApiError')

const errorHandler = (err, req, res, next) => {
    
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ success: false, message: err.message })
    }
    return res.status(500).json({ success: false, message: err.message })
}
module.exports = errorHandler