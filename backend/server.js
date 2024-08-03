require('dotenv').config();

const express = require("express");
const app = express();
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const productRoutes = require('./routes/productRoutes');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const { notFound, globalErrorHandler } = require('./middleware/GlobalErrorHanlder');

// Connect to the database
connectDB();

// Middleware to parse JSON and urlencoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));

// CORS configuration
app.use(cors({
    origin: [process.env.FRONT_END_DOMAIN, process.env.FRONT_END_DOMAIN1],
}));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/book", bookRoutes);
app.use('/api/product', productRoutes);

// Catch 404 and forward to error handler
app.use(notFound);

// Global error handler
app.use(globalErrorHandler);

// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
