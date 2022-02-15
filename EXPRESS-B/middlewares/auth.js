const { people } = require('../data/data')
const auth = (req, res, next) => {
    const { name } = req.query;
    const SingleUser = people.find(e => e.name === name)

    if (SingleUser) {
        req.user = SingleUser
        next()
    } else {
        return res.status(401).json('Not Authorized')
    }
}
module.exports = auth