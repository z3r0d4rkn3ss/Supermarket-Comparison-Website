import React from 'react';

const Results = ({ results }) => {
  return (
    <div className="results">
      <h2>Comparison Results</h2>
      {results.length === 0 ? (
        <p>No results available. Please select products and submit the form.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Supermarket</th>
              <th>Price</th>
              <th>Date Scraped</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td>{result.product_id}</td>
                <td>{result.supermarket}</td>
                <td>{result.price}</td>
                <td>{new Date(result.date_scraped).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Results;
