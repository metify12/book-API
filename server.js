
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/book'); // Import the Book model

const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Debug log for server start
console.log('Server is starting...');
console.log('Connecting to MongoDB with URI:', process.env.MONGO_URI);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => {
    console.error('Could not connect to MongoDB:', err);
    process.exit(1); // Exit process if DB connection fails
  });

// Endpoints
app.get('/', (req, res) => {
  res.send('Welcome to the Book API!');
});

// 1. GET /books
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find(); // Find all books
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving books', error: err });
  }
});

// 2. GET /books/:id
app.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id); // Find book by ID
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving book', error: err });
  }
});

// 3. POST /books
app.post('/books', async (req, res) => {
  const { title, author, genre } = req.body;
  const newBook = new Book({ title, author, genre });

  try {
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(500).json({ message: 'Error saving book', error: err });
  }
});

// 4. PUT /books/:id
// PUT /books/:id: Update an existing book by ID
app.put('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedBook = await Book.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) {
      return res.status(404).json({ message: `Book with ID ${id} not found` });
    }

    res.status(200).json({
      message: 'Book updated successfully',
      book: updatedBook,
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: `Invalid book ID format: ${req.params.id}` });
    }
    res.status(500).json({ message: 'Error updating book', error });
  }
});

//  Delete a book by ID
app.delete('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: `Invalid book ID format: ${id}` });
    }

    // Attempt to delete the book
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: `Book with ID ${id} not found` });
    }

    res.json({
      message: `Book with ID ${id} deleted successfully`,
      book: deletedBook,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting book',
      error: error.message,
    });
  }
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
