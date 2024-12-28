import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosInstance';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axiosInstance.get('/compare_prices');
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="product-list">
      <h2>Supermarket Price Comparison</h2>
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
          {products.map((item, index) => (
            <tr key={index}>
              <td>{item.product}</td>
              <td>{item.asda_price}</td>
              <td>{item.sainsbury_price}</td>
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

export default ProductList;
