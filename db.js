const mongoose = require("mongoose");
require('dotenv').config();

const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("✅ Connected to MongoDB");
});

db.on("disconnected", () => {
  console.log("⚠️ Disconnected from MongoDB");
});

db.on("error", (err) => {
  console.error("❌ MongoDB error:", err.message);
});

module.exports = db;
