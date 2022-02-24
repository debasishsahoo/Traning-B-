const { v4: uuidv4 } = require("uuid");

const autoIdGenerator = async () => {
  const newId = uuidv4();
  return newId;
};

module.exports = autoIdGenerator;
