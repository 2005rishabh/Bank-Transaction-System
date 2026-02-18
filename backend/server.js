const app = require("./src/app");
require("dotenv").config();
const connectDB = require("./src/config/db");

connectDB();


app.listen(3000, () => {
    console.log("Server is running on port 3000");
    console.log("https://localhost:3000");
});


// cEuYWeE2qKXJpkJi