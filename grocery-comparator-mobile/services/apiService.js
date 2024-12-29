// grocery-comparator-mobile/services/apiService.js
import axios from 'axios';

const BASE_URL = 'http://your-backend-api-url.com';  // Replace with your backend URL

// Function to get all products
const getProducts = () => {
  return axios.get(`${BASE_URL}/api/products`);
};

// Function to get details for a specific product
const getProductDetails = (productId) => {
  return axios.get(`${BASE_URL}/api/products/${productId}`);
};

// Function to get basket items (if needed)
const getBasket = () => {
  return axios.get(`${BASE_URL}/api/basket`);
};

export default { getProducts, getProductDetails, getBasket };
