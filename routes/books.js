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
router.post("/create", createBook);

// Route to get all books
router.get("/get", getAllBooks);

// Route to get a particular book
router.get('/:id', getBookById);

// Route to edit a book by ID
router.put("/:id", editBook);

// Route to delete a book by ID
router.delete("/:id", deleteBook);

module.exports = router;