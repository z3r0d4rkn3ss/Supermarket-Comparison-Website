const Basket = require('../models/basketModel');

// Add product to basket
exports.addToBasket = async (req, res) => {
  const { userId } = req.user; // Get userId from the JWT token
  const { productId, quantity } = req.body;

  let basket = await Basket.findOne({ userId });
  if (!basket) {
    basket = new Basket({ userId, products: [] });
  }

  const existingProduct = basket.products.find(p => p.productId === productId);
  if (existingProduct) {
    existingProduct.quantity += quantity; // Increase quantity if already in basket
  } else {
    basket.products.push({ productId, quantity });
  }

  await basket.save();
  res.status(200).json(basket);
};

// Retrieve basket
exports.getBasket = async (req, res) => {
  const { userId } = req.user;
  const basket = await Basket.findOne({ userId });
  if (!basket) return res.status(404).json({ message: 'Basket not found' });
  res.status(200).json(basket);
};
