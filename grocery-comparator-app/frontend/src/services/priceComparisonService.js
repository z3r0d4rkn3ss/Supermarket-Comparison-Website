import axios from 'axios';

const API_URL = 'http://localhost:5000/api/compare_prices';

const comparePrices = async (productList) => {
  const response = await axios.post(API_URL, { productList });
  return response.data;
};

export { comparePrices };
