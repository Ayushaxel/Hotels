const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL_ONLINE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Server connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // stop the server if DB fails
  }
};

const db = mongoose.connection;

db.on("disconnected", () => {
  console.log("⚠️ Server disconnected from MongoDB");
});

db.on("error", (err) => {
  console.error("❌ MongoDB error:", err.message);
});

module.exports = connectDB;
