const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { 
        type: String, 
     required: true,
        enum: ['Comedy', 'Romance', 'Tragedy', 'Horror'], 
    }
});

module.exports = mongoose.model('Book', bookSchema);

