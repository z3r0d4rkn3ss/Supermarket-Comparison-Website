import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosInstance';

const Basket = () => {
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    const fetchBasket = async () => {
      const response = await axiosInstance.get('/basket');
      setBasket(response.data.products);
    };
    fetchBasket();
  }, []);

  return (
    <div className="basket">
      <h2>Your Basket</h2>
      <ul>
        {basket.map((item, index) => (
          <li key={index}>
            Product: {item.productId}, Quantity: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Basket;
