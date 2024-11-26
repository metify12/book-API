require("dotenv").config(); // Load environment variables
const express = require("express"); // Import express
const mongoose = require("mongoose"); // Import mongoose
const cors = require("cors"); // Import cors for cross-origin requests

const app = express();
const port = process.env.PORT || 5000; // Set the port from environment variables or default to 5000

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse incoming JSON data

// Import routes
const bookRouter = require("./routes/books"); // Book routes
const notFound = require("./middlewares/notFound"); // 404 handler middleware

// Use routes
app.use("/api/books", bookRouter); // Books API route
app.use(notFound); // 404 handler

// Start the server and connect to MongoDB
const start = async () => {
  try {
    // Connect to MongoDB 
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connected!");

    // Start the server on the specified port
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

start(); // Run the start function to initiate the connection and server

