const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// GET /books
router.get('/', async (req, res) => {
    const books = await Book.find();
    res.json(books);
});

// GET /books/:id
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).send('Book not found');
        res.json(book);
    } catch (err) {
        res.status(400).send('Invalid ID');
    }
});

// POST /books
router.post('/', async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json(book);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// PUT /books/:id
router.put('/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book) return res.status(404).send('Book not found');
        res.json(book);
    } catch (err) {
        res.status(400).send('Invalid ID or data');
    }
});

// DELETE /books/:id
router.delete('/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).send('Book not found');
        res.json({ message: 'Book deleted' });
    } catch (err) {
        res.status(400).send('Invalid ID');
    }
});

module.exports = router;
