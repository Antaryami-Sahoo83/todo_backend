import { connect } from "mongoose";

async function dbConnect() {
      const USERNAME = process.env.DB_USERNAME;
      const PASSWORD = process.env.DB_PASSWORD;
      const DB_NAME = "todolist";
      const DB_URL = `mongodb+srv://${USERNAME}:${PASSWORD}@sibu.xje0et5.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=sibu`;

      try {
            await connect(DB_URL);
            console.log("Connected to MongoDB");
      } catch (error) {
            console.log("Database Error: " + error);
      }
}

export default dbConnect;
