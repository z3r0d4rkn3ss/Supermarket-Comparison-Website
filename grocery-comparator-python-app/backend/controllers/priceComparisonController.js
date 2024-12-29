// Logic for comparing prices

const Product = require('../models/productModel');
const axios = require('axios');

const comparePrices = async (req, res) => {
  const { productList } = req.body; // productList contains array of product names
  try {
    const prices = [];
    for (let productName of productList) {
      const productData = await Product.findOne({ name: productName });
      if (productData) {
        prices.push(productData);  // Simulating a price comparison logic
      }
    }

    // Further logic to compare prices across supermarkets can be added here
    res.status(200).json(prices);
  } catch (error) {
    res.status(500).json({ message: 'Error comparing prices' });
  }
};

module.exports = { comparePrices };
