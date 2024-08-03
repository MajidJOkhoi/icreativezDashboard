const Book = require("../models/book");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const fs = require("fs").promises;

// Helper function to upload files to Cloudinary
const uploadFileToCloudinary = async (filePath, options) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, options);
    // Remove the file from the local path after successful upload
    await fs.unlink(filePath);
    return result;
  } catch (error) {
    throw new Error("Error uploading file to Cloudinary: " + error.message);
  }
};

// Create a new book
const createBook = async (req, res) => {
  try {
    const { title, genre, description } = req.body;
    const author = req.user; // Get the authenticated user's ID from the auth middleware

    // Check if book with the same title exists
    const existingBook = await Book.findOne({ title });
    if (existingBook) {
      return res.status(400).send("Book with the same title already exists");
    }

    if (!req.files || !req.files["coverImage"] || !req.files["file"]) {
      return res.status(400).send("Cover image and file are required");
    }

    const coverImage = req.files["coverImage"][0];
    const file = req.files["file"][0];

    const coverImagePath = path.resolve(
      __dirname,
      "../public/data/uploads",
      coverImage.filename
    );
    const bookFilePath = path.resolve(
      __dirname,
      "../public/data/uploads",
      file.filename
    );

    const coverImageUploadResult = await uploadFileToCloudinary(
      coverImagePath,
      {
        public_id: coverImage.filename,
        folder: "book-covers",
      }
    );

    const bookFileUploadResult = await uploadFileToCloudinary(bookFilePath, {
      resource_type: "raw",
      filename_override: file.filename,
      folder: "book-pdfs",
    });

    const newBook = new Book({
      title,
      author,
      genre,
      description,
      coverImage: coverImageUploadResult.secure_url,
      file: bookFileUploadResult.secure_url,
    });

    await newBook.save();

    const populatedBook = await Book.findById(newBook._id).populate("author", "name email");

    res.status(201).send({
      message: "Book saved successfully and uploaded to Cloudinary",
      book: populatedBook,
    });
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).send("Error creating book: " + error.message);
  }
};

// Get all books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("author", "name email");

    res.status(200).json(books);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Get a single book by ID
const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id).populate("author", "name");

    if (!book) {
      return res.status(404).send("Book not found");
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).send("Error fetching book: " + error.message);
  }
};

// Update a book
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, genre, description } = req.body;

    const updates = {};

    if (title) updates.title = title;
    if (author) updates.author = author;
    if (genre) updates.genre = genre;
    if (description) updates.description = description;

    if (req.files) {
      if (req.files["coverImage"]) {
        const coverImage = req.files["coverImage"][0];
        const coverImagePath = path.resolve(
          __dirname,
          "../public/data/uploads",
          coverImage.filename
        );
        const coverImageUploadResult = await uploadFileToCloudinary(
          coverImagePath,
          {
            public_id: coverImage.filename,
            folder: "book-covers",
          }
        );
        updates.coverImage = coverImageUploadResult.secure_url;
      }
      if (req.files["file"]) {
        const file = req.files["file"][0];
        const bookFilePath = path.resolve(
          __dirname,
          "../public/data/uploads",
          file.filename
        );
        const bookFileUploadResult = await uploadFileToCloudinary(
          bookFilePath,
          {
            resource_type: "raw",
            filename_override: file.filename,
            folder: "book-pdfs",
          }
        );
        updates.file = bookFileUploadResult.secure_url;
      }
    }

    const book = await Book.findByIdAndUpdate(id, updates, { new: true }).populate("author", "name email");

    if (!book) {
      return res.status(404).send("Book not found");
    }

    res.status(200).send({ message: "Book updated successfully", book });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).send("Error updating book: " + error.message);
  }
};

// Delete a book
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).send("Book not found");
    }

    res.status(200).send("Book deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting book: " + error.message);
  }
};

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
};
