const mongoose = require("mongoose");

const emergencySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    location: {
      latitude: {
        type: Number,
        required: true,
      },

      longitude: {
        type: Number,
        required: true,
      },
    },

    contacts: [
      {
        name: String,
        phone: String,
      },
    ],

    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Emergency = mongoose.model("Emergency", emergencySchema);

module.exports = Emergency;