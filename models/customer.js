const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  isGold: {
    type: Boolean,
    required: false,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  connections: [
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
        default: "",
      },
      url: {
        type: String,
        required: true,
      },
      iconName: {
        type: String,
        required: false,
        default: "",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Customer = new mongoose.model("customer", customerSchema);

module.exports = { Customer };
