const { MongoClient } = require("mongodb");

// Load environment variables
require("dotenv").config();

let db; // To store the database instance

const CONNECT_WITH_DB = async () => {
  try {
    const client = new MongoClient(process.env.MONGO_DB_URI); // Use the URI from the .env file
    await client.connect();
    console.log("Connected to MongoDB Atlas");
    db = client.db("task-todo"); // Set the database instance
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    throw err; // Re-throw error to handle it in the calling function
  }
};

// Function to get the database instance
const connectionDB = () => {
  if (!db) {
    throw new Error("Database not initialized. Call CONNECT_WITH_DB first.");
  }
  return db;
};

module.exports = { connectionDB, CONNECT_WITH_DB };
