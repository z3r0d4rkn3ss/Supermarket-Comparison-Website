import axios from 'axios';

const API_URL = 'http://localhost:5000/compare';  // Change this to your live backend URL when ready

export const comparePrices = async (shoppingList) => {
  try {
    const response = await axios.post(API_URL, { shopping_list: shoppingList });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching comparison data', error);
    throw error;
  }
};
