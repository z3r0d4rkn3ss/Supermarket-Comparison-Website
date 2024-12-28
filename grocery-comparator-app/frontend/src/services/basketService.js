import axios from 'axios';

const API_URL = 'http://localhost:5000/api/basket';

const getBasket = async (userId) => {
  const response = await axios.get(`${API_URL}/${userId}`);
  return response.data;
};

const addToBasket = async (userId, productId) => {
  const response = await axios.post(`${API_URL}/add_to_basket`, { userId, productId });
  return response.data;
};

const removeFromBasket = async (userId, productId) => {
  const response = await axios.post(`${API_URL}/remove_from_basket`, { userId, productId });
  return response.data;
};

export { getBasket, addToBasket, removeFromBasket };
