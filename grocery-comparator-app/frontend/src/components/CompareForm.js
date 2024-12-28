import React, { useState } from 'react';
import axios from 'axios';

const CompareForm = ({ setResults }) => {
  const [shoppingList, setShoppingList] = useState('');
  const [error, setError] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    setShoppingList(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!shoppingList) {
      setError('Please enter a shopping list.');
      return;
    }

    setError('');
    try {
      // Make the API request to your Flask backend
      const response = await axios.post('http://localhost:5000/compare', {
        shopping_list: shoppingList.split(',').map(item => item.trim()), // Split and clean the shopping list
      });
      setResults(response.data.results);
    } catch (err) {
      setError('There was an error fetching data. Please try again later.');
    }
  };

  return (
    <div className="compare-form">
      <h2>Enter Your Shopping List</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={shoppingList}
          onChange={handleChange}
          placeholder="Enter items, e.g., Milk, Eggs, Bread"
        />
        <button type="submit">Compare Prices</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default CompareForm;
