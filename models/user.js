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
  isAdmin: {
    type: Boolean,
    default: false,
  },
  requests: [
    {
      requesterEmailId: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

// adding token generation method
userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      isAdmin: this.isAdmin,
      name: this.name,
      email: this.email,
    },
    config.get("jwtprivatekey")
  );
};

const User = new mongoose.model("user", userSchema);

const getByEmail = (email) => {
  return User.findOne({ email });
};

const update = (email, params, options) => {
  return User.findOneAndUpdate({ email }, params, {
    returnDocument: "after",
    ...options,
  });
};
// model

module.exports = { User, getByEmail, update };
