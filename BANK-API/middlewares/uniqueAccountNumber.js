const Account = require("../models/account.model");

// function uuidv4() {
//   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
//     let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
//     return v.toString(16);
//   })

// }

// function numuuidv4() {
//   return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g,
//     c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4));
// }


const checkAccount = async () => {

  const validAccount = await Math.floor(Math.random() * 1E16);

};

module.exports = checkAccount;
