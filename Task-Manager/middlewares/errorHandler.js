const errorHandler = (err, req, res, next) => {
    return res.status(500).json({ success: false, message: err.message })
}
module.exports = errorHandler