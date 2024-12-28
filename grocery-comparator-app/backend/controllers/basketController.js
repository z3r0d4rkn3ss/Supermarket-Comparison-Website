// Logic for handling user baskets

const Basket = require('../models/basketModel');
const User = require('../models/userModel');

const addToBasket = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const userBasket = await Basket.findOne({ userId });
    if (!userBasket) {
      const newBasket = new Basket({ userId, products: [productId] });
      await newBasket.save();
      return res.status(201).json({ message: 'Product added to basket' });
    }

    userBasket.products.push(productId);
    await userBasket.save();
    res.status(200).json({ message: 'Product added to basket' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to basket' });
  }
};

module.exports = { addToBasket };
