const mongoose = require("mongoose");
const dotenv = require("dotenv");

const envFile =
      process.env.NODE_ENV === "test" ? ".env.test" : ".env.development";
dotenv.config({ path: envFile });

async function dbConnect() {
      const USERNAME = process.env.DB_USERNAME;
      const PASSWORD = process.env.DB_PASSWORD;
      const DB_NAME = process.env.DB_NAME;
      const DB_URL = `mongodb+srv://${USERNAME}:${PASSWORD}@sibu.xje0et5.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=sibu`;

      try {
            await mongoose.connect(DB_URL);
            console.log("Connected to MongoDB");
      } catch (error) {
            console.log("Database Error: " + error);
      }
}

module.exports = dbConnect;
