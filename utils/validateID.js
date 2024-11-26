// utils/validateID.js
const mongoose = require("mongoose");

const validateID = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

module.exports = validateID;