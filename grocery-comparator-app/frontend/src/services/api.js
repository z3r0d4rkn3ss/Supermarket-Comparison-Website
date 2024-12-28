// src/services/api.js
const API_URL = "http://localhost:5000/api";  // Update with your backend URL

// Fetch all supermarkets
export const fetchSupermarkets = async () => {
  try {
    const response = await fetch(`${API_URL}/supermarkets`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching supermarkets:", error);
  }
};

// Compare prices for a list of product IDs
export const comparePrices = async (productIds) => {
  try {
    const response = await fetch(`${API_URL}/compare_prices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ product_ids: productIds }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error comparing prices:", error);
  }
};
