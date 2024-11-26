const Book = require("../models/book");
const validateID = require("../utils/validateID");

// Create a new book
const createBook = async (req, res) => {
    const { title, author, genre } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Please Provide a Title" });
    }
    if (!author) {
      return res.status(400).json({ message: "Please Provide an Author" });
    }
    if (!genre) {
      return res.status(400).json({ message: "Please Provide a Genre" });
    }
  
    try {
      const book = await Book.create(req.body);
      res.status(201).json({ message: "Book Created Successfully", newBook: book });
    } catch (error) {
      res.status(500).json({ message: "Error creating book", error: error.message });
    }
  };

//   Get book by ID
  const getBookById = async (req, res) => {
    const { id } = req.params;
  
    // Validate the ID if needed
    if (!validateID(id)) {
      return res.status(400).json({ message: `ID ${id} is not valid` });
    }
  
    try {
      const book = await Book.findById(id); // Search for the book by ID
      if (!book) {
        return res.status(404).json({ message: `No Book with ID: ${id}` }); // Book not found
      }
      res.status(200).json({ message: "Book found", book }); // Return the found book
    } catch (error) {
      res.status(500).json({ message: "Error retrieving book", error: error.message }); // Error handling
    }
  };
  

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving books", error: error.message });
  }
};


// Update a book
const editBook = async (req, res) => {
  const { id } = req.params;

  if (!validateID(id)) {
    return res.status(400).json({ message: `ID ${id} is not valid` });
  }

  try {
    const book = await Book.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true, runValidators: true });
    if (!book) {
      return res.status(404).json({ message: `No Book with ID: ${id}` });
    }
    res.status(200).json({ message: "Book Updated Successfully", updatedBook: book });
  } catch (error) {
    res.status(500).json({ message: "Error updating book", error: error.message });
  }
};

// Delete a book
const deleteBook = async (req, res) => {
  const { id } = req.params;

  if (!validateID(id)) {
    return res.status(400).json({ message: `ID ${id} is not valid` });
  }

  try {
    const book = await Book.findOneAndDelete({ _id: id });
    if (!book) {
      return res.status(404).json({ message: `No Book with ID: ${id}` });
    }
    res.status(200).json({ message: "Book Deleted Successfully", deletedBook: book });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error: error.message });
  }
};

module.exports = {createBook, getBookById, getAllBooks, editBook, deleteBook };

