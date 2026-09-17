const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      family: 4,
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("MongoDB connection failed:");
    console.log(error.message);
  }
};

module.exports = connectDB;