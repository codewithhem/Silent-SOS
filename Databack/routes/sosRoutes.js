const express = require("express");
const Emergency = require("../models/Emergency");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// CREATE SOS ALERT
router.post("/", protect, async (req, res) => {
  try {
    const { contacts, location } = req.body;

    if (!contacts || contacts.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No trusted contacts found.",
      });
    }

    if (
      !location ||
      location.latitude === undefined ||
      location.longitude === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Location is required.",
      });
    }

    const emergency = await Emergency.create({
      userId: req.user.userId,
      contacts,
      location,
      status: "active",
    });

    console.log("🚨 SOS ALERT SAVED");
    console.log("Emergency ID:", emergency._id);
    console.log("Location:", location);

    res.status(201).json({
      success: true,
      message: "SOS alert saved successfully.",
      emergencyId: emergency._id,
    });
  } catch (error) {
    console.log("SOS error:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to process SOS alert.",
    });
  }
});

// GET EMERGENCY HISTORY
router.get("/history/:userId", protect, async (req, res) => {
  try {
    const emergencies = await Emergency.find({
      userId: req.user.userId,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      emergencies,
    });
  } catch (error) {
    console.log("Emergency history error:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to fetch emergency history.",
    });
  }
});

module.exports = router;