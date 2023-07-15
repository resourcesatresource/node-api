const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({
  isGold: Boolean,
  name: String,
  phone: String,
});

module.exports = new mongoose.model("customer", customerSchema);
