const auth = require('./auth')
const autoIdGenerator = require('./autoIdGenerator')
const checkCIF = require('./checkcif')
const errorHandler = require('./errorHandler')
const checkAccount = require('./uniqueAccountNumber')
const checkEmail = require('./uniqueEmail')
const checkPhone = require('./uniquePhone')
const checkId = require('./validId')

module.exports = {
    auth,
    autoIdGenerator,
    checkCIF,
    errorHandler,
    checkAccount,
    checkEmail,
    checkPhone,
    checkId
}