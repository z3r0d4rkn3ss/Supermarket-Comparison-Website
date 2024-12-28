import React, { useState, useEffect } from 'react';
import { comparePrices } from '../services/api';

const CompareForm = ({ setResults }) => {
  const [productIds, setProductIds] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (productIds.length === 0) {
      alert("Please select at least one product to compare.");
      return;
    }
    const comparisonResults = await comparePrices(productIds);
    setResults(comparisonResults);
  };

  const handleChange = (e) => {
    const selectedIds = Array.from(e.target.selectedOptions, (option) => option.value);
    setProductIds(selectedIds);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Select Products for Price Comparison</h2>
      {loading && <p>Loading products...</p>}
      <select multiple={true} onChange={handleChange} aria-label="Select products for comparison">
        <option value="" disabled>Select products</option>
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
