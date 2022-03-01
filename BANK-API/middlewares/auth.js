const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../error')

const auth = async (req, res, next) => {
    //check headers
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('Authentication invalid')
    }
    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.EncKey)
        req.user = { userId: payload.userId, name: payload.name }
        next()
    }
    catch (error) {
        throw new UnauthenticatedError('Authentication invalid')
    }
}
module.exports = auth