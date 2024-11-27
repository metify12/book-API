require("dotenv").config(); // Load environment variables
const express = require("express"); // Import express
const mongoose = require("mongoose"); // Import mongoose
const cors = require("cors"); // Import cors for cross-origin requests
const connectDB = require('./config/db')

const app = express();
const port = process.env.PORT || 5000; // Set the port from environment variables or default to 5000

connectDB();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse incoming JSON data

// Import routes
const bookRouter = require("./routes/books"); // Book routes
const notFound = require("./middlewares/notFound"); // 404 handler middleware

// Use routes
app.use("/api/books", bookRouter); // Books API route
app.use(notFound); // 404 handler



  // Start the server on the specified port
   app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });




