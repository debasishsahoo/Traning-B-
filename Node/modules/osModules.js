const os = require('os');
const userinfo = os.userInfo()
const currentOS = {
    name: os.type(),
    release: os.release(),
    totalMem: os.totalmem(),
    freeMem: os.freemem()
}
const Networks = os.networkInterfaces()

module.exports = { userinfo, currentOS, Networks }