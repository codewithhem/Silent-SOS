const express = require("express");

const User = require("../models/User");
const protect = require("../middleware/authMiddleware");

const router = express.Router();


// GET TRUSTED CONTACTS
router.get("/:userId", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.json({
      success: true,
      contacts: user.trustedContacts,
    });
  } catch (error) {
    console.log("Get contacts error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
});


// ADD TRUSTED CONTACT
router.post("/:userId", protect, async (req, res) => {
  try {
    const { name, phone } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: "Please enter name and phone number.",
      });
    }

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    user.trustedContacts.push({
      name,
      phone,
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "Trusted contact added.",
      contacts: user.trustedContacts,
    });
  } catch (error) {
    console.log("Add contact error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
});


// DELETE TRUSTED CONTACT
router.delete("/:userId/:contactId", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    user.trustedContacts = user.trustedContacts.filter(
      (contact) => contact._id.toString() !== req.params.contactId
    );

    await user.save();

    res.json({
      success: true,
      message: "Trusted contact removed.",
      contacts: user.trustedContacts,
    });
  } catch (error) {
    console.log("Delete contact error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
});


module.exports = router;