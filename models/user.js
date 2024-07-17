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

const User = new mongoose.model("user", userSchema);

const getByEmail = (email) => {
  return User.findOne({ email });
};

const update = (email, params) => {
  return User.findOneAndUpdate({ email }, params, { returnDocument: "after" });
};
// model

module.exports = { User, getByEmail, update };
