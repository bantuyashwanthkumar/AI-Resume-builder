require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/database");

const startServer = async () => {
    try {
        await connectDB();
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    } catch (error) {
        console.error("Error starting server:", error);
    }
};

startServer();

