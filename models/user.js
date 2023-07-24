const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

// Schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: Boolean,
});

// adding token generation method
userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin, name: this.name },
    config.get("jwtprivatekey")
  );
};

// model

module.exports = new mongoose.model("user", userSchema);
