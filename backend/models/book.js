const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  genre: { type: String, required: true },
  description: { type: String, required: true },
  coverImage: { type: String, required: true },
  file: { type: String, required: true }
},{timestamps:true});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
