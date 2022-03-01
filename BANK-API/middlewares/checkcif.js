const Customer = require("../models/customer.model");

const checkCIF = async (cifno) => {
    const validCif = await Customer.get({ CIF_No: cifno });

    
    if (!validCif) {
        throw new Error("Customr Dose not Exist");
    }
};

module.exports = checkCIF;