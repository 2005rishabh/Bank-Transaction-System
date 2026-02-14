const mongoose = require("mongoose");

function connectDB() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("MongoDB connected");
        })
        .catch((error) => {
            console.error("Error connecting to MongoDB:", error);
            process.exit(1); // Exit with failure
        });
}

module.exports = connectDB;