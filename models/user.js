const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const { Customer } = require("./customer");

const userSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
    sparse: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  reset_token: {
    expires_at: {
      type: String,
      required: false,
    },
  },
  requests: [
    {
      requesterEmailId: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  profileImage: {
    data: {
      type: Buffer,
      required: false,
    },
    contentType: {
      type: String,
      required: false,
    },
  },
});

// adding token generation method
userSchema.methods.generateAuthToken = function (
  options = { expiresIn: undefined },
) {
  return jwt.sign(
    {
      _id: this._id,
      isAdmin: this.isAdmin,
      name: this.name,
      email: this.email,
    },
    config.get("jwtprivatekey"),
    {
      ...(options?.expiresIn && { expiresIn: options.expiresIn }),
    },
  );
};

/* 
  initialize customer collection
*/
userSchema.post("save", async function (doc) {
  const newCustomer = {
    userId: doc._id,
    name: doc.name,
  };
  try {
    await Customer.create(newCustomer);
  } catch (error) {
    // Todo: Will log it for better debugging
  }
});

const User = new mongoose.model("user", userSchema);

const getByEmail = (email) => {
  return User.findOne({ email });
};

const getById = (_id) => {
  return User.findOne({ _id });
};

const getByUsername = (username) => {
  return User.findOne({ username });
};

const update = (email, params, options) => {
  return User.findOneAndUpdate({ email }, params, {
    returnDocument: "after",
    ...options,
  });
};

module.exports = { User, getByEmail, getById, getByUsername, update };
