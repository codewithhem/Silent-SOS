const mongoose = require("mongoose");

const sosAlertSchema = new mongoose.Schema(
  {
    contacts: [
      {
        name: {
          type: String,
          required: true,
        },
        phone: {
          type: String,
          required: true,
        },
      },
    ],

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

    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const SOSAlert = mongoose.model("SOSAlert", sosAlertSchema);

module.exports = SOSAlert;