import React, { useState, useEffect } from 'react';

const SupermarketComparison = () => {
  const [comparisonData, setComparisonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComparisonData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/compare_prices'); // Backend API
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setComparisonData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchComparisonData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Supermarket Price Comparison</h1>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>ASDA</th>
            <th>Sainsbury's</th>
            <th>Aldi</th>
            <th>Tesco</th>
            <th>Iceland</th>
            <th>Morrisons</th>
          </tr>
        </thead>
        <tbody>
          {comparisonData.map((item, index) => (
            <tr key={index}>
              <td>{item.product}</td>
              <td>{item.asda_price}</td>
              <td>{item.sainsburys_price}</td>
              <td>{item.aldi_price}</td>
              <td>{item.tesco_price}</td>
              <td>{item.iceland_price}</td>
              <td>{item.morrisons_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupermarketComparison;
