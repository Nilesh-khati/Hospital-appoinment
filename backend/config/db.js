const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Ensure dotenv is loaded (some loaders may not inject env vars for this module)
    try {
      const dotenv = require("dotenv");
      const path = require("path");
      dotenv.config({ path: path.resolve(__dirname, "../.env") });
    } catch (e) {
      // ignore
    }

    // Your .env uses MONGODB_URI (not MONGO_URI). Support both.
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

    console.log("Mongo URI present:", mongoUri ? "✓ Present" : "✗ Missing");

    if (!mongoUri) {
      throw new Error(
        "MongoDB URI is not defined (check backend/.env: use MONGODB_URI)",
      );
    }

    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✓ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`✗ MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
