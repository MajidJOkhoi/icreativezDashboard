const Product = require('../models/product');
const cloudinary = require('../config/cloudinary'); 

const createProduct = async (req, res) => {
    try {
        const { name } = req.body;

        if (!req.file) {
            return res.status(400).send('Product image is required');
        }

        // Local path to the product image file
        const productImage = req.file.path;

        // Upload image to Cloudinary
        const cloudinaryResponse = await cloudinary.uploader.upload(productImage, {
            folder: 'product-images/', // Optional - folder in Cloudinary where the file should be stored
            resource_type: 'auto' // Automatically detect the file type
        });

        
        // Create new product with Cloudinary URL
        const newProduct = new Product({
            name,
            productImage: cloudinaryResponse.secure_url 
        });

        await newProduct.save();
        res.status(201).send('Product created successfully');
        
    } catch (error) {
        res.status(500).send('Error creating product: ' + error.message);
    }
};

module.exports = {
    createProduct
};
