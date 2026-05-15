const mongoose = require("mongoose");
const dns = require("dns");

// This forces the use of Google DNS to resolve MongoDB SRV records,
// bypassing potential local network/ISP DNS issues.
dns.setServers(["8.8.8.8", "8.8.4.4"]);

async function connectDB() {
    try {
        console.log("Attempting to connect to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongoose connected successfully");
    }
    catch (err) {
        console.error("MongoDB Connection Error:", err.message);
    }
}

module.exports = connectDB;