const express = require("express");

const {
  createBook,
  getBookById,
  getAllBooks,
  editBook,
  deleteBook,
} = require("../controllers/bookController");

const router = express.Router();

// Route to create a new book
router.post("/api/books/create", createBook);

// Route to get a particular book
router.get('/api/books/:id', getBookById);

// Route to get all books
router.get("/api/books/get", getAllBooks);

// Route to edit a book by ID
router.put("/api/books/:id", editBook);

// Route to delete a book by ID
router.delete("/api/books/:id", deleteBook);

module.exports = router;