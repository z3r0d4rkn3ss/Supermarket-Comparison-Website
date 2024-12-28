import React from 'react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductPrices = ({ productId }) => {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    axios.get(`/api/product_prices/${productId}`)
      .then(response => {
        setPrices(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the product prices!', error);
      });
  }, [productId]);

  return (
    <div>
      <h2>Product Prices</h2>
      <ul>
        {prices.map((price, index) => (
          <li key={index}>
            {price.supermarket}: £{price.price} (Scraped on {price.date_scraped})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductPrices;

const Results = ({ results }) => {
  return (
    <div className="results">
      <h2>Comparison Results</h2>
      {results.length === 0 ? (
        <p>No products found. Try a different shopping list.</p>
      ) : (
        <ul>
          {results.map((item, index) => (
            <li key={index}>
              <strong>{item.name}</strong> - {item.price} GBP at{' '}
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {item.supermarket}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Results;
