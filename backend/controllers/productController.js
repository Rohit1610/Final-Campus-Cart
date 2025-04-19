const Product = require('../models/Product');

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching products' });
  }
};

// Add a new product
const addProduct = async (req, res) => {
  const { name, description, price, imageUrl, category, sellerType, quantity } = req.body;

  // Check if all required fields are provided
  if (!name || !description || !price || !imageUrl || !category || !sellerType || !quantity) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    // Create a new product
    const product = new Product({
      name,
      description,
      price,
      imageUrl,
      category,
      sellerType,
      quantity,
      sellerId: req.user._id, // Assuming req.user._id is set from authentication middleware
    });

    // Save the product to the database
    await product.save();

    // Return the created product
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while creating product' });
  }
};

module.exports = { getProducts, addProduct };
