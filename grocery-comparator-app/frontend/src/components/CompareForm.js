// src/components/CompareForm.js
import React, { useState, useEffect } from 'react';
import { comparePrices } from '../services/api';

const CompareForm = ({ setResults }) => {
  const [productIds, setProductIds] = useState([]);
  const [products, setProducts] = useState([]); // For displaying products to select

  useEffect(() => {
    // Fetch products from the API to populate the dropdowns
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products'); // Update with correct endpoint
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (productIds.length > 0) {
      // Call the comparePrices API and update the results
      const comparisonResults = await comparePrices(productIds);
      setResults(comparisonResults);
    }
  };

  const handleChange = (e) => {
    const selectedIds = Array.from(e.target.selectedOptions, (option) => option.value);
    setProductIds(selectedIds);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Select Products for Price Comparison</h2>
      <select multiple={true} onChange={handleChange}>
        {products.map((product) => (
          <option key={product.product_id} value={product.product_id}>
            {product.name}
          </option>
        ))}
      </select>
      <button type="submit">Compare Prices</button>
    </form>
  );
};

export default CompareForm;
