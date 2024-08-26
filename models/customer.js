const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "users",
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
