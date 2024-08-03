const express = require('express');
const router = express.Router();
const { createProduct } = require('../controllers/ProductController');
const upload = require('../middleware/uploadMiddleware');

// Route to create a new product with a single file upload
router.post('/createproduct', upload.single('productImage'), createProduct);

module.exports = router;
