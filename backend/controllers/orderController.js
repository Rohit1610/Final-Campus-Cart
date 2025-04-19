const Order = require('../models/Order');
const Product = require('../models/Product');

// Create a new order
const createOrder = async (req, res) => {
  const { items } = req.body;
  let totalAmount = 0;

  // Calculate total price and ensure stock availability
  for (let item of items) {
    const product = await Product.findById(item.product);
    if (!product || product.quantity < item.quantity) {
      return res.status(400).json({ message: 'Insufficient stock for product: ' + product.name });
    }
    totalAmount += product.price * item.quantity;
  }

  // Create the order
  const order = new Order({
    userId: req.user._id,
    items, totalAmount
  });

  await order.save();
  res.status(201).json(order);
};

module.exports = { createOrder };
