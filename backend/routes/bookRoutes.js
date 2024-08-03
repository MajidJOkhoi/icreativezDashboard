const express = require("express");
const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");
const multer = require("multer");
const path = require("path");
const auth = require("../middleware/auth");

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
  dest: path.resolve(__dirname, "../public/data/uploads"),
  limits: { fileSize: 3e7 }, // 30 MB file size limit
});

// Routes
router.post(
  "/createbook",
  auth,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  createBook
);

// Get all books
router.get("/books", getBooks);

// Get a book by ID
router.get("/books/:id", getBookById);

// Update a book by ID, including file uploads
router.put(
  "/books/:id",
  auth,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  updateBook
);

// Delete a book by ID
router.delete("/books/:id", auth, deleteBook);

module.exports = router;
