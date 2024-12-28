import React from 'react';

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
