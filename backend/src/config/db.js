const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected 🛢🛢");
  } catch (err) {
    console.error("❌ Mongo Connection Error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
