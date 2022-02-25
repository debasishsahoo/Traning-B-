const mongoose = require("mongoose");
const checkId = async (id) => {
    const validId = await mongoose.Types.ObjectId.isValid(id);

    if (!validId) {
        throw new Error("Id is Not Valid");
    }
};

module.exports = checkId;