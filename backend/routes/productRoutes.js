const express = require('express');
const { getProducts, addProduct } = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Get all products
router.get('/', getProducts);

// Add new product (requires authentication)
router.post('/', authMiddleware, addProduct);

module.exports = router;
