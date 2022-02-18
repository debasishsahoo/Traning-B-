class CustomAPIError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

const createCustomAPIError = (msg, statusCode) => {
    return new CustomAPIError(msg, statusCode)
}

module.exports = { CustomAPIError, createCustomAPIError }